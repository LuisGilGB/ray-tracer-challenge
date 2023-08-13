import Matrix from '../../src/Matrix';
import Point from '../../src/Point';
import Translation from '../../src/transform/Translation';
import Tuple from '../../src/Tuple';
import Vector from '../../src/Vector';

describe('Translation tests', () => {
  it('should return a Matrix with the correct values', () => {
    const expected = Matrix.fromArray([
      [1, 0, 0, 1],
      [0, 1, 0, 2],
      [0, 0, 1, 3],
      [0, 0, 0, 1],
    ]);
    expect(new Translation(Tuple.fromArray([1, 2, 3])).matrix).toEqual(
      expected,
    );
  });

  it('should translate the point to wherever its expected by multiplying the translation matrix', () => {
    const point = Point.fromNumbers(-3, 4, 5);
    const translation = Translation.translation(5, -3, 2);
    expect(translation.translatePoint(point)).toEqual(
      Point.fromNumbers(2, 1, 7),
    );
  });

  it('should validate that multiplying the inverse of a translation matrix by a point translates the point to the opposite way', () => {
    const point = Point.fromNumbers(-3, 4, 5);
    const translation = Translation.translation(5, -3, 2);
    const inverse = translation.matrix.getInverse();
    expect(
      inverse.multiplyTuple(Tuple.fromArray([...point.toArray(), 1])),
    ).toEqual(
      Tuple.fromArray([...Point.fromNumbers(-8, 7, 3).toTuple().toArray(), 1]),
    );
  });

  it('should not affect vectors', () => {
    const vector = new Vector(-3, 4, 5);
    const translation = Translation.translation(5, -3, 2);
    expect(translation.translateVector(vector)).toEqual(vector);
  });
});
