import Vector3DFactory from '../../src/factories/Vector3D.factory';
import Point from '../../src/Point';
import Vector3D from '../../src/Vector3D';

describe('Vector3D Factory tests', () => {
  it('Can create a vector from two points correctly', () => {
    // Arrange
    const origin = new Point(1, 2, 3);
    const target = new Point(17, 25, 12);
    const expected = new Vector3D(16, 23, 9);
    // Act
    const result = Vector3DFactory.fromPoints(origin, target);
    // Assert
    expect(result).toEqual(expected);
  });
});
