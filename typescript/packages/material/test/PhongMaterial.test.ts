import {Color} from 'core';
import PhongMaterial from '../src/PhongMaterial';

describe('Phong Material tests', () => {
  describe('Creation', () => {
    test('Creates a Phong Material object with the specified properties', () => {
      const color = new Color(1, 1, 1);
      const ambient = 0.1;
      const diffuse = 0.9;
      const specular = 0.9;
      const shininess = 200.0;
      const material = new PhongMaterial({
        color,
        ambient,
        diffuse,
        specular,
        shininess,
      });
      expect(material.ambient).toEqual(ambient);
      expect(material.diffuse).toEqual(diffuse);
      expect(material.specular).toEqual(specular);
      expect(material.shininess).toEqual(shininess);
    });
  });
});
