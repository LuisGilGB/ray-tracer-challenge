import {Point, Transform3D, Vector3DFactory} from 'core';
import {Ray} from 'ray';

interface CameraParams {
  hSize: number;
  vSize: number;
  fieldOfView: number;
  transform?: Transform3D;
}

class Camera {
  private readonly _hSize: number;
  private readonly _vSize: number;
  private readonly _fieldOfView: number;
  private readonly _halfWidth: number;
  private readonly _halfHeight: number;
  private readonly _pixelSize: number;
  private readonly _transform: Transform3D;

  constructor({
    hSize,
    vSize,
    fieldOfView,
    transform = Transform3D.identity(),
  }: CameraParams) {
    this._hSize = hSize;
    this._vSize = vSize;
    this._fieldOfView = fieldOfView;

    const halfFieldOfView = Math.tan(fieldOfView / 2);
    const aspectRatio = hSize / vSize;

    const [halfWidth, halfHeight] =
      aspectRatio >= 1
        ? [halfFieldOfView, halfFieldOfView / aspectRatio]
        : [halfFieldOfView * aspectRatio, halfFieldOfView];

    this._halfWidth = halfWidth;
    this._halfHeight = halfHeight;

    this._pixelSize = (halfWidth * 2) / hSize;

    this._transform = transform;
    Object.freeze(this);
  }

  public get hSize(): number {
    return this._hSize;
  }

  public get vSize(): number {
    return this._vSize;
  }

  public get fieldOfView(): number {
    return this._fieldOfView;
  }

  public get pixelSize(): number {
    return this._pixelSize;
  }

  public get transform(): Transform3D {
    return this._transform;
  }

  public rayForPixel(x: number, y: number): Ray {
    const xOffset = (x + 0.5) * this.pixelSize;
    const yOffset = (y + 0.5) * this.pixelSize;

    const worldX = this._halfWidth - xOffset;
    const worldY = this._halfHeight - yOffset;

    const pixel = this.transform
      .getInverse()
      .transformPoint(new Point(worldX, worldY, -1));
    const origin = this.transform.getInverse().transformPoint(Point.origin());
    const direction = Vector3DFactory.fromPoints(origin, pixel).normalize();

    return new Ray(origin, direction);
  }
}

export default Camera;
