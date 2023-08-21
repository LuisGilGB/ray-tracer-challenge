import {Color, Point, Vector3D} from 'core';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';

class Lighting {
  static lighting({
    material,
    light,
    position,
    eyeVector,
    normalVector,
  }: {
    material: PhongMaterial;
    light: PointLight;
    position: Point;
    eyeVector: Vector3D;
    normalVector: Vector3D;
  }): Color {
    // Combine the surface color with the light's color/intensity
    const effectiveColor = Color.fromTuple(
      Vector3D.fromTuple(material.color.asTuple())
        .cross(Vector3D.fromTuple(light.intensity.asTuple()))
        .toTuple(),
    );

    // Find the direction to the light source
    const lightVector = Vector3D.fromTuple(
      light.position.toTuple().subtract(position.toTuple()),
    ).normalize();

    // compute the ambient contribution
    const ambient = effectiveColor.multiply(material.ambient);

    // lightDotNormal represents the cosine of the angle between the
    // light vector and the normal vector. A negative number means the
    // light is on the other side of the surface.
    const lightDotNormal = lightVector.dot(normalVector);

    const black = new Color(0, 0, 0);
    let diffuse = black;
    let specular = black;
    if (lightDotNormal >= 0) {
      diffuse = effectiveColor
        .multiply(material.diffuse)
        .multiply(lightDotNormal);
      const reflectVector = lightVector.subtract(
        normalVector.multiply(2 * lightVector.dot(normalVector)),
      );
      const reflectDotEye = reflectVector.dot(eyeVector);
      if (reflectDotEye > 0) {
        const factor = Math.pow(reflectDotEye, material.shininess);
        specular = light.intensity.multiply(material.specular).multiply(factor);
      }
    }
    return ambient.add(diffuse).add(specular);
  }
}

export default Lighting;
