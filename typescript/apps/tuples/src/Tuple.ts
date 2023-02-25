class Tuple {
  constructor(public x: number, public y: number, public z: number) {}

  static fromArray(arr: number[]): Tuple {
    return new Tuple(arr[0], arr[1], arr[2]);
  }

  static fromObject(obj: {x: number, y: number, z: number}): Tuple {
    return new Tuple(obj.x, obj.y, obj.z);
  }

  static fromTuple(t: Tuple): Tuple {
    return new Tuple(t.x, t.y, t.z);
  }

  clone(): Tuple {
    return new Tuple(this.x, this.y, this.z);
  }

  toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  public equals(t: Tuple): boolean {
    return this.x === t.x && this.y === t.y && this.z === t.z;
  }

  public add(t: Tuple): Tuple {
    return new Tuple(this.x + t.x, this.y + t.y, this.z + t.z);
  }

  public subtract(t: Tuple): Tuple {
    return new Tuple(this.x - t.x, this.y - t.y, this.z - t.z);
  }

  public negate(): Tuple {
    return new Tuple(-this.x, -this.y, -this.z);
  }
}

export default Tuple;
