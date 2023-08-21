import {Color, Point, Vector3D} from 'core';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';
import Lighting from '../src/Lighting';

describe('Lighting tests', () => {
  describe('Main basic cases', () => {
    const material = new PhongMaterial();

    it('Lighting with the eye between the light and the surface', () => {
      const position = new Point(0, 0, 0);
      const eyeVector = new Vector3D(0, 0, -1);
      const normalVector = new Vector3D(0, 0, -1);
      const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));
      const result = Lighting.lighting({
        material,
        light,
        position,
        eyeVector,
        normalVector,
      });
      expect(result).toEqual(new Color(1.9, 1.9, 1.9));
    });

    it('Lighting with the eye between light and surface, eye offset 45°', () => {
      const position = new Point(0, 0, 0);
      const eyeVector = new Vector3D(0, Math.SQRT2 / 2, -Math.SQRT2 / 2);
      const normalVector = new Vector3D(0, 0, -1);
      const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));
      const result = Lighting.lighting({
        material,
        light,
        position,
        eyeVector,
        normalVector,
      });
      expect(result).toEqual(new Color(1.0, 1.0, 1.0));
    });

    it('Lighting with eye opposite surface, light offset 45°', () => {
      const position = new Point(0, 0, 0);
      const eyeVector = new Vector3D(0, 0, -1);
      const normalVector = new Vector3D(0, 0, -1);
      const light = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));
      const result = Lighting.lighting({
        material,
        light,
        position,
        eyeVector,
        normalVector,
      });
      expect(result).toEqual(new Color(0.7364, 0.7364, 0.7364));
    });

    it('Lighting with eye in the path of the reflection vector', () => {
      const position = new Point(0, 0, 0);
      const eyeVector = new Vector3D(0, -Math.SQRT2 / 2, -Math.SQRT2 / 2);
      const normalVector = new Vector3D(0, 0, -1);
      const light = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));
      const result = Lighting.lighting({
        material,
        light,
        position,
        eyeVector,
        normalVector,
      });
      expect(result).toEqual(new Color(1.6364, 1.6364, 1.6364));
    });

    it('Lighting with the light behind the surface', () => {
      const position = new Point(0, 0, 0);
      const eyeVector = new Vector3D(0, 0, -1);
      const normalVector = new Vector3D(0, 0, -1);
      const light = new PointLight(new Point(0, 0, 10), new Color(1, 1, 1));
      const result = Lighting.lighting({
        material,
        light,
        position,
        eyeVector,
        normalVector,
      });
      expect(result).toEqual(new Color(0.1, 0.1, 0.1));
    });
  });
});
