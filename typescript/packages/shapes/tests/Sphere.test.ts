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
  });
});
