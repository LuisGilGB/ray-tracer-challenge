import {
  Point,
  Rotation3D,
  Scaling3D,
  Transform3D,
  Translation3D,
  Vector3D,
} from 'core';

class Ray {
  private readonly _origin: Point;
  private readonly _direction: Vector3D;

  constructor(origin: Point, direction: Vector3D) {
    this._origin = origin;
    this._direction = direction;
    Object.freeze(this);
  }

  get origin(): Point {
    return this._origin;
  }

  get direction(): Vector3D {
    return this._direction;
  }

  position(time: number): Point {
    return this.origin.addVector(this.direction.multiply(time));
  }

  transform(transform: Transform3D): Ray {
    return new Ray(
      transform.transformPoint(this.origin),
      transform.transformVector(this.direction),
    );
  }

  translate(translation: Translation3D): Ray {
    return this.transform(translation);
  }

  scale(scaling: Scaling3D): Ray {
    return this.transform(scaling);
  }

  rotate(rotation: Rotation3D): Ray {
    return this.transform(rotation);
  }
}

export default Ray;
