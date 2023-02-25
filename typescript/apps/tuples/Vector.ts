class Vector {
  constructor(public x: number, public y: number, public z: number ) {}

  static fromArray(array: number[]): Vector {
    return new Vector(array[0], array[1], array[2]);
  }
}

export default Vector;
