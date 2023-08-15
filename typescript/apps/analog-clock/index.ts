import {
  Canvas,
  Color,
  Point,
  Rotation3D,
  Scaling3D,
  Transform3DPipeline,
  Translation3D,
} from 'core';
import * as fs from 'fs';

const HOURS = 12;

export const getHourPoints = (size: number, radius: number): Point[] => {
  const midnightPoint = new Point(0, 1, 0);

  return Array(HOURS)
    .fill(0)
    .map((_, i) => {
      const angle = (-i / HOURS) * 2 * Math.PI;

      return Transform3DPipeline.init()
        .pipe(
          Rotation3D.rotationZ(angle),
          Scaling3D.scaling(radius, radius, 0),
          Translation3D.translation(size / 2, size / 2, 0),
        )
        .transformPoint(midnightPoint)
        .map(Math.round);
    });
};

const main = () => {
  const size = 100;
  const clockRadius = size / 2 - 10;
  const canvas = new Canvas(size, size);

  const hourTicks = getHourPoints(size, clockRadius);
  hourTicks.forEach(point => {
    canvas.writePixel(point.x, point.y, new Color(1, 1, 1));
  });

  fs.writeFileSync('clock.ppm', canvas.toPPM());
};

main();
