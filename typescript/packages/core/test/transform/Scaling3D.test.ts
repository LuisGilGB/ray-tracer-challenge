import Matrix from '../../src/Matrix';
import Point from '../../src/Point';
import Scaling3D from '../../src/transform/Scaling3D';
import Tuple from '../../src/Tuple';
import Tuple3D from '../../src/Tuple3D';
import Vector3D from '../../src/Vector3D';

describe('Scaling for 3D tests', () => {
  it('should return a Matrix with the correct values', () => {
    const expected = Matrix.fromArray([
      [4, 0, 0, 0],
      [0, 5, 0, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 1],
    ]);
    expect(new Scaling3D(Tuple3D.fromArray([4, 5, 6])).matrix).toEqual(
      expected,
    );
  });

  it('should scale the point to wherever its expected by multiplying the scaling matrix', () => {
    const point = Point.fromNumbers(-4, 6, 8);
    const scaling = Scaling3D.scaling(2, 3, 4);
    expect(scaling.scalePoint(point)).toEqual(Point.fromNumbers(-8, 18, 32));
  });

  it('should scale the vector to wherever its expected by multiplying the scaling matrix', () => {
    const vector = new Vector3D(-4, 6, 8);
    const scaling = Scaling3D.scaling(2, 3, 4);
    expect(scaling.scaleVector(vector)).toEqual(new Vector3D(-8, 18, 32));
  });

  it('should validate that multiplying the inverse of a scaling matrix by a point shrinks the point position in the inverse proportion', () => {
    const point = Point.fromNumbers(-4, 6, 8);
    const scaling = Scaling3D.scaling(2, 3, 4);
    const inverse = scaling.matrix.getInverse();
    expect(
      inverse.multiplyTuple(Tuple.fromArray([...point.toArray(), 1])),
    ).toEqual(
      Tuple.fromArray([...Point.fromNumbers(-2, 2, 2).toTuple().toArray(), 1]),
    );
  });

  it('should be able to get the inverse scaling', () => {
    const point = Point.fromNumbers(-4, 6, 8);
    const scaling = Scaling3D.scaling(2, 3, 4);
    const inverseScaling = scaling.getInverse();
    expect(inverseScaling.scalePoint(point)).toEqual(
      Point.fromNumbers(-2, 2, 2),
    );
  });

  it('should be able to get the inverse scaling and use it to shrink a vector', () => {
    const vector = new Vector3D(-4, 6, 8);
    const scaling = Scaling3D.scaling(2, 3, 4);
    const inverseScaling = scaling.getInverse();
    expect(inverseScaling.scaleVector(vector)).toEqual(new Vector3D(-2, 2, 2));
  });

  it('should be able to reflect using a negative scaling', () => {
    const point = Point.fromNumbers(2, 3, 4);
    const scaling = Scaling3D.scaling(-1, 1, 1);
    expect(scaling.scalePoint(point)).toEqual(Point.fromNumbers(-2, 3, 4));
  });
});
