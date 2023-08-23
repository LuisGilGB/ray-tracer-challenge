import {Canvas} from 'core';
import {getRaysToCanvas} from './utils';

describe('Sphere shadow cast tests', () => {
  describe('getRaysToCanvas tests', () => {
    it('should return an array of as many rays as pixels the canvas has', () => {
      const width = 5;
      const height = 10;
      const canvas = new Canvas(width, height);
      const rays = getRaysToCanvas(canvas, 100);
      expect(rays.length).toEqual(width * height);
    });

    it('should return rays with an origin over the center of the canvas', () => {
      const width = 16;
      const height = 10;
      const canvas = new Canvas(width, height);
      const rays = getRaysToCanvas(canvas, 100);

      const expectedOrigin = {
        x: width / 2,
        y: height / 2,
      };
      rays.forEach(ray => {
        expect(ray.origin.x).toEqual(expectedOrigin.x);
        expect(ray.origin.y).toEqual(expectedOrigin.y);
      });
    });

    it('should return all rays with normalized direction', () => {
      const width = 16;
      const height = 10;
      const distance = 100;
      const canvas = new Canvas(width, height);
      const rays = getRaysToCanvas(canvas, distance);

      rays.forEach(ray => {
        expect(ray.direction.magnitude()).toBeCloseTo(1);
      });
    });
  });
});
