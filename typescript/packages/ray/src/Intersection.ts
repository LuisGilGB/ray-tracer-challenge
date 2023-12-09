import {Vector3DFactory} from 'core';
import {Sphere} from 'shapes';
import Ray from './Ray';

class Intersection {
  private readonly _t: number;
  private readonly _object: unknown;

  constructor(t: number, object: unknown) {
    this._t = t;
    this._object = object;
    Object.freeze(this);
  }

  get t(): number {
    // Round to 5 decimal places to avoid floating point errors
    const EPSILON = 0.00001;
    if (Math.abs(this._t) < EPSILON) {
      return 0;
    }
    return this._t;
  }

  get object(): unknown {
    return this._object;
  }

  public static raySphere(ray: Ray, sphere: Sphere): Intersection[] {
    const inverseTransform = sphere.selfTransform.getInverse();
    const transformedRay = ray.transform(inverseTransform);

    const sphereCenterToRayOrigin = Vector3DFactory.fromPoints(
      Sphere.DEFAULT_CENTER,
      transformedRay.origin,
    );
    const a = transformedRay.direction.dot(transformedRay.direction);
    const b = 2 * transformedRay.direction.dot(sphereCenterToRayOrigin);
    const c =
      sphereCenterToRayOrigin.dot(sphereCenterToRayOrigin) -
      Sphere.DEFAULT_RADIUS;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return [];
    }
    if (discriminant === 0) {
      const t = -b / (2 * a);
      return [new Intersection(t, sphere)];
    }
    const sqrtDiscriminant = Math.sqrt(discriminant);
    const t1 = (-b - sqrtDiscriminant) / (2 * a);
    const t2 = (-b + sqrtDiscriminant) / (2 * a);
    return [new Intersection(t1, sphere), new Intersection(t2, sphere)];
  }
}

export default Intersection;
