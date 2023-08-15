import {Point, Vector3D} from 'core';

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
}

export default Ray;
