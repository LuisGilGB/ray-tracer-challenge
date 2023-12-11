import {Rotation3D, Scaling3D, Transform3DPipeline, Translation3D} from 'core';
import {PhongMaterial} from 'material';
import TestShape from '../src/TestShape';

describe('Shape tests', () => {
  describe('Creation', () => {
    it('should create a shape with the default transform', () => {
      const shape = new TestShape();
      expect(shape.selfTransform).toEqual(
        Transform3DPipeline.identity().value(),
      );
    });

    it('should create a shape with a given transform', () => {
      const transform = Transform3DPipeline.init()
        .pipe(Translation3D.translation(1, 2, 3))
        .pipe(Rotation3D.rotationX(Math.PI / 2))
        .pipe(Scaling3D.scaling(2, 2, 2))
        .value();
      const shape = new TestShape({transform});
      expect(shape.selfTransform).toEqual(transform);
    });

    it('should create a shape with the default material', () => {
      const shape = new TestShape();
      expect(shape.material).toEqual(new PhongMaterial());
    });

    it('should create a shape with a given material', () => {
      const material = new PhongMaterial({
        ambient: 0.1,
        diffuse: 0.2,
        specular: 0.3,
        shininess: 40,
      });
      const shape = new TestShape({material});
      expect(shape.material).toBe(material);
    });
  });
});
