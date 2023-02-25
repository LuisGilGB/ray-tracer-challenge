import Tuple from "../src/Tuple";

describe('Tuple tests', () => {
  describe('creation', () => {
    it('should create a tuple', () => {
      const tuple = new Tuple(1, 2, 3);
      expect(tuple.x).toBe(1);
      expect(tuple.y).toBe(2);
      expect(tuple.z).toBe(3);
    });

    it('should create a tuple from an array', () => {
      const tuple = Tuple.fromArray([1, 2, 3]);
      expect(tuple.x).toBe(1);
      expect(tuple.y).toBe(2);
      expect(tuple.z).toBe(3);
    });

    it('should create a tuple from another tuple', () => {
      const inputTuple = new Tuple(1, 2, 3);
      const outputTuple = Tuple.fromTuple(inputTuple);
      expect(outputTuple.x).toBe(1);
      expect(outputTuple.y).toBe(2);
      expect(outputTuple.z).toBe(3);
    });

    it('should create a tuple from an object', () => {
      const tuple = Tuple.fromObject({x: 1, y: 2, z: 3});
      expect(tuple.x).toBe(1);
      expect(tuple.y).toBe(2);
      expect(tuple.z).toBe(3);
    });

    it('should create a tuple with the same values by cloning', () => {
      const tuple = new Tuple(1, 2, 3);
      const clone = tuple.clone();
      expect(clone.x).toBe(1);
      expect(clone.y).toBe(2);
      expect(clone.z).toBe(3);
    });
  });

  describe('equality', () => {
    it('should be equal to another tuple with the same coordinates', () => {
      const tuple1 = new Tuple(1, 2, 3);
      const tuple2 = new Tuple(1, 2, 3);
      expect(tuple1.equals(tuple2)).toBe(true);
    });

    it('should not be equal to another tuple with different coordinates', () => {
      const tuple1 = new Tuple(1, 2, 3);
      const tuple2 = new Tuple(1, 2, 4);
      expect(tuple1.equals(tuple2)).toBe(false);
    });

    it('should be equal to a cloned tuple', () => {
      const tuple = new Tuple(1, 2, 3);
      const clone = tuple.clone();
      expect(tuple.equals(clone)).toBe(true);
    });
  });

  describe('addition', () => {
    it('should add two tuples', () => {
      const tuple1 = new Tuple(1, 2, 3);
      const tuple2 = new Tuple(4, 5, 6);
      const sum = tuple1.add(tuple2);
      expect(sum.x).toBe(5);
      expect(sum.y).toBe(7);
      expect(sum.z).toBe(9);
    });
  });

  describe('subtraction', () => {
    it('should subtract two tuples', () => {
      const tuple1 = new Tuple(1, 2, 3);
      const tuple2 = new Tuple(4, 5, 6);
      const difference = tuple1.subtract(tuple2);
      expect(difference.x).toBe(-3);
      expect(difference.y).toBe(-3);
      expect(difference.z).toBe(-3);
    });
  });

  describe('negation', () => {
    it('should negate a tuple', () => {
      const tuple = new Tuple(1, 2, 3);
      const negated = tuple.negate();
      expect(negated.x).toBe(-1);
      expect(negated.y).toBe(-2);
      expect(negated.z).toBe(-3);
    });
  });

  describe('multiplication', () => {
    it('should multiply a tuple by a scalar', () => {
      const tuple = new Tuple(1, 2, 3);
      const product = tuple.multiply(2);
      expect(product.x).toBe(2);
      expect(product.y).toBe(4);
      expect(product.z).toBe(6);
    });
  });

  describe('division', () => {
    it('should divide a tuple by a scalar', () => {
      const tuple = new Tuple(1, 2, 3);
      const quotient = tuple.divide(2);
      expect(quotient.x).toBe(0.5);
      expect(quotient.y).toBe(1);
      expect(quotient.z).toBe(1.5);
    });
  });
});
