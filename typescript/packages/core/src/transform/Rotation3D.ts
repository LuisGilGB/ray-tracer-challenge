import Matrix from '../Matrix';
import Point from '../Point';
import Tuple from '../Tuple';
import Vector from '../Vector';
import Vector3D from '../Vector3D';

class Rotation3D {
  private readonly _matrix: Matrix;

  private constructor(matrix: Matrix) {
    this._matrix = matrix;
    Object.freeze(this);
    Object.freeze(this._matrix);
  }

  public get matrix(): Matrix {
    return this._matrix;
  }

  static rotationX(angle: number): Rotation3D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Rotation3D(
      Matrix.fromArray([
        [1, 0, 0, 0],
        [0, cos, -sin, 0],
        [0, sin, cos, 0],
        [0, 0, 0, 1],
      ]),
    );
  }

  static rotationY(angle: number): Rotation3D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Rotation3D(
      Matrix.fromArray([
        [cos, 0, sin, 0],
        [0, 1, 0, 0],
        [-sin, 0, cos, 0],
        [0, 0, 0, 1],
      ]),
    );
  }

  static rotationZ(angle: number): Rotation3D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Rotation3D(
      Matrix.fromArray([
        [cos, -sin, 0, 0],
        [sin, cos, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ]),
    );
  }

  getInverse(): Rotation3D {
    return new Rotation3D(this.matrix.getInverse());
  }

  rotatePoint(point: Point): Point {
    return Point.fromArray(
      this._matrix
        .multiplyTuple(Tuple.fromArray([...point.toArray(), 1]))
        .toArray(),
    );
  }

  rotateVector(vector: Vector3D): Vector3D {
    return Vector3D.fromArray(
      this._matrix
        .multiplyVector(Vector.fromArray([...vector.toArray(), 0]))
        .toArray() as [number, number, number],
    );
  }
}

export default Rotation3D;
