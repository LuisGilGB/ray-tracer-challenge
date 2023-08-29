import Matrix from '../Matrix';
import Point from '../Point';
import Vector3D from '../Vector3D';
import Transform3D from './Transform3D';

class Shearing3D extends Transform3D {
  private constructor(matrix: Matrix) {
    super(matrix);
    Object.freeze(this);
  }

  public static fromComponents(
    xy: number,
    xz: number,
    yx: number,
    yz: number,
    zx: number,
    zy: number,
  ) {
    const matrix = Matrix.fromArray([
      [1, xy, xz, 0],
      [yx, 1, yz, 0],
      [zx, zy, 1, 0],
      [0, 0, 0, 1],
    ]);
    return new Shearing3D(matrix);
  }

  public static shearing(
    xy: number,
    xz: number,
    yx: number,
    yz: number,
    zx: number,
    zy: number,
  ): Shearing3D {
    return Shearing3D.fromComponents(xy, xz, yx, yz, zx, zy);
  }

  public static fromMatrix(matrix: Matrix): Shearing3D {
    return Shearing3D.fromComponents(
      matrix.at(0, 1),
      matrix.at(0, 2),
      matrix.at(1, 0),
      matrix.at(1, 2),
      matrix.at(2, 0),
      matrix.at(2, 1),
    );
  }

  public shearPoint(point: Point) {
    return this.transformPoint(point);
  }

  public shearVector(vector: Vector3D): Vector3D {
    return this.transformVector(vector);
  }
}

export default Shearing3D;
