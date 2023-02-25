class Vector {
  constructor(public x: number, public y: number, public z: number ) {}

  static fromArray(array: number[]): Vector {
    return new Vector(array[0], array[1], array[2]);
  }

  static fromVector(vector: Vector): Vector {
    return new Vector(vector.x, vector.y, vector.z);
  }

  equals(vector: Vector): boolean {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z;
  }
}

export default Vector;
