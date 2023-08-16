import {Point, Scaling3D, Translation3D, Vector3D} from 'core';
import Ray from '../src/Ray';

describe('Ray tests', () => {
  describe('Creation', () => {
    it('should create a ray with the origin point and the direction vector provided', () => {
      const origin = new Point(1, 2, 3);
      const direction = new Vector3D(4, 5, 6);
      const ray = new Ray(origin, direction);
      expect(ray.origin).toBe(origin);
      expect(ray.direction).toBe(direction);
    });
  });

  describe('Operations', () => {
    it('Calculates the right position given a lapse of time', () => {
      const origin = new Point(2, 3, 4);
      const direction = new Vector3D(1, 0, 0);
      const ray = new Ray(origin, direction);
      expect(ray.position(0)).toEqual(origin);
      expect(ray.position(1)).toEqual(new Point(3, 3, 4));
      expect(ray.position(-1)).toEqual(new Point(1, 3, 4));
      expect(ray.position(2.5)).toEqual(new Point(4.5, 3, 4));
    });

    it('Translates a ray', () => {
      const origin = new Point(1, 2, 3);
      const direction = new Vector3D(0, 1, 0);
      const ray = new Ray(origin, direction);
      const translation = Translation3D.translation(3, 4, 5);
      const translatedRay = ray.translate(translation);
      expect(translatedRay.origin).toEqual(new Point(4, 6, 8));
      expect(translatedRay.direction).toEqual(direction);
    });

    it('Scales a ray', () => {
      const origin = new Point(1, 2, 3);
      const direction = new Vector3D(0, 1, 0);
      const ray = new Ray(origin, direction);
      const scaling = Scaling3D.scaling(2, 3, 4);
      const scaledRay = ray.scale(scaling);
      expect(scaledRay.origin).toEqual(new Point(2, 6, 12));
      expect(scaledRay.direction).toEqual(new Vector3D(0, 3, 0));
    });
  });
});
