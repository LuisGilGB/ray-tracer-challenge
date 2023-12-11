import {Point, Transform3D, Vector3D} from 'core';
import {PhongMaterial} from 'material';

abstract class Shape {
  protected readonly _material: PhongMaterial;
  protected readonly _selfTransform: Transform3D;

  protected constructor(params?: {
    material?: PhongMaterial;
    transform?: Transform3D;
  }) {
    this._material = params?.material || new PhongMaterial();
    this._selfTransform = params?.transform || Transform3D.identity();
    Object.freeze(this);
  }

  get material(): PhongMaterial {
    return this._material;
  }

  get selfTransform(): Transform3D {
    return this._selfTransform;
  }

  abstract clone(): Shape;

  abstract cloneWith(params: {
    material?: PhongMaterial;
    transform?: Transform3D;
  }): Shape;

  transform(transform: Transform3D): Shape {
    return this.cloneWith({
      transform: transform,
    });
  }

  abstract normal(point: Point): Vector3D;

  abstract reflectWithNormal(point: Point, normal: Vector3D): Vector3D;
}

export default Shape;
