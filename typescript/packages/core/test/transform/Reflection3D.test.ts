import Matrix from '../../src/Matrix';
import Point from '../../src/Point';
import Reflection3D from '../../src/transform/Reflection3D';
import Vector3D from '../../src/Vector3D';

describe('Reflection on 3D tests', () => {
  describe('Reflection matrices', () => {
    it('should return a matrix that reflects on the x axis', () => {
      const reflection = Reflection3D.reflectionOnX();
      expect(reflection.matrix).toEqual(
        Matrix.fromArray([
          [-1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1],
        ]),
      );
    });

    it('should return a matrix that reflects on the y axis', () => {
      const reflection = Reflection3D.reflectionOnY();
      expect(reflection.matrix).toEqual(
        Matrix.fromArray([
          [1, 0, 0, 0],
          [0, -1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1],
        ]),
      );
    });

    it('should return a matrix that reflects on the z axis', () => {
      const reflection = Reflection3D.reflectionOnZ();
      expect(reflection.matrix).toEqual(
        Matrix.fromArray([
          [1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, -1, 0],
          [0, 0, 0, 1],
        ]),
      );
    });
  });

  describe('Reflection of points', () => {
    it('should reflect a point on the x axis', () => {
      const point = Point.fromNumbers(2, 3, 4);
      const reflection = Reflection3D.reflectionOnX();
      expect(reflection.reflectPoint(point)).toEqual(
        Point.fromNumbers(-2, 3, 4),
      );
    });

    it('should reflect a point on the y axis', () => {
      const point = Point.fromNumbers(2, 3, 4);
      const reflection = Reflection3D.reflectionOnY();
      expect(reflection.reflectPoint(point)).toEqual(
        Point.fromNumbers(2, -3, 4),
      );
    });

    it('should reflect a point on the z axis', () => {
      const point = Point.fromNumbers(2, 3, 4);
      const reflection = Reflection3D.reflectionOnZ();
      expect(reflection.reflectPoint(point)).toEqual(
        Point.fromNumbers(2, 3, -4),
      );
    });

    it('should reflect a point on the origin', () => {
      const point = Point.fromNumbers(2, 3, 4);
      const reflection = Reflection3D.reflectionOnOrigin();
      expect(reflection.reflectPoint(point)).toEqual(
        Point.fromNumbers(-2, -3, -4),
      );
    });
  });

  describe('Reflection of vectors', () => {
    it('should reflect a vector on the x axis', () => {
      const vector = new Vector3D(2, 3, 4);
      const reflection = Reflection3D.reflectionOnX();
      expect(reflection.reflectVector(vector)).toEqual(new Vector3D(-2, 3, 4));
    });

    it('should reflect a vector on the y axis', () => {
      const vector = new Vector3D(2, 3, 4);
      const reflection = Reflection3D.reflectionOnY();
      expect(reflection.reflectVector(vector)).toEqual(new Vector3D(2, -3, 4));
    });

    it('should reflect a vector on the z axis', () => {
      const vector = new Vector3D(2, 3, 4);
      const reflection = Reflection3D.reflectionOnZ();
      expect(reflection.reflectVector(vector)).toEqual(new Vector3D(2, 3, -4));
    });
  });
});
