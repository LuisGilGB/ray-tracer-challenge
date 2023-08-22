import {Color, Point, Vector3D} from 'core';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';

class Lighting {
  static reflect(inVector: Vector3D, normalVector: Vector3D): Vector3D {
    return inVector.subtract(
      normalVector.multiply(2 * inVector.dot(normalVector)),
    );
  }

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
    const effectiveColor = material.color.hadamardProduct(light.intensity);

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

    if (lightDotNormal < 0) {
      // light is on the other side of the surface
      diffuse = black;
      specular = black;
    } else {
      // compute the diffuse contribution
      diffuse = effectiveColor
        .multiply(material.diffuse)
        .multiply(lightDotNormal);
      // reflectDotEye represents the cosine of the angle between the
      // reflection vector and the eye vector. A negative number means the
      // light reflects away from the eye.
      const reflectVector = Lighting.reflect(
        lightVector.negate(),
        normalVector,
      );
      const reflectDotEye = reflectVector.dot(eyeVector);

      if (reflectDotEye <= 0) {
        specular = black;
      } else {
        // compute the specular contribution
        const factor = Math.pow(reflectDotEye, material.shininess);
        specular = light.intensity.multiply(material.specular).multiply(factor);
      }
    }
    return ambient.add(diffuse).add(specular);
  }
}

export default Lighting;
