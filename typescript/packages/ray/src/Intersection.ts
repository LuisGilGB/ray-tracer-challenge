import {Point, Vector3D} from 'core';
import {Sphere} from 'shapes';
import Ray from './Ray';

class Intersection {
  private readonly _t: number;
  private readonly _point: Point;

  constructor(t: number, point: Point) {
    this._t = t;
    this._point = point;
    Object.freeze(this);
  }

  get t(): number {
    return this._t;
  }

  get point(): Point {
    return this._point;
  }

  public static raySphere(ray: Ray, sphere: Sphere): Intersection[] {
    const sphereToRay = Vector3D.fromTuple(
      ray.origin.toTuple().subtract(sphere.center.toTuple()),
    );
    const a = ray.direction.dot(ray.direction);
    const b = 2 * ray.direction.dot(sphereToRay);
    const c = sphereToRay.dot(sphereToRay) - sphere.radius * sphere.radius;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return [];
    }
    if (discriminant === 0) {
      const t = -b / (2 * a);
      return [new Intersection(t, ray.position(t))];
    }
    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    return [
      new Intersection(t1, ray.position(t1)),
      new Intersection(t2, ray.position(t2)),
    ];
  }
}

export default Intersection;
