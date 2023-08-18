import {Point, Vector3D} from 'core';
import Sphere from '../src/Sphere';

describe('Sphere tests', () => {
  describe('Creation', () => {
    it('should create a sphere with a given center and radius', () => {
      const center = new Point(1, 2, 3);
      const radius = 4;
      const sphere = new Sphere(center, radius);
      expect(sphere.center).toBe(center);
      expect(sphere.radius).toBe(radius);
    });

    it('should create a unit sphere centered in the origin when no parameters are provided', () => {
      const sphere = new Sphere();
      expect(sphere.center).toEqual(new Point(0, 0, 0));
      expect(sphere.radius).toBe(1);
    });

    it('should create a sphere of radius 1 when only the center is provided', () => {
      const center = new Point(1, 2, 3);
      const sphere = new Sphere(center);
      expect(sphere.center).toBe(center);
      expect(sphere.radius).toBe(1);
    });

    it('should create a unit sphere when calling the unitSphere static method', () => {
      const sphere = Sphere.unitSphere();
      expect(sphere.center).toEqual(new Point(0, 0, 0));
      expect(sphere.radius).toBe(1);
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
  });
});
