import {Point, Vector3D} from 'core';

const DEFAULT_CENTER = new Point(0, 0, 0);
const DEFAULT_RADIUS = 1;

class Sphere {
  private readonly _center: Point;
  private readonly _radius: number;

  constructor(center?: Point, radius?: number) {
    this._center = center || DEFAULT_CENTER;
    this._radius = radius || DEFAULT_RADIUS;
    Object.freeze(this);
  }

  get center(): Point {
    return this._center;
  }

  get radius(): number {
    return this._radius;
  }

  static unitSphere(): Sphere {
    return new Sphere(DEFAULT_CENTER, DEFAULT_RADIUS);
  }

  normal(point: Point): Vector3D {
    return Vector3D.fromTuple(
      point.toTuple().subtract(this._center.toTuple()),
    ).normalize();
  }
}

export default Sphere;
