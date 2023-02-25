import Tuple from "./Tuple";

class Vector {
  private tuple: Tuple;

  constructor(x: number, y: number, z: number) {
    this.tuple = new Tuple(x, y, z);
  }

  get x(): number {
    return this.tuple.x;
  }

  get y(): number {
    return this.tuple.y;
  }

  get z(): number {
    return this.tuple.z;
  }

  static fromTuple(tuple: Tuple): Vector {
    return new Vector(tuple.x, tuple.y, tuple.z);
  }

  static fromNumbers(x: number, y: number, z: number): Vector {
    return new Vector(x, y, z);
  }

  static fromArray(array: number[]): Vector {
    return new Vector(array[0], array[1], array[2]);
  }

  static fromVector(vector: Vector): Vector {
    return new Vector(vector.x, vector.y, vector.z);
  }

  static fromObject(obj: {x: number, y: number, z: number}): Vector {
    return new Vector(obj.x, obj.y, obj.z);
  }

  clone(): Vector {
    return new Vector(this.x, this.y, this.z);
  }

  equals(vector: Vector): boolean {
    return this.tuple.equals(vector.tuple);
  }
}

export default Vector;
