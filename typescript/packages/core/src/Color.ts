import Tuple3D from './Tuple3D';

class Color {
  private tuple: Tuple3D;

  constructor(red: number, green: number, blue: number) {
    this.tuple = new Tuple3D(red, green, blue);
    Object.freeze(this);
  }

  get red(): number {
    return this.tuple.at(0);
  }

  get green(): number {
    return this.tuple.at(1);
  }

  get blue(): number {
    return this.tuple.at(2);
  }

  static fromNumbers(red: number, green: number, blue: number): Color {
    return new Color(red, green, blue);
  }

  static fromArray(array: number[]): Color {
    return new Color(array[0], array[1], array[2]);
  }

  static fromTuple(tuple: Tuple3D): Color {
    return new Color(tuple.at(0), tuple.at(1), tuple.at(2));
  }

  static fromObject(obj: {red: number; green: number; blue: number}): Color {
    return new Color(obj.red, obj.green, obj.blue);
  }

  static fromColor(color: Color): Color {
    return new Color(color.red, color.green, color.blue);
  }

  clone(): Color {
    return new Color(this.red, this.green, this.blue);
  }

  toArray(): [number, number, number] {
    return this.tuple.toArray();
  }

  toTuple(): Tuple3D {
    return this.tuple.clone();
  }

  equals(color: Color): boolean {
    return this.tuple.equals(color.tuple);
  }

  keys(): ['red', 'green', 'blue'] {
    return ['red', 'green', 'blue'];
  }

  add(color: Color): Color {
    return Color.fromTuple(this.tuple.add(color.tuple));
  }

  subtract(color: Color): Color {
    return Color.fromTuple(this.tuple.subtract(color.tuple));
  }

  multiply(scalar: number): Color {
    return Color.fromTuple(this.tuple.multiply(scalar));
  }

  hadamardProduct(color: Color): Color {
    return Color.fromObject({
      red: this.red * color.red,
      green: this.green * color.green,
      blue: this.blue * color.blue,
    });
  }
}

export default Color;
