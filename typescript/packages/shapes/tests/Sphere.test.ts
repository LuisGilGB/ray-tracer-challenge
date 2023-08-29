import {
  Point,
  Rotation3D,
  Scaling3D,
  Transform3DPipeline,
  Translation3D,
  Vector3D,
} from 'core';
import {PhongMaterial} from 'material';
import Sphere from '../src/Sphere';

describe('Sphere tests', () => {
  describe('Creation', () => {
    it('should create a sphere with a given center and radius', () => {
      const center = new Point(1, 2, 3);
      const radius = 4;
      const sphere = new Sphere(center, radius);
      expect(sphere.center).toEqual(center);
      expect(sphere.radius).toEqual(radius);
    });

    it('should create a sphere with a given material', () => {
      const material = new PhongMaterial({
        ambient: 0.1,
        diffuse: 0.2,
        specular: 0.3,
        shininess: 40,
      });
      const center = new Point(1, 2, 3);
      const radius = 4;
      const sphere = new Sphere(center, radius, material);
      expect(sphere.material).toBe(material);
    });

    it('should create a unit sphere centered in the origin when no parameters are provided', () => {
      const sphere = new Sphere();
      expect(sphere.center).toEqual(new Point(0, 0, 0));
      expect(sphere.radius).toBe(1);
    });

    it('should create a sphere of radius 1 when only the center is provided', () => {
      const center = new Point(1, 2, 3);
      const sphere = new Sphere(center);
      expect(sphere.center).toEqual(center);
      expect(sphere.radius).toEqual(1);
    });

    it('should create a unit sphere when calling the unitSphere static method', () => {
      const sphere = Sphere.unitSphere();
      expect(sphere.center).toEqual(new Point(0, 0, 0));
      expect(sphere.radius).toBe(1);
    });

    it('should create a sphere with a given material when cloning but passing a new material', () => {
      const material = new PhongMaterial({
        ambient: 0.1,
        diffuse: 0.2,
        specular: 0.3,
        shininess: 40,
      });
      const sphere = Sphere.unitSphere();
      const newSphere = sphere.cloneWith({material});
      expect(newSphere.material).toBe(material);
    });
  });

  describe('Normal vector computation', () => {
    it('should return the normal vector of the sphere on the X axis', () => {
      const sphere = Sphere.unitSphere();
      const normal = sphere.normal(new Point(1, 0, 0));
      expect(normal).toEqual(new Vector3D(1, 0, 0));
    });

    it('should return the normal vector of the sphere on the Y axis', () => {
      const sphere = Sphere.unitSphere();
      const normal = sphere.normal(new Point(0, 1, 0));
      expect(normal).toEqual(new Vector3D(0, 1, 0));
    });

    it('should return the normal vector of the sphere on the Z axis', () => {
      const sphere = Sphere.unitSphere();
      const normal = sphere.normal(new Point(0, 0, 1));
      expect(normal).toEqual(new Vector3D(0, 0, 1));
    });

    it('should return the normal vector of the sphere at a non axial point', () => {
      const sphere = Sphere.unitSphere();
      const componentSize = Math.sqrt(3) / 3;
      const normal = sphere.normal(
        new Point(componentSize, componentSize, componentSize),
      );
      expect(normal).toEqual(
        new Vector3D(componentSize, componentSize, componentSize),
      );
    });

    it('should return a normalized vector', () => {
      const sphere = Sphere.unitSphere();
      const componentSize = Math.sqrt(3) / 3;
      const normal = sphere.normal(
        new Point(componentSize, componentSize, componentSize),
      );
      expect(normal).toEqual(normal.normalize());
    });

    it('should compute the normal on a translated sphere', () => {
      const normal = Sphere.unitSphere()
        .transform(Translation3D.translation(0, 1, 0))
        .normal(
          new Point(0, 1 + Math.sin(Math.PI / 4), -Math.cos(Math.PI / 4)),
        );
      const expected = new Vector3D(
        0,
        Math.sin(Math.PI / 4),
        -Math.cos(Math.PI / 4),
      );
      normal.toArray().forEach((component, i) => {
        expect(component).toBeCloseTo(expected.toArray()[i]);
      });
    });

    it('should compute the normal on a transformed sphere', () => {
      const normal = Sphere.unitSphere()
        .transform(
          Transform3DPipeline.init()
            .pipe(
              Scaling3D.scaling(1, 0.5, 1),
              Rotation3D.rotationZ(Math.PI / 5),
            )
            .value(),
        )
        .normal(new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2));
      const expected = new Vector3D(0, 0.97014, -0.24254);
      normal.toArray().forEach((component, i) => {
        expect(component).toBeCloseTo(expected.toArray()[i]);
      });
    });
  });

  describe('Reflection of a vector computation', () => {
    it('should return the reflection of a vector approaching the sphere at 45º', () => {
      const sphere = Sphere.unitSphere();
      const vector = new Vector3D(1, -1, 0);
      const normal = sphere.normal(new Point(0, 1, 0));
      const reflection = sphere.reflectWithNormal(vector, normal);
      expect(reflection).toEqual(new Vector3D(1, 1, 0));
    });

    it('should return the reflection of a vector off a slanted surface', () => {
      const sphere = Sphere.unitSphere();
      const componentSize = Math.sqrt(2) / 2;
      const vector = new Vector3D(0, -1, 0);
      const normal = sphere.normal(new Point(componentSize, componentSize, 0));
      const reflection = sphere.reflectWithNormal(vector, normal);
      const expected = new Vector3D(1, 0, 0);
      reflection.toArray().forEach((component, i) => {
        expect(component).toBeCloseTo(expected.toArray()[i]);
      });
    });
  });
});
