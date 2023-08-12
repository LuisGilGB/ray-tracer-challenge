import Tuple from './Tuple';

class Vector {
  protected readonly tuple: Tuple;

  constructor(...values: number[]) {
    this.tuple = new Tuple(...values);
    Object.freeze(this);
  }

  static fromTuple(tuple: Tuple): Vector {
    return new Vector(...tuple.toArray());
  }

  static fromArray(arr: number[]): Vector {
    return new Vector(...arr);
  }

  clone(): Vector {
    return Vector.fromTuple(this.tuple);
  }

  toArray(): number[] {
    return this.tuple.toArray();
  }

  toTuple(): Tuple {
    return this.tuple;
  }

  format() {
    return `(${this.tuple.format()})`;
  }

  print() {
    console.log(`Vector: (${this.format()})`);
  }

  at(index: number): number {
    return this.tuple.at(index);
  }

  equals(vector: Vector): boolean {
    return this.tuple.equals(vector.tuple);
  }

  add(vector: Vector): Vector {
    return Vector.fromTuple(this.tuple.add(vector.tuple));
  }

  subtract(vector: Vector): Vector {
    return Vector.fromTuple(this.tuple.subtract(vector.tuple));
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
    return Math.sqrt(
      this.tuple.toArray().reduce((sum, value) => sum + value ** 2, 0),
    );
  }

  normalize(): Vector {
    return this.divide(this.magnitude());
  }

  dot(vector: Vector): number {
    return this.tuple
      .toArray()
      .reduce((sum, value, i) => sum + value * vector.at(i), 0);
  }

  map(fn: (value: number, index: number) => number): Vector {
    return Vector.fromTuple(this.tuple.map(fn));
  }
}

export default Vector;
