import Tuple3D from './Tuple3D';
import Vector3D from './Vector3D';

class Point {
  private tuple: Tuple3D;

  constructor(x: number, y: number, z: number) {
    this.tuple = new Tuple3D(x, y, z);
    Object.freeze(this);
  }

  get x(): number {
    return this.tuple.at(0);
  }

  get y(): number {
    return this.tuple.at(1);
  }

  get z(): number {
    return this.tuple.at(2);
  }

  static fromNumbers(x: number, y: number, z: number): Point {
    return new Point(x, y, z);
  }

  static fromArray(array: number[]): Point {
    return new Point(array[0], array[1], array[2]);
  }

  static fromTuple(tuple: Tuple3D): Point {
    return new Point(tuple.at(0), tuple.at(1), tuple.at(2));
  }

  static fromObject(obj: {x: number; y: number; z: number}): Point {
    return new Point(obj.x, obj.y, obj.z);
  }

  static fromPoint(point: Point): Point {
    return new Point(point.x, point.y, point.z);
  }

  format(): string {
    return `(${this.tuple.format()})`;
  }

  print() {
    console.log(`Point: ${this.format()}`);
  }

  clone(): Point {
    return new Point(this.x, this.y, this.z);
  }

  toArray(): number[] {
    return this.tuple.toArray();
  }

  toTuple(): Tuple3D {
    return this.tuple.clone();
  }

  equals(point: Point): boolean {
    return this.tuple.equals(point.tuple);
  }

  addVector(vector: Vector3D): Point {
    return Point.fromTuple(this.tuple.add(vector.toTuple()));
  }

  subtractVector(vector: Vector3D): Point {
    return Point.fromTuple(this.tuple.subtract(vector.toTuple()));
  }
}

export default Point;
