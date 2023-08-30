import {PointLight} from 'light';
import {Intersection, Ray} from 'ray';
import {Sphere} from 'shapes';
import WorldHit from './WorldHit';

class World {
  private readonly _light: PointLight;
  private readonly _objects: Sphere[];

  constructor(light: PointLight, objects: Sphere[]) {
    this._light = light;
    this._objects = objects;
  }

  public get light(): PointLight {
    return this._light;
  }

  public get objects(): Sphere[] {
    return this._objects;
  }

  public intersect(ray: Ray): Intersection[] {
    const intersections: Intersection[] = this.objects.reduce<Intersection[]>(
      (acc, sphere) => {
        return acc.concat(Intersection.raySphere(ray, sphere));
      },
      [],
    );
    return intersections.sort((a, b) => a.t - b.t);
  }

  public prepareHit(ray: Ray, intersection: Intersection): WorldHit {
    return WorldHit.fromRayAndIntersection(ray, intersection);
  }
}

export default World;
