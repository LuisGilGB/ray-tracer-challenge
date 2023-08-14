import Matrix from '../Matrix';
import Point from '../Point';
import Tuple from '../Tuple';

class Shearing3D {
  private readonly _matrix: Matrix;

  constructor(
    xy: number,
    xz: number,
    yx: number,
    yz: number,
    zx: number,
    zy: number,
  ) {
    this._matrix = Matrix.fromArray([
      [1, xy, xz, 0],
      [yx, 1, yz, 0],
      [zx, zy, 1, 0],
      [0, 0, 0, 1],
    ]);
    Object.freeze(this);
    Object.freeze(this._matrix);
  }

  public get matrix(): Matrix {
    return this._matrix;
  }

  public static shearing(
    xy: number,
    xz: number,
    yx: number,
    yz: number,
    zx: number,
    zy: number,
  ): Shearing3D {
    return new Shearing3D(xy, xz, yx, yz, zx, zy);
  }

  public static fromMatrix(matrix: Matrix): Shearing3D {
    return new Shearing3D(
      matrix.at(0, 1),
      matrix.at(0, 2),
      matrix.at(1, 0),
      matrix.at(1, 2),
      matrix.at(2, 0),
      matrix.at(2, 1),
    );
  }

  shearPoint(point: Point) {
    return Point.fromArray(
      this._matrix
        .multiplyTuple(Tuple.fromArray([...point.toArray(), 1]))
        .toArray(),
    );
  }
}

export default Shearing3D;
