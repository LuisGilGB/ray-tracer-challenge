import {
  Point,
  Rotation3D,
  Transform3D,
  Transform3DPipeline,
  Translation3D,
  Vector3D,
} from 'core';
import Camera from '../src/Camera';

describe('Camera tests', () => {
  it('Constructs a camera', () => {
    const hSize = 160;
    const vSize = 120;
    const fieldOfView = Math.PI / 2;

    const camera = new Camera({hSize, vSize, fieldOfView});

    expect(camera.hSize).toBe(hSize);
    expect(camera.vSize).toBe(vSize);
    expect(camera.fieldOfView).toBe(fieldOfView);
    expect(camera.transform).toEqual(Transform3D.identity());
  });

  describe('Pixel size tests', () => {
    it('Computes the pixel size for a horizontal canvas', () => {
      const camera = new Camera({
        hSize: 200,
        vSize: 125,
        fieldOfView: Math.PI / 2,
      });

      expect(camera.pixelSize).toBeCloseTo(0.01);
    });

    it('Computes the pixel size for a vertical canvas', () => {
      const camera = new Camera({
        hSize: 125,
        vSize: 200,
        fieldOfView: Math.PI / 2,
      });

      expect(camera.pixelSize).toBeCloseTo(0.01);
    });
  });

  describe('Ray for pixels tests', () => {
    it('Constructs a ray through the center of the canvas', () => {
      const camera = new Camera({
        hSize: 201,
        vSize: 101,
        fieldOfView: Math.PI / 2,
      });

      const ray = camera.rayForPixel(100, 50);
      const expectedDirection = new Vector3D(0, 0, -1);

      expect(ray.origin).toEqual(new Point(0, 0, 0));
      ray.direction.toArray().forEach((d, i) => {
        expect(d).toBeCloseTo(expectedDirection.toArray()[i]);
      });
    });

    it('Constructs a ray through a corner of the canvas', () => {
      const camera = new Camera({
        hSize: 201,
        vSize: 101,
        fieldOfView: Math.PI / 2,
      });

      const ray = camera.rayForPixel(0, 0);

      const expectedDirection = new Vector3D(0.66519, 0.33259, -0.66851);

      expect(ray.origin).toEqual(new Point(0, 0, 0));
      ray.direction.toArray().forEach((d, i) => {
        expect(d).toBeCloseTo(expectedDirection.toArray()[i]);
      });
    });

    it('Constructs a ray when the camera is transformed', () => {
      const camera = new Camera({
        hSize: 201,
        vSize: 101,
        fieldOfView: Math.PI / 2,
        transform: Transform3DPipeline.init()
          .pipe(
            Rotation3D.rotationY(Math.PI / 4),
            Translation3D.translation(0, -2, 5),
          )
          .value(),
      });

      const ray = camera.rayForPixel(100, 50);
      const expectedDirection = new Vector3D(0.70711, 0, -0.70711);

      expect(ray.origin).toEqual(new Point(0, 2, -5));
      ray.direction.toArray().forEach((d, i) => {
        expect(d).toBeCloseTo(expectedDirection.toArray()[i]);
      });
    });
  });
});
