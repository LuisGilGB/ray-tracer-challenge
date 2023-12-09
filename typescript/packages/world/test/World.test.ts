import {Canvas, Color, Point, Scaling3D, Translation3D, Vector3D} from 'core';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';
import {Intersection, Ray} from 'ray';
import {Sphere} from 'shapes';
import Camera from '../src/Camera';
import ViewTransform from '../src/ViewTransform';
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

    it('Returns an over point that comes from the offset of the point', () => {
      const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));
      const world = new World(light, [
        Sphere.unitSphere().transform(Translation3D.translation(0, 0, 1)),
      ]);
      const intersections = world.intersect(ray);
      const hit = world.prepareHit(ray, intersections[0]);

      expect(hit.overPoint.z).toBeLessThan(-Number.EPSILON / 2);
      expect(hit.point.z).toBeGreaterThan(hit.overPoint.z);
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

    describe('Shadow tests', () => {
      it('Shadows an intersection', () => {
        const world = new World(light, [Sphere.unitSphere()]);
        const point = new Point(0, 10, 0);

        expect(world.isShadowedAt(point)).toBe(false);
      });

      it('Does not shadow an intersection', () => {
        const world = new World(light, [Sphere.unitSphere()]);
        const point = new Point(10, -10, 10);

        expect(world.isShadowedAt(point)).toBe(true);
      });

      it('Does not shadow an intersection between the point and the light', () => {
        const world = new World(light, [Sphere.unitSphere()]);
        const point = new Point(-20, 20, -20);

        expect(world.isShadowedAt(point)).toBe(false);
      });

      it('Does not shadow an intersection between the light and the point', () => {
        const world = new World(light, [Sphere.unitSphere()]);
        const point = new Point(-2, 2, -2);

        expect(world.isShadowedAt(point)).toBe(false);
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

      it('Computes the hit color in shadow', () => {
        const light = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));
        const world = new World(light, [
          Sphere.unitSphere().transform(Translation3D.translation(0, 0, 10)),
        ]);
        const ray = new Ray(new Point(0, 0, 5), new Vector3D(0, 0, 1));

        const intersections = world.intersect(ray);
        const color = world.shadeHit(world.prepareHit(ray, intersections[0]));
        const expectedColor = new Color(0.1, 0.1, 0.1);

        color.toArray().forEach((c: number, i: number) => {
          expect(c).toBeCloseTo(expectedColor.toArray()[i]);
        });
      });
    });
  });

  describe('Render tests', () => {
    it('Renders a world', () => {
      const world = new World(light, [outerSphere, innerSphere]);
      const camera = new Camera({
        hSize: 11,
        vSize: 11,
        fieldOfView: Math.PI / 2,
        transform: ViewTransform.build(
          new Point(0, 0, -5),
          new Point(0, 0, 0),
          new Vector3D(0, 1, 0),
        ),
      });

      const canvas: Canvas = world.render(camera);
      const expectedColor = new Color(0.38066, 0.47583, 0.2855);

      canvas
        .getPixel(5, 5)
        .toArray()
        .forEach((c: number, i: number) => {
          expect(c).toBeCloseTo(expectedColor.toArray()[i]);
        });
    });
  });
});
