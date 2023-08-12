import Matrix from "../src/Matrix"
import Tuple from "../src/Tuple";

describe('Matrix tests', () => {
  describe("Matrix creation", () => {
    it('should create an empty matrix', () => {
      const matrix = new Matrix();
      expect(matrix.matrix).toEqual([]);
    });

    it('should create a 3x3 matrix from a string', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.matrix).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    it('should create a 2x2 matrix from a string', () => {
      const matrix = Matrix.fromString('1 2\n3 4');
      expect(matrix.matrix).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('should create a 4x4 matrix from a string', () => {
      const matrix = Matrix.fromString('1 2 3 4\n5 6 7 8\n9 8 7 6\n5 4 3 2');
      expect(matrix.matrix).toEqual([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2],
      ]);
    });

    it('should place the elements in the right place', () => {
      const matrix = Matrix.fromString('1 2 3 4\n5 6 7 8\n9 8 7 6\n5 4 3 2');
      expect(matrix.getElementAt(0, 0)).toBe(1);
      expect(matrix.getElementAt(0, 3)).toBe(4);
      expect(matrix.getElementAt(1, 0)).toBe(5);
      expect(matrix.getElementAt(3, 3)).toBe(2);
    });
  });

  describe("Matrix rows and columns", () => {
    it('should return the rows of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.rows).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    it('should return the columns of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.columns).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    });

    it('should return the rows of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getRow(0)).toEqual([1, 2, 3]);
      expect(matrix.getRow(1)).toEqual([4, 5, 6]);
      expect(matrix.getRow(2)).toEqual([7, 8, 9]);
    });

    it('should return the columns of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getColumn(0)).toEqual([1, 4, 7]);
      expect(matrix.getColumn(1)).toEqual([2, 5, 8]);
      expect(matrix.getColumn(2)).toEqual([3, 6, 9]);
    });

    it('should return the diagonal of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getDiagonal()).toEqual([1, 5, 9]);
    });
  });

  describe('Matrix equality', () => {
    it('should return true when comparing two equal matrices', () => {
      const matrix1 = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      const matrix2 = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix1.equals(matrix2)).toBe(true);
    });

    it('should return false when comparing two different matrices', () => {
      const matrix1 = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      const matrix2 = Matrix.fromString('1 2 3\n4 5 6\n7 8 8');
      expect(matrix1.equals(matrix2)).toBe(false);
    });
  });

  describe('Matrix operations', () => {
    describe('Matrix multiplication', () => {
      it('should multiply two matrices', () => {
        const matrix1 = Matrix.fromString('1 2 3 4\n5 6 7 8\n9 8 7 6\n5 4 3 2');
        const matrix2 = Matrix.fromString('-2 1 2 3\n3 2 1 -1\n4 3 6 5\n1 2 7 8');
        const result = matrix1.multiply(matrix2);
        expect(result.matrix).toEqual([
          [20, 22, 50, 48],
          [44, 54, 114, 108],
          [40, 58, 110, 102],
          [16, 26, 46, 42],
        ]);
      });

      // TODO: Add support to 4D tuples
      it.skip('should multiply by a tuple', () => {
        const matrix = Matrix.fromString('1 2 3 4\n2 4 4 2\n8 6 4 1\n0 0 0 1');
        const tuple = new Tuple(1, 2, 3, 1);
        const result = matrix.multiplyTuple(tuple);
        expect(result).toEqual([18, 24, 33, 1]);
      });
    });
  });
});