class Tuple {
  protected readonly values: number[];

  constructor(...values: number[]) {
    this.values = values;
    Object.freeze(this);
  }

  static fromArray(arr: number[]) {
    return new Tuple(...arr);
  }

  static fromTuple(tuple: Tuple) {
    return new Tuple(...tuple.values);
  }

  clone() {
    return new Tuple(...this.values);
  }

  toArray() {
    return [...this.values];
  }

  format() {
    return `(${this.values.join(', ')})`;
  }

  print() {
    console.log(`Tuple: (${this.format()})`);
  }

  size() {
    return this.values.length;
  }

  at(index: number) {
    return this.values[index];
  }

  equals(tuple: Tuple) {
    return this.values.every((value, i) => value === tuple.values[i]);
  }

  add(tuple: Tuple) {
    return new Tuple(...this.values.map((value, i) => value + tuple.values[i]));
  }

  subtract(tuple: Tuple) {
    return new Tuple(...this.values.map((value, i) => value - tuple.values[i]));
  }

  negate() {
    return new Tuple(
      ...this.values.map(value => (value === 0 ? value : -value)),
    );
  }

  multiply(scalar: number) {
    return new Tuple(...this.values.map(value => value * scalar));
  }

  divide(scalar: number) {
    return new Tuple(...this.values.map(value => value / scalar));
  }

  map(fn: (value: number, index: number) => number) {
    return new Tuple(...this.values.map(fn));
  }
}

export default Tuple;
