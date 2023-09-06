import Point from '../src/Point';
import Vector3D from '../src/Vector3D';

describe('Point tests', () => {
  describe('creation', () => {
    it('should create a point', () => {
      const point = new Point(1, 2, 3);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
      expect(point.z).toBe(3);
    });

    it('should create a point from an array', () => {
      const point = Point.fromArray([1, 2, 3]);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
      expect(point.z).toBe(3);
    });

    it('should create a point from another point', () => {
      const inputPoint = new Point(1, 2, 3);
      const outputPoint = Point.fromPoint(inputPoint);
      expect(outputPoint.x).toBe(1);
      expect(outputPoint.y).toBe(2);
      expect(outputPoint.z).toBe(3);
    });

    it('should create a point from an object', () => {
      const point = Point.fromObject({x: 1, y: 2, z: 3});
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
      expect(point.z).toBe(3);
    });

    it('should create a point with the same values by cloning', () => {
      const point = new Point(1, 2, 3);
      const clone = point.clone();
      expect(clone.x).toBe(1);
      expect(clone.y).toBe(2);
      expect(clone.z).toBe(3);
    });

    it('should create the origin point', () => {
      const origin = Point.origin();
      expect(origin.x).toBe(0);
      expect(origin.y).toBe(0);
      expect(origin.z).toBe(0);
    });
  });

  describe('equality', () => {
    it('should be equal to another point with the same coordinates', () => {
      const point1 = new Point(1, 2, 3);
      const point2 = new Point(1, 2, 3);
      expect(point1.equals(point2)).toBe(true);
    });

    it('should not be equal to another point with different coordinates', () => {
      const point1 = new Point(1, 2, 3);
      const point2 = new Point(1, 2, 4);
      expect(point1.equals(point2)).toBe(false);
    });

    it('should be equal to a cloned point', () => {
      const point = new Point(1, 2, 3);
      const clone = point.clone();
      expect(point.equals(clone)).toBe(true);
    });
  });

  describe('addition of a vector', () => {
    it('should add a vector to a point', () => {
      const point = new Point(1, 2, 3);
      const vector = new Vector3D(1, 2, 3);
      const result = point.addVector(vector);
      expect(result.x).toBe(2);
      expect(result.y).toBe(4);
      expect(result.z).toBe(6);
    });
  });

  describe('subtraction of a vector', () => {
    it('should subtract a vector from a point', () => {
      const point = new Point(1, 2, 3);
      const vector = new Vector3D(1, 2, 3);
      const result = point.subtractVector(vector);
      expect(result.x).toBe(0);
      expect(result.y).toBe(0);
      expect(result.z).toBe(0);
    });
  });
});
