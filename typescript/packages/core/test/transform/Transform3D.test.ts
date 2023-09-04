import Matrix from '../../src/Matrix';
import Point from '../../src/Point';
import Transform3D from '../../src/transform/Transform3D';
import Vector3D from '../../src/Vector3D';

describe('Transform 3D tests', () => {
  it('should create from a 4x4 matrix', () => {
    const matrix = Matrix.identity(4);
    const transform = Transform3D.fromMatrix(matrix);
    expect(transform.matrix).toEqual(matrix);
  });

  it('should create an identity transform', () => {
    const transform = Transform3D.identity();
    expect(transform.matrix).toEqual(Matrix.identity(4));
  });

  it('should transform a point', () => {
    const matrix = Matrix.fromArray([
      [1, 0, 0, 1],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
    const transform = Transform3D.fromMatrix(matrix);
    const point = new Point(1, 2, 3);
    const transformedPoint = transform.transformPoint(point);
    expect(transformedPoint).toEqual(new Point(2, 2, 3));
  });

  it('should return the same point when applying the identity transform', () => {
    const transform = Transform3D.identity();
    const point = new Point(1, 2, 3);
    const transformedPoint = transform.transformPoint(point);
    expect(transformedPoint).toEqual(point);
  });

  it('should transform a vector', () => {
    const matrix = Matrix.fromArray([
      [1, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ]);
    const transform = Transform3D.fromMatrix(matrix);
    const vector = new Vector3D(1, 2, 3);
    const transformedVector = transform.transformVector(vector);
    expect(transformedVector).toEqual(new Point(1, 4, 3));
  });

  it('should get the inverse transform by inverting the matrix', () => {
    const matrix = Matrix.fromArray([
      [4, 0, 0, 1],
      [0, 1, 0, 2],
      [0, 0, 2, 3],
      [0, 0, 0, 1],
    ]);
    const transform = Transform3D.fromMatrix(matrix);
    const inverseTransform = transform.getInverse();
    expect(inverseTransform.matrix).toEqual(matrix.getInverse());
  });

  it('should give the expected result from applying the inverse transform', () => {
    const matrix = Matrix.fromArray([
      [4, 0, 0, 1],
      [0, 1, 0, 2],
      [0, 0, 2, 3],
      [0, 0, 0, 1],
    ]);
    const transform = Transform3D.fromMatrix(matrix);
    const point = new Point(1, 2, 3);
    const inverselyTransformedPoint = transform
      .getInverse()
      .transformPoint(point);
    const expectedPoint = new Point(0, 0, 0);
    expect(inverselyTransformedPoint).toEqual(expectedPoint);
  });

  it('should return the same point when applying the transform and then the inverse of it', () => {
    const matrix = Matrix.fromArray([
      [4, 0, 0, 1],
      [0, 1, 0, 2],
      [0, 0, 2, 3],
      [0, 0, 0, 1],
    ]);
    const transform = Transform3D.fromMatrix(matrix);
    const point = new Point(1, 2, 3);
    const transformedPoint = transform.transformPoint(point);
    const inverselyTransformedPoint = transform
      .getInverse()
      .transformPoint(transformedPoint);
    expect(inverselyTransformedPoint).toEqual(point);
  });
});
