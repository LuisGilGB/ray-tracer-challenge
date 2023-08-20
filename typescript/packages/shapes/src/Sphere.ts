import {Point, Transform3D, Tuple, Tuple3D, Vector3D} from 'core';

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

  reflectWithNormal(vector: Vector3D, normal: Vector3D): Vector3D {
    return vector.subtract(normal.multiply(2 * vector.dot(normal)));
  }

  normalOfTransformed(point: Point, transform: Transform3D): Vector3D {
    const relativePoint = Point.fromTuple(
      transform.matrix
        .getInverse()
        .multiplyTuple(Tuple.fromArray([...point.toArray(), 1])) as Tuple3D,
    );
    const relativeNormal = this.normal(relativePoint);
    const normal = transform.matrix
      .getSubmatrix(3, 3)
      .getInverse()
      .getTranspose()
      .multiplyVector(relativeNormal) as Vector3D;
    return normal.normalize();
  }
}

export default Sphere;
