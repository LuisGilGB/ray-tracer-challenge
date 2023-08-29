import Matrix from '../Matrix';
import Point from '../Point';
import Vector3D from '../Vector3D';
import Transform3D from './Transform3D';

class Rotation3D extends Transform3D {
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
    return this.transformPoint(point);
  }

  rotateVector(vector: Vector3D): Vector3D {
    return this.transformVector(vector);
  }
}

export default Rotation3D;
