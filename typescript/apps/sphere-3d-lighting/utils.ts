import {Canvas, Point, Translation3D, Tuple3D, Vector3D} from 'core';
import {Ray} from 'ray';

export const getRaysToCanvas = (canvas: Canvas, canvasDistance: number) => {
  const {width, height} = canvas;
  const halfWidth = Math.floor(width / 2);
  const halfHeight = Math.floor(height / 2);

  const centerTranslation = new Translation3D(
    new Tuple3D(halfWidth, halfHeight, 0),
  );
  const origin = centerTranslation.translatePoint(new Point(0, 0, 0));

  return Array(width * height)
    .fill(0)
    .map((_, i) => {
      const direction = new Vector3D(
        (i % width) - halfWidth,
        Math.floor(i / width) - halfHeight,
        canvasDistance,
      );

      return new Ray(origin, direction.normalize());
    });
};
