import Tuple3D from '../src/Tuple3D';

describe('Tuple tests', () => {
  describe('creation', () => {
    it('should create a tuple', () => {
      const tuple = new Tuple3D(1, 2, 3);
      expect(tuple.at(0)).toBe(1);
      expect(tuple.at(1)).toBe(2);
      expect(tuple.at(2)).toBe(3);
    });

    it('should create a tuple from an array', () => {
      const tuple = Tuple3D.fromArray([1, 2, 3]);
      expect(tuple.at(0)).toBe(1);
      expect(tuple.at(1)).toBe(2);
      expect(tuple.at(2)).toBe(3);
    });

    it('should create a tuple from another tuple', () => {
      const inputTuple = new Tuple3D(1, 2, 3);
      const outputTuple = Tuple3D.fromTuple(inputTuple);
      expect(outputTuple.at(0)).toBe(1);
      expect(outputTuple.at(1)).toBe(2);
      expect(outputTuple.at(2)).toBe(3);
    });

    it('should create a tuple with the same values by cloning', () => {
      const tuple = new Tuple3D(1, 2, 3);
      const clone = tuple.clone();
      expect(clone.at(0)).toBe(1);
      expect(clone.at(1)).toBe(2);
      expect(clone.at(2)).toBe(3);
    });
  });

  describe('equality', () => {
    it('should be equal to another tuple with the same coordinates', () => {
      const tuple1 = new Tuple3D(1, 2, 3);
      const tuple2 = new Tuple3D(1, 2, 3);
      expect(tuple1.equals(tuple2)).toBe(true);
    });

    it('should not be equal to another tuple with different coordinates', () => {
      const tuple1 = new Tuple3D(1, 2, 3);
      const tuple2 = new Tuple3D(1, 2, 4);
      expect(tuple1.equals(tuple2)).toBe(false);
    });

    it('should be equal to a cloned tuple', () => {
      const tuple = new Tuple3D(1, 2, 3);
      const clone = tuple.clone();
      expect(tuple.equals(clone)).toBe(true);
    });
  });

  describe('addition', () => {
    it('should add two tuples', () => {
      const tuple1 = new Tuple3D(1, 2, 3);
      const tuple2 = new Tuple3D(4, 5, 6);
      const sum = tuple1.add(tuple2);
      expect(sum.at(0)).toBe(5);
      expect(sum.at(1)).toBe(7);
      expect(sum.at(2)).toBe(9);
    });
  });

  describe('subtraction', () => {
    it('should subtract two tuples', () => {
      const tuple1 = new Tuple3D(1, 2, 3);
      const tuple2 = new Tuple3D(4, 5, 6);
      const difference = tuple1.subtract(tuple2);
      expect(difference.at(0)).toBe(-3);
      expect(difference.at(1)).toBe(-3);
      expect(difference.at(2)).toBe(-3);
    });
  });

  describe('negation', () => {
    it('should negate a tuple', () => {
      const tuple = new Tuple3D(1, 2, 3);
      const negated = tuple.negate();
      expect(negated.at(0)).toBe(-1);
      expect(negated.at(1)).toBe(-2);
      expect(negated.at(2)).toBe(-3);
    });
  });

  describe('multiplication', () => {
    it('should multiply a tuple by a scalar', () => {
      const tuple = new Tuple3D(1, 2, 3);
      const product = tuple.multiply(2);
      expect(product.at(0)).toBe(2);
      expect(product.at(1)).toBe(4);
      expect(product.at(2)).toBe(6);
    });
  });

  describe('division', () => {
    it('should divide a tuple by a scalar', () => {
      const tuple = new Tuple3D(1, 2, 3);
      const quotient = tuple.divide(2);
      expect(quotient.at(0)).toBe(0.5);
      expect(quotient.at(1)).toBe(1);
      expect(quotient.at(2)).toBe(1.5);
    });
  });
});
