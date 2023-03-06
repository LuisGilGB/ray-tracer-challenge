import Tuple from "./Tuple";

class Color {
  private tuple: Tuple;

  constructor(red: number, green: number, blue: number) {
    this.tuple = new Tuple(red, green, blue);
    Object.freeze(this);
  }

  get red(): number {
    return this.tuple.x;
  }

  get green(): number {
    return this.tuple.y;
  }

  get blue(): number {
    return this.tuple.z;
  }

  static fromNumbers(red: number, green: number, blue: number): Color {
    return new Color(red, green, blue);
  }

  static fromArray(array: number[]): Color {
    return new Color(array[0], array[1], array[2]);
  }

  static fromTuple(tuple: Tuple): Color {
    return new Color(tuple.x, tuple.y, tuple.z);
  }

  static fromObject(obj: {red: number, green: number, blue: number}): Color {
    return new Color(obj.red, obj.green, obj.blue);
  }

  static fromColor(color: Color): Color {
    return new Color(color.red, color.green, color.blue);
  }

  clone(): Color {
    return new Color(this.red, this.green, this.blue);
  }

  asTuple(): Tuple {
    return this.tuple.clone();
  }

  equals(color: Color): boolean {
    return this.tuple.equals(color.tuple);
  }
}

export default Color;
