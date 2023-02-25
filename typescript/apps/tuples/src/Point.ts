import Tuple from "./Tuple";

class Point {
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

  static fromNumbers(x: number, y: number, z: number): Point {
    return new Point(x, y, z);
  }

  static fromArray(array: number[]): Point {
    return new Point(array[0], array[1], array[2]);
  }

  static fromTuple(tuple: Tuple): Point {
    return new Point(tuple.x, tuple.y, tuple.z);
  }

  static fromObject(obj: {x: number, y: number, z: number}): Point {
    return new Point(obj.x, obj.y, obj.z);
  }

  static fromPoint(point: Point): Point {
    return new Point(point.x, point.y, point.z);
  }

  clone(): Point {
    return new Point(this.x, this.y, this.z);
  }

  equals(point: Point): boolean {
    return this.tuple.equals(point.tuple);
  }
}

export default Point;
