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

  describe('conversions', () => {
    it('should get as tuple', () => {
      const vector = new Vector(1, 2, 3);
      const tuple = vector.asTuple();
      expect(tuple.x).toBe(1);
      expect(tuple.y).toBe(2);
      expect(tuple.z).toBe(3);
    });
  })

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

  describe('addition', () => {
    it('should add two vectors', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(4, 5, 6);
      const sum = vector1.add(vector2);
      expect(sum.x).toBe(5);
      expect(sum.y).toBe(7);
      expect(sum.z).toBe(9);
    });
  });

  describe('subtraction', () => {
    it('should subtract two vectors', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(4, 5, 6);
      const difference = vector1.subtract(vector2);
      expect(difference.x).toBe(-3);
      expect(difference.y).toBe(-3);
      expect(difference.z).toBe(-3);
    });
  });

  describe('negation', () => {
    it('should negate a vector', () => {
      const vector = new Vector(1, 2, 3);
      const negated = vector.negate();
      expect(negated.x).toBe(-1);
      expect(negated.y).toBe(-2);
      expect(negated.z).toBe(-3);
    });
  });

  describe('multiplication', () => {
    it('should multiply a vector by a scalar', () => {
      const vector = new Vector(1, 2, 3);
      const product = vector.multiply(2);
      expect(product.x).toBe(2);
      expect(product.y).toBe(4);
      expect(product.z).toBe(6);
    });
  });

  describe('division', () => {
    it('should divide a vector by a scalar', () => {
      const vector = new Vector(1, 2, 3);
      const quotient = vector.divide(2);
      expect(quotient.x).toBe(0.5);
      expect(quotient.y).toBe(1);
      expect(quotient.z).toBe(1.5);
    });
  });

  describe('magnitude', () => {
    it('should calculate the magnitude of a vector', () => {
      const vector = new Vector(1, 2, 3);
      expect(vector.magnitude()).toBe(Math.sqrt(14));
    });

    it('should return 1 as the magnitude of (1, 0, 0)', () => {
      const vector = new Vector(1, 0, 0);
      expect(vector.magnitude()).toBe(1);
    });

    it('should return 1 as the magnitude of (0, 1, 0)', () => {
      const vector = new Vector(0, 1, 0);
      expect(vector.magnitude()).toBe(1);
    });

    it('should return 1 as the magnitude of (0, 0, 1)', () => {
      const vector = new Vector(0, 0, 1);
      expect(vector.magnitude()).toBe(1);
    });
  });

  describe('normalization', () => {
    it('should normalize a vector', () => {
      const vector = new Vector(1, 2, 3);
      const normalized = vector.normalize();
      expect(normalized.x).toBe(1 / Math.sqrt(14));
      expect(normalized.y).toBe(2 / Math.sqrt(14));
      expect(normalized.z).toBe(3 / Math.sqrt(14));
    });

    it('should normalize a vector with a magnitude of 1', () => {
      const vector = new Vector(1, 0, 0);
      const normalized = vector.normalize();
      expect(normalized.x).toBe(1);
      expect(normalized.y).toBe(0);
      expect(normalized.z).toBe(0);
    });

    it('should return 1 as the magnitude of a normalized vector', () => {
      const vector = new Vector(1, 2, 3);
      const normalized = vector.normalize();
      expect(normalized.magnitude()).toBe(1);
    });
  });

  describe('dot product', () => {
    it('should calculate the dot product of two vectors', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(2, 3, 4);
      expect(vector1.dot(vector2)).toBe(20);
    });
  });

  describe('cross product', () => {
    it('should calculate the cross product of two vectors', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(2, 3, 4);
      const cross = vector1.cross(vector2);
      expect(cross.x).toBe(-1);
      expect(cross.y).toBe(2);
      expect(cross.z).toBe(-1);
    });

    it('should calculate the cross product of two vectors in the opposite direction', () => {
      const vector1 = new Vector(1, 2, 3);
      const vector2 = new Vector(2, 3, 4);
      const cross = vector2.cross(vector1);
      expect(cross.x).toBe(1);
      expect(cross.y).toBe(-2);
      expect(cross.z).toBe(1);
    });
  });
});
