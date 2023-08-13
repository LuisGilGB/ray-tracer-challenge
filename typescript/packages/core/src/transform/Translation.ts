import Matrix from '../Matrix';
import Point from '../Point';
import Tuple from '../Tuple';
import Vector from '../Vector';

class Translation {
  private readonly _matrix: Matrix;

  constructor(tuple: Tuple) {
    this._matrix = Matrix.fromArray([
      [1, 0, 0, tuple.at(0)],
      [0, 1, 0, tuple.at(1)],
      [0, 0, 1, tuple.at(2)],
      [0, 0, 0, 1],
    ]);
    Object.freeze(this);
    Object.freeze(this._matrix);
  }

  public get matrix(): Matrix {
    return this._matrix;
  }

  public static translation(x: number, y: number, z: number): Translation {
    return new Translation(Tuple.fromArray([x, y, z, 1]));
  }

  public translatePoint(point: Point): Point {
    return Point.fromArray(
      this._matrix
        .multiplyTuple(Tuple.fromArray([...point.toArray(), 1]))
        .toArray(),
    );
  }

  public translateVector(vector: Vector): Vector {
    return vector;
  }
}

export default Translation;
