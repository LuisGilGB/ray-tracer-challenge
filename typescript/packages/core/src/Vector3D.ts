import Tuple3D from './Tuple3D';
import Vector from './Vector';

class Vector3D extends Vector {
  constructor(x: number, y: number, z: number) {
    super(x, y, z);
    Object.freeze(this);
  }

  get x(): number {
    return this.at(0);
  }

  get y(): number {
    return this.at(1);
  }

  get z(): number {
    return this.at(2);
  }

  static fromArray(arr: [number, number, number]): Vector3D {
    return new Vector3D(...arr);
  }

  static fromVector(vector: Vector): Vector3D {
    return new Vector3D(vector.at(0), vector.at(1), vector.at(2));
  }

  static fromObject(obj: {x: number; y: number; z: number}): Vector3D {
    return new Vector3D(obj.x, obj.y, obj.z);
  }

  clone(): Vector3D {
    return Vector3D.fromVector(this);
  }

  toObject(): {x: number; y: number; z: number} {
    return {x: this.x, y: this.y, z: this.z};
  }

  toTuple(): Tuple3D {
    return new Tuple3D(this.x, this.y, this.z);
  }

  add(vector: Vector3D): Vector3D {
    return Vector3D.fromVector(super.add(vector));
  }

  subtract(vector: Vector3D): Vector3D {
    return Vector3D.fromVector(super.subtract(vector));
  }

  negate(): Vector3D {
    return Vector3D.fromVector(super.negate());
  }

  multiply(scalar: number): Vector3D {
    return Vector3D.fromVector(super.multiply(scalar));
  }

  divide(scalar: number): Vector3D {
    return Vector3D.fromVector(super.divide(scalar));
  }

  normalize(): Vector3D {
    return Vector3D.fromVector(super.normalize());
  }

  cross(vector: Vector3D): Vector3D {
    return new Vector3D(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x,
    );
  }
}

export default Vector3D;
