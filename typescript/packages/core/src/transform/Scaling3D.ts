import Matrix from '../Matrix';
import Point from '../Point';
import Tuple3D from '../Tuple3D';
import Vector3D from '../Vector3D';
import Transform3D from './Transform3D';

class Scaling3D extends Transform3D {
  constructor(tuple: Tuple3D) {
    const matrix = Matrix.fromArray([
      [tuple.at(0), 0, 0, 0],
      [0, tuple.at(1), 0, 0],
      [0, 0, tuple.at(2), 0],
      [0, 0, 0, 1],
    ]);
    Object.freeze(matrix);
    super(matrix);
    Object.freeze(this);
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
    return this.transformPoint(point);
  }

  public scaleVector(vector: Vector3D): Vector3D {
    return this.transformVector(vector);
  }
}

export default Scaling3D;
