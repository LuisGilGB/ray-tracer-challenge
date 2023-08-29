import {
  Point,
  Transform3D,
  Transform3DPipeline,
  Tuple,
  Tuple3D,
  Vector3D,
  Vector3DFactory,
} from 'core';
import {PhongMaterial} from 'material';

const DEFAULT_CENTER = new Point(0, 0, 0);
const DEFAULT_RADIUS = 1;

class Sphere {
  private readonly _center: Point;
  private readonly _radius: number;
  private readonly _material: PhongMaterial;
  private readonly _selfTransform: Transform3D;

  constructor(
    center?: Point,
    radius?: number,
    material?: PhongMaterial,
    selfTransform?: Transform3D,
  ) {
    this._center = center || DEFAULT_CENTER;
    this._radius = radius || DEFAULT_RADIUS;
    this._material = material || new PhongMaterial();
    this._selfTransform =
      selfTransform || Transform3DPipeline.identity().value();
    Object.freeze(this);
  }

  get center(): Point {
    return this.selfTransform.transformPoint(this._center);
  }

  get radius(): number {
    return this._radius;
  }

  get material(): PhongMaterial {
    return this._material;
  }

  get selfTransform(): Transform3D {
    return this._selfTransform;
  }

  static unitSphere(): Sphere {
    return new Sphere(DEFAULT_CENTER, DEFAULT_RADIUS);
  }

  clone(): Sphere {
    return new Sphere(this._center, this._radius, this._material);
  }

  cloneWith(params: {
    center?: Point;
    radius?: number;
    material?: PhongMaterial;
    selfTransform?: Transform3D;
  }) {
    return new Sphere(
      params.center ?? this._center,
      params.radius ?? this._radius,
      params.material ?? this._material,
      params.selfTransform ?? this._selfTransform,
    );
  }

  transform(transform: Transform3D): Sphere {
    return this.cloneWith({
      selfTransform: transform,
    });
  }

  equals(other: Sphere): boolean {
    return (
      this._center.equals(other._center) &&
      this._radius === other._radius &&
      this._material.equals(other._material) &&
      this._selfTransform.equals(other._selfTransform)
    );
  }

  reflectWithNormal(vector: Vector3D, normal: Vector3D): Vector3D {
    return vector.subtract(normal.multiply(2 * vector.dot(normal)));
  }

  normal(point: Point): Vector3D {
    const relativePoint = Point.fromTuple(
      this.selfTransform.matrix
        .getInverse()
        .multiplyTuple(Tuple.fromArray([...point.toArray(), 1])) as Tuple3D,
    );
    const relativeNormal = Vector3DFactory.fromPoints(
      this._center,
      relativePoint,
    ).normalize();
    const normal = this.selfTransform.matrix
      .getSubmatrix(3, 3)
      .getInverse()
      .getTranspose()
      .multiplyVector(relativeNormal) as Vector3D;
    return normal.normalize();
  }
}

export default Sphere;
