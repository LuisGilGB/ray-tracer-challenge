import {Point} from 'core';

class Sphere {
  private readonly _center: Point;
  private readonly _radius: number;

  constructor(center: Point, radius: number) {
    this._center = center;
    this._radius = radius;
    Object.freeze(this);
  }

  get center(): Point {
    return this._center;
  }

  get radius(): number {
    return this._radius;
  }
}

export default Sphere;
