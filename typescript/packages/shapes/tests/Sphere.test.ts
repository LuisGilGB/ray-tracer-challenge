import {Point} from 'core';
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
});
