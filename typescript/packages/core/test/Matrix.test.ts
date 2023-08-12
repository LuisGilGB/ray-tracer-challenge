import Matrix from '../src/Matrix';
import Tuple from '../src/Tuple';
import Vector from '../src/Vector';

describe('Matrix tests', () => {
  describe('Matrix creation', () => {
    it('should create an empty matrix', () => {
      const matrix = Matrix.createEmpty(0, 0);
      expect(matrix.toArray()).toEqual([[]]);
    });

    it('should create a 3x3 matrix from a string', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.toArray()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    it('should create a 2x2 matrix from a string', () => {
      const matrix = Matrix.fromString('1 2\n3 4');
      expect(matrix.toArray()).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it('should create a 4x4 matrix from a string', () => {
      const matrix = Matrix.fromString('1 2 3 4\n5 6 7 8\n9 8 7 6\n5 4 3 2');
      expect(matrix.toArray()).toEqual([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2],
      ]);
    });

    it('should place the elements in the right place', () => {
      const matrix = Matrix.fromString('1 2 3 4\n5 6 7 8\n9 8 7 6\n5 4 3 2');
      expect(matrix.at(0, 0)).toBe(1);
      expect(matrix.at(0, 3)).toBe(4);
      expect(matrix.at(1, 0)).toBe(5);
      expect(matrix.at(3, 3)).toBe(2);
    });

    it('should create an identity matrix', () => {
      const matrix = Matrix.identity(4);
      expect(matrix.toArray()).toEqual([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ]);
    });
  });

  describe('Matrix rows and columns', () => {
    it('should return the number of rows of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.rows).toEqual(3);
    });

    it('should return the rows arrays of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getRowArrays()).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });

    it('should return the rows of a matrix by row index', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getRowArray(0)).toEqual([1, 2, 3]);
      expect(matrix.getRowArray(1)).toEqual([4, 5, 6]);
      expect(matrix.getRowArray(2)).toEqual([7, 8, 9]);
    });

    it('should return the matching row tuple of the row array', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getRow(0)).toEqual(Tuple.fromArray([1, 2, 3]));
      expect(matrix.getRow(1)).toEqual(Tuple.fromArray([4, 5, 6]));
      expect(matrix.getRow(2)).toEqual(Tuple.fromArray([7, 8, 9]));
    });

    it('should return the matching row vector of the row array', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getRowVector(0)).toEqual(Vector.fromArray([1, 2, 3]));
      expect(matrix.getRowVector(1)).toEqual(Vector.fromArray([4, 5, 6]));
      expect(matrix.getRowVector(2)).toEqual(Vector.fromArray([7, 8, 9]));
    });

    it('should return the matching row vectors of the row arrays', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getRowVectors()).toEqual([
        Vector.fromArray([1, 2, 3]),
        Vector.fromArray([4, 5, 6]),
        Vector.fromArray([7, 8, 9]),
      ]);
    });

    it('should return the number of columns of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.columns).toEqual(3);
    });

    it('should return the columns of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getColumnArrays()).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    });

    it('should return the columns of a matrix by column index', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getColumnArray(0)).toEqual([1, 4, 7]);
      expect(matrix.getColumnArray(1)).toEqual([2, 5, 8]);
      expect(matrix.getColumnArray(2)).toEqual([3, 6, 9]);
    });

    it('should return the matching column tuple of the column array', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getColumn(0)).toEqual(Tuple.fromArray([1, 4, 7]));
      expect(matrix.getColumn(1)).toEqual(Tuple.fromArray([2, 5, 8]));
      expect(matrix.getColumn(2)).toEqual(Tuple.fromArray([3, 6, 9]));
    });

    it('should return the matching column vector of the column array', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getColumnVector(0)).toEqual(Vector.fromArray([1, 4, 7]));
      expect(matrix.getColumnVector(1)).toEqual(Vector.fromArray([2, 5, 8]));
      expect(matrix.getColumnVector(2)).toEqual(Vector.fromArray([3, 6, 9]));
    });

    it('should return the matching column vectors of the column arrays', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getColumnVectors()).toEqual([
        Vector.fromArray([1, 4, 7]),
        Vector.fromArray([2, 5, 8]),
        Vector.fromArray([3, 6, 9]),
      ]);
    });

    it('should return the diagonal of a matrix', () => {
      const matrix = Matrix.fromString('1 2 3\n4 5 6\n7 8 9');
      expect(matrix.getDiagonalArray()).toEqual([1, 5, 9]);
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

  describe('Matrix transposition', () => {
    it('should return the transpose matrix', () => {
      const matrix = Matrix.fromString('0 9 3 0\n9 8 0 8\n1 8 5 3\n0 0 5 8');
      const transpose = Matrix.fromString('0 9 1 0\n9 8 8 0\n3 0 5 5\n0 8 3 8');
      expect(matrix.getTranspose()).toEqual(transpose);
    });

    it('should return the transpose matrix of a 3x2 matrix', () => {
      const matrix = Matrix.fromString('1 2\n3 4\n5 6');
      const transpose = Matrix.fromString('1 3 5\n2 4 6');
      expect(matrix.getTranspose()).toEqual(transpose);
    });

    it('should return the identity matrix when getting the transpose of the identity matrix', () => {
      const identityMatrix = Matrix.identity(4);
      expect(identityMatrix.getTranspose()).toEqual(identityMatrix);
    });
  });

  describe('Matrix operations', () => {
    describe('Matrix multiplication', () => {
      it('should multiply two matrices', () => {
        const matrix1 = Matrix.fromString('1 2 3 4\n5 6 7 8\n9 8 7 6\n5 4 3 2');
        const matrix2 = Matrix.fromString(
          '-2 1 2 3\n3 2 1 -1\n4 3 6 5\n1 2 7 8',
        );
        const result = matrix1.multiply(matrix2);
        expect(result.toArray()).toEqual([
          [20, 22, 50, 48],
          [44, 54, 114, 108],
          [40, 58, 110, 102],
          [16, 26, 46, 42],
        ]);
      });

      it('should multiply by a tuple', () => {
        const matrix = Matrix.fromString('1 2 3 4\n2 4 4 2\n8 6 4 1\n0 0 0 1');
        const tuple = new Tuple(1, 2, 3, 1);
        const result = matrix.multiplyTuple(tuple);
        expect(result.toArray()).toEqual([18, 24, 33, 1]);
      });

      it('should multiply by a vector', () => {
        const matrix = Matrix.fromString('1 2 3 4\n2 4 4 2\n8 6 4 1\n0 0 0 1');
        const vector = new Vector(1, 2, 3, 1);
        const result = matrix.multiplyVector(vector);
        expect(result.toArray()).toEqual([18, 24, 33, 1]);
      });

      it('should return the original matrix when multiplied by the identity matrix', () => {
        const matrix = Matrix.fromString('1 2 3 4\n2 4 4 2\n8 6 4 1\n0 0 0 1');
        const identity = Matrix.identity(4);
        const result = matrix.multiply(identity);
        expect(result).toEqual(matrix);
      });
    });
  });
});
