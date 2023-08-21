import {Color, Point} from 'core';
import PointLight from '../src/PointLight';

describe('Point light tests', () => {
  describe('Creation', () => {
    test('Creates a Point Light object with the specified position and intensity', () => {
      const intensity = new Color(1, 1, 1);
      const position = new Point(0, 0, 0);
      const light = new PointLight(position, intensity);
      expect(light.position).toEqual(position);
      expect(light.intensity).toEqual(intensity);
    });
  });
});
