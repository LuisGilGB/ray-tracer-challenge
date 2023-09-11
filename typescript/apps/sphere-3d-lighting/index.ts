import {
  Canvas,
  Color,
  Point,
  Scaling3D,
  Transform3DPipeline,
  Translation3D,
  Tuple3D,
} from 'core';
import * as fs from 'fs';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';
import {Hit, Intersection, Lighting} from 'ray';
import {Sphere} from 'shapes';
import {getRaysToCanvas} from './utils';

const main = () => {
  const size = 200;
  const canvas = new Canvas(size, size);
  const halfSize = Math.floor(size / 2);

  const centerTranslation = new Translation3D(
    new Tuple3D(halfSize, halfSize, 0),
  );

  const horizonDistance = size * 0.75;
  const sphereDistance = horizonDistance * 0.8;
  const sphereRadius = size * 0.25;

  const rays = getRaysToCanvas(canvas, horizonDistance);

  const sphere = Sphere.unitSphere().cloneWith({
    material: new PhongMaterial({
      color: new Color(1, 0.2, 1),
    }),
    selfTransform: Transform3DPipeline.init()
      .pipe(
        Scaling3D.scaling(sphereRadius, sphereRadius, sphereRadius),
        Translation3D.translation(0, 0, sphereDistance),
      )
      .value(),
  });

  const light = new PointLight(new Point(-10, -10, -300), new Color(1, 1, 1));

  rays.forEach((ray, i) => {
    const intersections = Intersection.raySphere(ray, sphere);
    const hit = Hit.fromIntersections(intersections);

    if (hit) {
      const hitPosition = ray.position(hit.t);
      const color = Lighting.lighting({
        material: sphere.material,
        light,
        position: hitPosition,
        eyeVector: ray.direction.negate(),
        normalVector: sphere.normal(hitPosition),
      });
      const pixel = {
        x: i % size,
        y: Math.floor(i / size),
      };
      canvas.writePixel(pixel.x, pixel.y, color);
    }
  });

  console.log('Writing file...');
  fs.writeFileSync('output.ppm', canvas.toPPM());
  console.log('Done');
};

main();
