import Vector from "../src/Vector";

describe('Vector tests', () => {
  describe('creation', () => {
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

    it('should create a vector from an object', () => {
      const vector = Vector.fromObject({x: 1, y: 2, z: 3});
      expect(vector.x).toBe(1);
      expect(vector.y).toBe(2);
      expect(vector.z).toBe(3);
    });

    it('should create a vector with the same values by cloning', () => {
      const vector = new Vector(1, 2, 3);
      const clone = vector.clone();
      expect(clone.x).toBe(1);
      expect(clone.y).toBe(2);
      expect(clone.z).toBe(3);
    });
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

    it('should be equal to a cloned vector', () => {
      const vector = new Vector(1, 2, 3);
      const clone = vector.clone();
      expect(vector.equals(clone)).toBe(true);
    });
  });
});
