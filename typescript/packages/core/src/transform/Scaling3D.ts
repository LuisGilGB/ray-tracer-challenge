import Matrix from '../Matrix';
import Point from '../Point';
import Tuple from '../Tuple';
import Tuple3D from '../Tuple3D';
import Vector from '../Vector';
import Vector3D from '../Vector3D';

class Scaling3D {
  private readonly _matrix: Matrix;

  constructor(tuple: Tuple3D) {
    this._matrix = Matrix.fromArray([
      [tuple.at(0), 0, 0, 0],
      [0, tuple.at(1), 0, 0],
      [0, 0, tuple.at(2), 0],
      [0, 0, 0, 1],
    ]);
    Object.freeze(this);
    Object.freeze(this._matrix);
  }

  public get matrix(): Matrix {
    return this._matrix;
  }

  public static scaling(x: number, y: number, z: number): Scaling3D {
    return new Scaling3D(Tuple3D.fromArray([x, y, z]));
  }

  public static fromMatrix(matrix: Matrix): Scaling3D {
    return new Scaling3D(
      Tuple3D.fromArray([matrix.at(0, 0), matrix.at(1, 1), matrix.at(2, 2)]),
    );
  }

  public getInverse(): Scaling3D {
    return Scaling3D.fromMatrix(this.matrix.getInverse());
  }

  public scalePoint(point: Point): Point {
    return Point.fromArray(
      this._matrix
        .multiplyTuple(Tuple.fromArray([...point.toArray(), 1]))
        .toArray(),
    );
  }

  public scaleVector(vector: Vector3D): Vector3D {
    return Vector3D.fromArray(
      this._matrix
        .multiplyVector(Vector.fromArray([...vector.toArray(), 0]))
        .toArray() as [number, number, number],
    );
  }
}

export default Scaling3D;
