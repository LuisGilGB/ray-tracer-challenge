import {Color} from 'core';

interface PhongMaterialCreationParams {
  color: Color;
  ambient: number;
  diffuse: number;
  specular: number;
  shininess: number;
}

class PhongMaterial {
  private readonly _color: Color;
  private readonly _ambient: number;
  private readonly _diffuse: number;
  private readonly _specular: number;
  private readonly _shininess: number;

  constructor(params: PhongMaterialCreationParams) {
    if (params.ambient < 0 || params.ambient > 1) {
      throw new Error('Ambient must be between 0 and 1');
    }
    if (params.diffuse < 0 || params.diffuse > 1) {
      throw new Error('Diffuse must be between 0 and 1');
    }
    if (params.specular < 0 || params.specular > 1) {
      throw new Error('Specular must be between 0 and 1');
    }
    if (params.shininess < 0) {
      throw new Error('Shininess must be greater than 0');
    }

    this._color = params.color;
    this._ambient = params.ambient;
    this._diffuse = params.diffuse;
    this._specular = params.specular;
    this._shininess = params.shininess;
    Object.freeze(this);
  }

  get color(): Color {
    return this._color;
  }

  get ambient(): number {
    return this._ambient;
  }

  get diffuse(): number {
    return this._diffuse;
  }

  get specular(): number {
    return this._specular;
  }

  get shininess(): number {
    return this._shininess;
  }
}

export default PhongMaterial;
