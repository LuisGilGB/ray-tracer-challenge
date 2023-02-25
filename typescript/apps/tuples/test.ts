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
});
