import Tuple from './Tuple';

type Tuple3DValues = [number, number, number];

class Tuple3D extends Tuple {
  constructor(...values: Tuple3DValues) {
    super(...values);
    Object.freeze(this);
  }

  static fromArray(arr: Tuple3DValues) {
    return new Tuple3D(...arr);
  }

  static fromTuple(tuple: Tuple) {
    return new Tuple3D(tuple.at(0), tuple.at(1), tuple.at(2));
  }

  clone(): Tuple3D {
    return Tuple3D.fromTuple(this);
  }

  toArray(): Tuple3DValues {
    return [this.at(0), this.at(1), this.at(2)];
  }

  format() {
    return `(${this.values.join(', ')})`;
  }

  print() {
    console.log(`Tuple3D: (${this.format()})`);
  }

  equals(tuple: Tuple3D): boolean {
    return this.values.every((value, i) => value === tuple.values[i]);
  }

  add(tuple: Tuple3D): Tuple3D {
    return Tuple3D.fromTuple(super.add(tuple));
  }

  subtract(tuple: Tuple3D): Tuple3D {
    return Tuple3D.fromTuple(super.subtract(tuple));
  }

  negate(): Tuple3D {
    return Tuple3D.fromTuple(super.negate());
  }

  multiply(scalar: number): Tuple3D {
    return Tuple3D.fromTuple(super.multiply(scalar));
  }

  divide(scalar: number): Tuple3D {
    return Tuple3D.fromTuple(super.divide(scalar));
  }
}

export default Tuple3D;
