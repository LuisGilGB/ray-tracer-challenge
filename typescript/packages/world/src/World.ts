import {
  Color,
  Matrix,
  Point,
  Transform3D,
  Transform3DPipeline,
  Translation3D,
  Vector3D,
  Vector3DFactory,
} from 'core';
import {PointLight} from 'light';
import {Intersection, Lighting, Ray} from 'ray';
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

  public static getViewTransform(
    from: Point,
    to: Point,
    up: Vector3D,
  ): Transform3D {
    const forwardVector = Vector3DFactory.fromPoints(from, to).normalize();
    const leftVector = forwardVector.cross(up.normalize());
    const trueUpVector = leftVector.cross(forwardVector);

    const orientationMatrix = Matrix.fromArray([
      [leftVector.x, leftVector.y, leftVector.z, 0],
      [trueUpVector.x, trueUpVector.y, trueUpVector.z, 0],
      [-forwardVector.x, -forwardVector.y, -forwardVector.z, 0],
      [0, 0, 0, 1],
    ]);
    const orientationTransform = Transform3D.fromMatrix(orientationMatrix);

    const translation = Translation3D.translation(-from.x, -from.y, -from.z);

    return Transform3DPipeline.init()
      .pipe(orientationTransform, translation)
      .value();
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

  public shadeHit(hit: WorldHit): Color {
    return Lighting.lighting({
      material: hit.object.material,
      light: this.light,
      position: hit.point,
      eyeVector: hit.eyeVector,
      normalVector: hit.normalVector,
    });
  }

  public colorAt(ray: Ray): Color {
    const intersections = this.intersect(ray);
    const mainIntersection = intersections.filter(i => i.t >= 0)[0];
    if (!mainIntersection) {
      return Color.black();
    }
    const hit = this.prepareHit(ray, mainIntersection);
    return this.shadeHit(hit);
  }
}

export default World;
