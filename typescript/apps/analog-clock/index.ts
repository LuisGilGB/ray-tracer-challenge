import {
  Canvas,
  Color,
  Point,
  Rotation3D,
  Transform3DPipeline,
  Translation3D,
} from 'core';
import * as fs from 'fs';

const main = () => {
  const size = 100;
  const clockRadius = size / 2 - 10;
  const hours = 12;
  const canvas = new Canvas(size, size);

  const midnightPoint = new Point(0, -clockRadius, 0);
  const hourTicks = Array(hours)
    .fill(0)
    .map((_, i) => {
      const angle = (i / hours) * 2 * Math.PI;

      return Transform3DPipeline.init()
        .pipe(
          Rotation3D.rotationZ(angle),
          Translation3D.translation(size / 2, size / 2, 0),
        )
        .transformPoint(midnightPoint);
    });
  hourTicks.forEach(point => {
    canvas.writePixel(point.x, point.y, new Color(1, 1, 1));
  });

  fs.writeFileSync('clock.ppm', canvas.toPPM());
};

main();
