import Matrix from '../Matrix';
import Point from '../Point';
import Tuple from '../Tuple';
import Vector from '../Vector';
import Vector3D from '../Vector3D';

export interface ITransform3D {
  matrix: Matrix;

  transformPoint(point: Point): Point;

  transformVector(vector: Vector3D): Vector3D;
}

class Transform3D implements ITransform3D {
  private readonly _matrix: Matrix;

  protected constructor(matrix?: Matrix) {
    this._matrix = matrix || Matrix.identity(4);
    Object.freeze(this);
  }

  get matrix(): Matrix {
    return this._matrix;
  }

  public static fromMatrix(matrix: Matrix): Transform3D {
    return new Transform3D(matrix);
  }

  public transformPoint(point: Point): Point {
    return Point.fromArray(
      this.matrix
        .multiplyTuple(Tuple.fromArray([...point.toArray(), 1]))
        .toArray()
        .slice(3),
    );
  }

  public transformVector(vector: Vector3D): Vector3D {
    const multipliedVector = this.matrix.multiplyVector(
      Vector.fromArray([...vector.toArray(), 0]),
    );
    return new Vector3D(
      multipliedVector.at(0),
      multipliedVector.at(1),
      multipliedVector.at(2),
    );
  }
}

export default Transform3D;
