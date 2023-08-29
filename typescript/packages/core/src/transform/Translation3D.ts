import Matrix from '../Matrix';
import Point from '../Point';
import Tuple3D from '../Tuple3D';
import Vector3D from '../Vector3D';
import Transform3D from './Transform3D';

class Translation3D extends Transform3D {
  constructor(tuple: Tuple3D) {
    const matrix = Matrix.fromArray([
      [1, 0, 0, tuple.at(0)],
      [0, 1, 0, tuple.at(1)],
      [0, 0, 1, tuple.at(2)],
      [0, 0, 0, 1],
    ]);
    Object.freeze(matrix);
    super(matrix);
    Object.freeze(this);
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
    return this.transformPoint(point);
  }

  public translateVector(vector: Vector3D): Vector3D {
    return this.transformVector(vector);
  }

  public transformVector(vector: Vector3D): Vector3D {
    return vector;
  }
}

export default Translation3D;
