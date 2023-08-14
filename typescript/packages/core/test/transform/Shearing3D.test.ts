import Point from '../../src/Point';
import Shearing3D from '../../src/transform/Shearing3D';
import Vector3D from '../../src/Vector3D';

describe('Shearing for 3D tests', () => {
  it('should move x in proportion to y', () => {
    const point = Point.fromNumbers(2, 3, 4);
    const shearing = Shearing3D.shearing(1, 0, 0, 0, 0, 0);
    expect(shearing.shearPoint(point)).toEqual(Point.fromNumbers(5, 3, 4));
  });

  it('should move x in proportion to z', () => {
    const point = Point.fromNumbers(2, 3, 4);
    const shearing = Shearing3D.shearing(0, 1, 0, 0, 0, 0);
    expect(shearing.shearPoint(point)).toEqual(Point.fromNumbers(6, 3, 4));
  });

  it('should move y in proportion to x', () => {
    const point = Point.fromNumbers(2, 3, 4);
    const shearing = Shearing3D.shearing(0, 0, 1, 0, 0, 0);
    expect(shearing.shearPoint(point)).toEqual(Point.fromNumbers(2, 5, 4));
  });

  it('should move y in proportion to z', () => {
    const point = Point.fromNumbers(2, 3, 4);
    const shearing = Shearing3D.shearing(0, 0, 0, 1, 0, 0);
    expect(shearing.shearPoint(point)).toEqual(Point.fromNumbers(2, 7, 4));
  });

  it('should move z in proportion to x', () => {
    const point = Point.fromNumbers(2, 3, 4);
    const shearing = Shearing3D.shearing(0, 0, 0, 0, 1, 0);
    expect(shearing.shearPoint(point)).toEqual(Point.fromNumbers(2, 3, 6));
  });

  it('should move z in proportion to y', () => {
    const point = Point.fromNumbers(2, 3, 4);
    const shearing = Shearing3D.shearing(0, 0, 0, 0, 0, 1);
    expect(shearing.shearPoint(point)).toEqual(Point.fromNumbers(2, 3, 7));
  });

  it('should shear a vector', () => {
    const vector = new Vector3D(2, 3, 4);
    const shearing = Shearing3D.shearing(1, 0, 0, 0, 0, 0);
    expect(shearing.shearVector(vector)).toEqual(Point.fromNumbers(5, 3, 4));
  });
});
