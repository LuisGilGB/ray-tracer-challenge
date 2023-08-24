import Point from '../Point';
import Vector3D from '../Vector3D';

class Vector3DFactory {
  static create(x: number, y: number, z: number): Vector3D {
    return new Vector3D(x, y, z);
  }

  static fromPoints(origin: Point, target: Point): Vector3D {
    const targetTuple = target.toTuple();
    const originTuple = origin.toTuple();
    return Vector3D.fromTuple(targetTuple.subtract(originTuple));
  }
}

export default Vector3DFactory;
