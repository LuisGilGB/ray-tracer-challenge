import Point from '../../src/Point';
import Rotation3D from '../../src/transform/Rotation3D';
import Vector3D from '../../src/Vector3D';

describe('Rotation for 3D tests', () => {
  describe('Rotation around the X axis', () => {
    it.each([
      [Math.PI / 4, [0, 1, 0], [0, Math.sqrt(2) / 2, Math.sqrt(2) / 2]],
      [Math.PI / 2, [0, 1, 0], [0, 0, 1]],
    ])(
      'should rotate a point around the x axis',
      (angle, pointCoordinates, expectedCoordinates) => {
        const point = Point.fromArray(pointCoordinates);
        const rotation = Rotation3D.rotationX(angle);
        const expected = Point.fromArray(expectedCoordinates);

        rotation
          .rotatePoint(point)
          .toArray()
          .forEach((value, index) => {
            expect(value).toBeCloseTo(expected.toArray()[index]);
          });
      },
    );

    it('should rotate a vector', () => {
      const vector = new Vector3D(0, 1, 0);
      Rotation3D.rotationX(Math.PI / 4);
      const fullQuarter = Rotation3D.rotationX(Math.PI / 2);
      const expectedFullQuarter = new Vector3D(0, 0, 1);
      fullQuarter
        .rotateVector(vector)
        .toArray()
        .forEach((value, index) => {
          expect(value).toBeCloseTo(expectedFullQuarter.toArray()[index]);
        });
    });

    it('should rotate in the opposite direction with the inverse of the rotation matrix', () => {
      const point = Point.fromNumbers(0, 1, 0);
      const halfQuarter = Rotation3D.rotationX(Math.PI / 4);
      const inverse = halfQuarter.getInverse();
      const expected = Point.fromNumbers(
        0,
        Math.sqrt(2) / 2,
        -Math.sqrt(2) / 2,
      );
      inverse
        .rotatePoint(point)
        .toArray()
        .forEach((value, index) => {
          expect(value).toBeCloseTo(expected.toArray()[index]);
        });
    });
  });

  describe('Rotation around the Y axis', () => {
    it.each([
      [Math.PI / 4, [0, 0, 1], [Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2]],
      [Math.PI / 2, [0, 0, 1], [1, 0, 0]],
    ])(
      'should rotate a point around the y axis',
      (angle, pointCoordinates, expectedCoordinates) => {
        const point = Point.fromArray(pointCoordinates);
        const rotation = Rotation3D.rotationY(angle);
        const expected = Point.fromArray(expectedCoordinates);

        rotation
          .rotatePoint(point)
          .toArray()
          .forEach((value, index) => {
            expect(value).toBeCloseTo(expected.toArray()[index]);
          });
      },
    );

    it('should rotate a vector', () => {
      const vector = new Vector3D(0, 0, 1);
      Rotation3D.rotationY(Math.PI / 4);
      const fullQuarter = Rotation3D.rotationY(Math.PI / 2);
      const expectedFullQuarter = new Vector3D(1, 0, 0);
      fullQuarter
        .rotateVector(vector)
        .toArray()
        .forEach((value, index) => {
          expect(value).toBeCloseTo(expectedFullQuarter.toArray()[index]);
        });
    });

    it('should rotate in the opposite direction with the inverse of the rotation matrix', () => {
      const point = Point.fromNumbers(0, 0, 1);
      const halfQuarter = Rotation3D.rotationY(Math.PI / 4);
      const inverse = halfQuarter.getInverse();
      const expected = Point.fromNumbers(
        -Math.sqrt(2) / 2,
        0,
        Math.sqrt(2) / 2,
      );
      inverse
        .rotatePoint(point)
        .toArray()
        .forEach((value, index) => {
          expect(value).toBeCloseTo(expected.toArray()[index]);
        });
    });
  });

  describe('Rotation around the Z axis', () => {
    it.each([
      [Math.PI / 4, [0, 1, 0], [-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0]],
      [Math.PI / 2, [0, 1, 0], [-1, 0, 0]],
    ])(
      'should rotate a point around the z axis',
      (angle, pointCoordinates, expectedCoordinates) => {
        const point = Point.fromArray(pointCoordinates);
        const rotation = Rotation3D.rotationZ(angle);
        const expected = Point.fromArray(expectedCoordinates);

        rotation
          .rotatePoint(point)
          .toArray()
          .forEach((value, index) => {
            expect(value).toBeCloseTo(expected.toArray()[index]);
          });
      },
    );

    it('should rotate a vector', () => {
      const vector = new Vector3D(0, 1, 0);
      Rotation3D.rotationZ(Math.PI / 4);
      const fullQuarter = Rotation3D.rotationZ(Math.PI / 2);
      const expectedFullQuarter = new Vector3D(-1, 0, 0);
      fullQuarter
        .rotateVector(vector)
        .toArray()
        .forEach((value, index) => {
          expect(value).toBeCloseTo(expectedFullQuarter.toArray()[index]);
        });
    });

    it('should rotate in the opposite direction with the inverse of the rotation matrix', () => {
      const point = Point.fromNumbers(0, 1, 0);
      const halfQuarter = Rotation3D.rotationZ(Math.PI / 4);
      const inverse = halfQuarter.getInverse();
      const expected = Point.fromNumbers(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
      inverse
        .rotatePoint(point)
        .toArray()
        .forEach((value, index) => {
          expect(value).toBeCloseTo(expected.toArray()[index]);
        });
    });
  });
});
