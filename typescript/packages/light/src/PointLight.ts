import {Color, Point} from 'core';

class PointLight {
  private readonly _position: Point;
  private readonly _intensity: Color;

  constructor(position: Point, intensity: Color) {
    this._position = position;
    this._intensity = intensity;
  }

  get position(): Point {
    return this._position;
  }

  get intensity(): Color {
    return this._intensity;
  }
}

export default PointLight;
