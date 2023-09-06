import {
  Matrix,
  Point,
  Transform3D,
  Transform3DPipeline,
  Translation3D,
  Vector3D,
  Vector3DFactory,
} from 'core';

abstract class ViewTransform {
  public static build(from: Point, to: Point, up: Vector3D): Transform3D {
    const forwardVector = Vector3DFactory.fromPoints(from, to).normalize();
    const leftVector = forwardVector.cross(up.normalize());
    const trueUpVector = leftVector.cross(forwardVector);

    const orientationMatrix = Matrix.fromArray([
      [leftVector.x, leftVector.y, leftVector.z, 0],
      [trueUpVector.x, trueUpVector.y, trueUpVector.z, 0],
      [-forwardVector.x, -forwardVector.y, -forwardVector.z, 0],
      [0, 0, 0, 1],
    ]);
    const orientationTransform = Transform3D.fromMatrix(orientationMatrix);

    const translation = Translation3D.translation(-from.x, -from.y, -from.z);

    return Transform3DPipeline.init()
      .pipe(orientationTransform, translation)
      .value();
  }
}

export default ViewTransform;
