class Point {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static fromArray(array: number[]): Point {
    return new Point(array[0], array[1], array[2]);
  }
}

export default Point;
