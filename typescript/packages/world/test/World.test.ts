import {Color, Point, Vector3D} from 'core';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';
import {Ray} from 'ray';
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
  const sphere1 = new Sphere(center, 1, material);
  const sphere2 = new Sphere(center, 0.5, material);

  it('Creates a world with the provided light and objects', () => {
    const world = new World(light, [sphere1, sphere2]);

    expect(world.light).toBe(light);
    expect(world.objects).toEqual([sphere1, sphere2]);
  });

  it('Computes intersections of a ray in the world', () => {
    const world = new World(light, [sphere1, sphere2]);
    const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));

    const intersections = world.intersect(ray);

    expect(intersections.length).toBe(4);
    expect(intersections[0].t).toBe(4);
    expect(intersections[1].t).toBe(4.5);
    expect(intersections[2].t).toBe(5.5);
    expect(intersections[3].t).toBe(6);
  });

  it('Precomputes the state of an intersection', () => {
    const world = new World(light, [sphere1, sphere2]);
    const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));

    const intersections = world.intersect(ray);
    const hit = world.prepareHit(ray, intersections[0]);

    expect(hit.point).toEqual(new Point(0, 0, -1));
    expect(hit.eyeVector).toEqual(new Vector3D(0, 0, -1));
    expect(hit.normalVector).toEqual(new Vector3D(0, 0, -1));
  });
});
