import {Canvas, Color, Point, Vector3D} from 'core';
import * as fs from 'fs';
import {Hit, Intersection, Ray} from 'ray';
import {Sphere} from 'shapes';

const main = () => {
  const size = 40;
  const canvas = new Canvas(size, size);

  const horizonDistance = 100;
  const sphereDistance = horizonDistance * 0.75;
  const sphereRadius = 10;

  const rays = Array(size ** 2)
    .fill(0)
    .map((_, i) => {
      const origin = new Point(0, 0, 0);
      const direction = new Vector3D(
        i % size,
        Math.floor(i / size),
        horizonDistance,
      );

      return new Ray(origin, direction);
    });

  const sphere = new Sphere(new Point(0, 0, sphereDistance), sphereRadius);

  rays.forEach(ray => {
    const intersections = Intersection.raySphere(ray, sphere);
    const hit = Hit.fromIntersections(intersections);

    if (hit) {
      const pixel = {x: ray.direction.x, y: ray.direction.y};
      canvas.writePixel(pixel.x, pixel.y, new Color(1, 0, 0));
    }
  });

  fs.writeFileSync('output.ppm', canvas.toPPM());
  console.log('Done');
};

main();
