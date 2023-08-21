import {Color} from 'core';

interface PhongMaterialCreationParams {
  color?: Color;
  ambient?: number;
  diffuse?: number;
  specular?: number;
  shininess?: number;
}

class PhongMaterial {
  private readonly _color: Color;
  private readonly _ambient: number;
  private readonly _diffuse: number;
  private readonly _specular: number;
  private readonly _shininess: number;

  constructor(params: PhongMaterialCreationParams = {}) {
    if (params.ambient && (params.ambient < 0 || params.ambient > 1)) {
      throw new Error('Ambient must be between 0 and 1');
    }
    if (params.diffuse && (params.diffuse < 0 || params.diffuse > 1)) {
      throw new Error('Diffuse must be between 0 and 1');
    }
    if (params.specular && (params.specular < 0 || params.specular > 1)) {
      throw new Error('Specular must be between 0 and 1');
    }
    if (params.shininess && params.shininess < 0) {
      throw new Error('Shininess must be greater than 0');
    }

    this._color = params.color || new Color(1, 1, 1);
    this._ambient = params.ambient ?? 0.1;
    this._diffuse = params.diffuse ?? 0.9;
    this._specular = params.specular ?? 0.9;
    this._shininess = params.shininess ?? 200;
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

  public clone(): PhongMaterial {
    return new PhongMaterial({
      color: this._color,
      ambient: this._ambient,
      diffuse: this._diffuse,
      specular: this._specular,
      shininess: this._shininess,
    });
  }

  public equals(other: PhongMaterial): boolean {
    return (
      this._color.equals(other._color) &&
      this._ambient === other._ambient &&
      this._diffuse === other._diffuse &&
      this._specular === other._specular &&
      this._shininess === other._shininess
    );
  }
}

export default PhongMaterial;
