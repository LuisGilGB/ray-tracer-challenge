import Point from "./Point";
import Vector from "./Vector";

describe("Point tests", () => {
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
  });
});

describe('Vector tests', () => {
  it('should create a vector', () => {
    const vector = new Vector(1, 2, 3);
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
  });

  it('should create a vector from an array', () => {
    const vector = Vector.fromArray([1, 2, 3]);
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
  });

  it('should create a vector from another vector', () => {
    const inputVector = new Vector(1, 2, 3);
    const outputVector = Vector.fromVector(inputVector);
    expect(outputVector.x).toBe(1);
    expect(outputVector.y).toBe(2);
    expect(outputVector.z).toBe(3);
  });

  describe('equality', () => {
    it('should be equal to another vector with the same coordinates', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(1, 2, 3);
      expect(vector1.equals(vector2)).toBe(true);
    });

    it('should not be equal to another vector with different coordinates', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(1, 2, 4);
      expect(vector1.equals(vector2)).toBe(false);
    });
  });
});
