import Point from '../../src/Point';
import Rotation3D from '../../src/transform/Rotation3D';
import Scaling3D from '../../src/transform/Scaling3D';
import Transform3DPipeline from '../../src/transform/Transform3DPipeline';
import Translation3D from '../../src/transform/Translation3D';
import Vector3D from '../../src/Vector3D';

describe('3D transformations pipeline tests', () => {
  it('should apply transformations in sequence to a point', () => {
    const point = new Point(1, 0, 1);
    const pipeline = Transform3DPipeline.init()
      .andThen(Rotation3D.rotationX(Math.PI / 2))
      .andThen(Scaling3D.scaling(5, 5, 5))
      .andThen(Translation3D.translation(10, 5, 7));
    expect(pipeline.transformPoint(point)).toEqual(new Point(15, 0, 7));
  });

  it('should apply transformations in sequence to a vector', () => {
    const vector = new Vector3D(1, 0, 1);
    const pipeline = Transform3DPipeline.init()
      .andThen(Rotation3D.rotationX(Math.PI / 2))
      .andThen(Scaling3D.scaling(5, 5, 5))
      .andThen(Translation3D.translation(10, 5, 7));
    const expected = new Vector3D(5, -5, 0);
    pipeline
      .transformVector(vector)
      .toArray()
      .forEach((value, i) => {
        expect(value).toBeCloseTo(expected.toArray()[i]);
      });
  });

  it('should apply the transformation successfully by using the pipe method too', () => {
    const point = new Point(1, 0, 1);
    const pipeline = Transform3DPipeline.init().pipe(
      Rotation3D.rotationX(Math.PI / 2),
      Scaling3D.scaling(5, 5, 5),
      Translation3D.translation(10, 5, 7),
    );
    expect(pipeline.transformPoint(point)).toEqual(new Point(15, 0, 7));
  });
});
