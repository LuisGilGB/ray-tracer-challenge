import {Color, Point, Scaling3D, Vector3D} from 'core';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';
import {Intersection, Ray} from 'ray';
import {Sphere} from 'shapes';
import World from '../src/World';

describe('World tests', () => {
  const light = new PointLight(new Point(-10, 10, -10), new Color(1, 1, 1));
  const center = new Point(0, 0, 0);
  const material = new PhongMaterial({
    color: new Color(0.8, 1.0, 0.6),
    diffuse: 0.7,
    specular: 0.2,
  });
  const outerSphere = new Sphere(center, 1, material);
  const innerSphere = Sphere.unitSphere().cloneWith({
    material: new PhongMaterial(),
    selfTransform: Scaling3D.scaling(0.5, 0.5, 0.5),
  });

  it('Creates a world with the provided light and objects', () => {
    const world = new World(light, [outerSphere, innerSphere]);

    expect(world.light).toBe(light);
    expect(world.objects).toEqual([outerSphere, innerSphere]);
  });

  it('Computes intersections of a ray in the world', () => {
    const world = new World(light, [outerSphere, innerSphere]);
    const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));

    const intersections = world.intersect(ray);

    expect(intersections.length).toBe(4);
    expect(intersections[0].t).toBe(4);
    expect(intersections[1].t).toBe(4.5);
    expect(intersections[2].t).toBe(5.5);
    expect(intersections[3].t).toBe(6);
  });

  describe('Precomputation tests', () => {
    it('Precomputes the state of an intersection', () => {
      const world = new World(light, [outerSphere, innerSphere]);
      const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));

      const intersections = world.intersect(ray);
      const hit = world.prepareHit(ray, intersections[0]);

      expect(hit.point).toEqual(new Point(0, 0, -1));
      expect(hit.eyeVector).toEqual(new Vector3D(0, 0, -1));
      expect(hit.normalVector).toEqual(new Vector3D(0, 0, -1));
    });

    it('Precomputes the state of an intersection from the inside', () => {
      const world = new World(light, [Sphere.unitSphere()]);
      const ray = new Ray(center, new Vector3D(0, 0, 1));

      const intersections = world.intersect(ray);
      const hit = world.prepareHit(ray, intersections[1]);

      expect(hit.inside).toBe(true);
    });

    it('Precomputes the state of an intersection from the outside', () => {
      const world = new World(light, [Sphere.unitSphere()]);
      const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));

      const intersections = world.intersect(ray);
      const hit = world.prepareHit(ray, intersections[0]);

      expect(hit.inside).toBe(false);
    });

    it('Precomputes the normal vector as inverted when the intersection is inside', () => {
      const world = new World(light, [Sphere.unitSphere()]);
      const ray = new Ray(center, new Vector3D(0, 0, 1));

      const intersections = world.intersect(ray);
      const hit = world.prepareHit(ray, intersections[1]);

      expect(hit.point).toEqual(new Point(0, 0, 1));
      expect(hit.eyeVector).toEqual(new Vector3D(0, 0, -1));
      expect(hit.normalVector).toEqual(new Vector3D(0, 0, -1));
      expect(hit.inside).toBe(true);
    });
  });

  describe('Shading tests', () => {
    it('Computes the color when a ray hits', () => {
      const world = new World(light, [outerSphere, innerSphere]);
      const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));

      const intersections = world.intersect(ray);
      const color = world.shadeHit(world.prepareHit(ray, intersections[0]));
      const expectedColor = new Color(0.38066, 0.47583, 0.2855);

      color.toArray().forEach((c: number, i: number) => {
        expect(c).toBeCloseTo(expectedColor.toArray()[i]);
      });
    });

    it('Computes the color when a ray hits from the inside', () => {
      const insideLight = new PointLight(
        new Point(0, 0.25, 0),
        new Color(1, 1, 1),
      );
      const world = new World(insideLight, [outerSphere, innerSphere]);
      const ray = new Ray(new Point(0, 0, 0), new Vector3D(0, 0, 1));

      const intersections = world.intersect(ray);
      const color = world.shadeHit(
        world.prepareHit(ray, intersections.find(i => i.t > 0) as Intersection),
      );
      const expectedColor = new Color(0.90498, 0.90498, 0.90498);

      color.toArray().forEach((c: number, i: number) => {
        expect(c).toBeCloseTo(expectedColor.toArray()[i]);
      });
    });

    describe('Color at tests', () => {
      it('Computes the color when a ray misses', () => {
        const world = new World(light, [outerSphere, innerSphere]);
        const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 1, 0));

        const color = world.colorAt(ray);

        expect(color).toEqual(Color.black());
      });

      it('Computes the color when a ray hits', () => {
        const world = new World(light, [outerSphere, innerSphere]);
        const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));

        const color = world.colorAt(ray);
        const expectedColor = new Color(0.38066, 0.47583, 0.2855);

        color.toArray().forEach((c: number, i: number) => {
          expect(c).toBeCloseTo(expectedColor.toArray()[i]);
        });
      });

      it('Computes the color with an intersection behind the ray', () => {
        const world = new World(light, [
          outerSphere.cloneWith({
            material: new PhongMaterial({
              ...material,
              ambient: 1,
            }),
          }),
          innerSphere.cloneWith({
            material: new PhongMaterial({
              ...material,
              ambient: 1,
            }),
          }),
        ]);
        const ray = new Ray(new Point(0, 0, 0.75), new Vector3D(0, 0, -1));

        const color = world.colorAt(ray);
        const expectedColor = innerSphere.material.color;

        color.toArray().forEach((c: number, i: number) => {
          expect(c).toBeCloseTo(expectedColor.toArray()[i]);
        });
      });
    });
  });
});
