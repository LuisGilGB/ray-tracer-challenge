import Matrix from '../Matrix';
import Point from '../Point';
import Tuple from '../Tuple';
import Tuple3D from '../Tuple3D';
import Vector3D from '../Vector3D';

class Translation3D {
  private readonly _matrix: Matrix;

  constructor(tuple: Tuple3D) {
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

  public static fromMatrix(matrix: Matrix): Translation3D {
    return new Translation3D(
      Tuple3D.fromArray([matrix.at(0, 3), matrix.at(1, 3), matrix.at(2, 3)]),
    );
  }

  public static translation(x: number, y: number, z: number): Translation3D {
    return new Translation3D(Tuple3D.fromArray([x, y, z]));
  }

  public getInverse(): Translation3D {
    return Translation3D.fromMatrix(this.matrix.getInverse());
  }

  public translatePoint(point: Point): Point {
    return Point.fromArray(
      this._matrix
        .multiplyTuple(Tuple.fromArray([...point.toArray(), 1]))
        .toArray(),
    );
  }

  public translateVector(vector: Vector3D): Vector3D {
    return vector;
  }
}

export default Translation3D;
