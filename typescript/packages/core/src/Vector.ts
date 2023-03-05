import Tuple from "./Tuple";

class Vector {
  private tuple: Tuple;

  constructor(x: number, y: number, z: number) {
    this.tuple = new Tuple(x, y, z);
    Object.freeze(this);
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

  asTuple(): Tuple {
    return this.tuple.clone();
  }

  equals(vector: Vector): boolean {
    return this.tuple.equals(vector.asTuple());
  }

  add(vector: Vector): Vector {
    return Vector.fromTuple(this.tuple.add(vector.asTuple()));
  }

  subtract(vector: Vector): Vector {
    return Vector.fromTuple(this.tuple.subtract(vector.asTuple()));
  }

  negate(): Vector {
    return Vector.fromTuple(this.tuple.negate());
  }

  multiply(scalar: number): Vector {
    return Vector.fromTuple(this.tuple.multiply(scalar));
  }

  divide(scalar: number): Vector {
    return Vector.fromTuple(this.tuple.divide(scalar));
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize(): Vector {
    return this.divide(this.magnitude());
  }

  dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  cross(vector: Vector): Vector {
    return new Vector(
      this.y * vector.z - this.z * vector.y,
      this.z * vector.x - this.x * vector.z,
      this.x * vector.y - this.y * vector.x
    );
  }
}

export default Vector;
