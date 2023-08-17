import {Canvas, Color, Point, Translation3D, Tuple3D} from 'core';
import * as fs from 'fs';
import {Hit, Intersection} from 'ray';
import {Sphere} from 'shapes';
import {getRaysToCanvas} from './utils';

const main = () => {
  const size = 400;
  const canvas = new Canvas(size, size);
  const halfSize = Math.floor(size / 2);

  const centerTranslation = new Translation3D(
    new Tuple3D(halfSize, halfSize, 0),
  );

  const horizonDistance = 100;
  const sphereDistance = horizonDistance * 0.4;
  const sphereRadius = 10;

  const rays = getRaysToCanvas(canvas, horizonDistance);

  const sphere = new Sphere(
    centerTranslation.transformPoint(new Point(0, 0, sphereDistance)),
    sphereRadius,
  );

  rays.forEach(ray => {
    const intersections = Intersection.raySphere(ray, sphere);
    const hit = Hit.fromIntersections(intersections);

    if (hit) {
      const pixel = {
        x: ray.direction.x + halfSize,
        y: ray.direction.y + halfSize,
      };
      canvas.writePixel(pixel.x, pixel.y, new Color(1, 0, 0));
    }
  });

  console.log('Writing file...');
  fs.writeFileSync('output.ppm', canvas.toPPM());
  console.log('Done');
};

main();
