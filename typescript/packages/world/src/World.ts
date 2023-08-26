import {PointLight} from 'light';
import {Sphere} from 'shapes';

class World {
  private readonly _light: PointLight;
  private readonly _objects: Sphere[];

  constructor(light: PointLight, objects: Sphere[]) {
    this._light = light;
    this._objects = objects;
  }

  public get light(): PointLight {
    return this._light;
  }

  public get objects(): Sphere[] {
    return this._objects;
  }
}

export default World;
