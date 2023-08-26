import {Color, Point} from 'core';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';
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
});
