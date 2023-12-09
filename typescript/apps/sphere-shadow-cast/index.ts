import {
  Canvas,
  Color,
  Rotation3D,
  Scaling3D,
  Transform3DPipeline,
  Translation3D,
  Tuple3D,
} from 'core';
import * as fs from 'fs';
import {Hit, Intersection} from 'ray';
import {Sphere} from 'shapes';
import {getRaysToCanvas} from './utils';

const main = () => {
  const size = 40;
  const canvas = new Canvas(size, size);
  const halfSize = Math.floor(size / 2);

  const centerTranslation = new Translation3D(
    new Tuple3D(halfSize, halfSize, 0),
  );

  const horizonDistance = 15;
  const sphereDistance = horizonDistance / 3;
  const sphereRadius = 2;

  const rays = getRaysToCanvas(canvas, horizonDistance);

  const sphereTransformation = Transform3DPipeline.init()
    .pipe(
      Scaling3D.scaling(sphereRadius, 1, sphereRadius),
      Rotation3D.rotationZ(Math.PI / 4),
      centerTranslation,
      Translation3D.translation(0, 2, sphereDistance),
    )
    .value();

  console.log('Sphere transformation: ');
  sphereTransformation.matrix.print();

  const sphere = Sphere.unitSphere().transform(sphereTransformation);

  console.log('Sphere: ', sphere);
  console.log('Sphere center: ', sphere.center.toArray());
  console.log('Sphere self transform:');
  sphere.selfTransform.matrix.print();

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
