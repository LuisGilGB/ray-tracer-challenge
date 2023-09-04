import {Point, Vector3D} from 'core';
import {Hit, Intersection, Ray} from 'ray';
import {Sphere} from 'shapes';

class WorldHit extends Hit {
  private readonly _point: Point;
  private readonly _eyeVector: Vector3D;
  private readonly _normalVector: Vector3D;
  private readonly _inside: boolean;

  protected constructor(params: {
    intersection: Intersection;
    point: Point;
    eyeVector: Vector3D;
    normalVector: Vector3D;
  }) {
    super(params.intersection);
    this._point = params.point;
    this._eyeVector = params.eyeVector;
    this._normalVector = params.normalVector;
    this._inside = this._normalVector.dot(this._eyeVector) < 0;
    Object.freeze(this);
  }

  get point(): Point {
    return this._point;
  }

  get eyeVector(): Vector3D {
    return this._eyeVector;
  }

  get normalVector(): Vector3D {
    return this.inside ? this._normalVector.negate() : this._normalVector;
  }

  get inside(): boolean {
    return this._inside;
  }

  public static fromRayAndIntersection(
    ray: Ray,
    intersection: Intersection,
  ): WorldHit {
    const point = ray.position(intersection.t);
    const eyeVector = ray.direction.negate();
    const normalVector = (intersection.object as Sphere).normal(point);
    return new WorldHit({intersection, point, eyeVector, normalVector});
  }
}

export default WorldHit;
