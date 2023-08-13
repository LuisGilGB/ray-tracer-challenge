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

  describe('Matrix submatrices', () => {
    it('should successfully return the submatrix of a 3x3 matrix', () => {
      const matrix = Matrix.fromString('1 5 0\n-3 2 7\n0 6 -3');
      const submatrix = Matrix.fromString('-3 2\n0 6');
      expect(matrix.getSubmatrix(0, 2)).toEqual(submatrix);
    });

    it('should successfully return the submatrix of a 4x4 matrix', () => {
      const matrix = Matrix.fromString(
        '-6 1 1 6\n-8 5 8 6\n-1 0 8 2\n-7 1 -1 1',
      );
      const submatrix = Matrix.fromString('-6 1 6\n-8 8 6\n-7 -1 1');
      expect(matrix.getSubmatrix(2, 1)).toEqual(submatrix);
    });
  });

  describe('Determinant of a matrix', () => {
    it('should calculate the determinant of a 2x2 matrix', () => {
      const matrix = Matrix.fromString('1 5\n-3 2');
      expect(matrix.getDeterminant()).toBe(17);
    });

    it('should calculate the determinant of a 3x3 matrix', () => {
      const matrix = Matrix.fromString('1 2 6\n-5 8 -4\n2 6 4');
      expect(matrix.getCofactor(0, 0)).toBe(56);
      expect(matrix.getCofactor(0, 1)).toBe(12);
      expect(matrix.getCofactor(0, 2)).toBe(-46);
      expect(matrix.getDeterminant()).toBe(-196);
    });

    it('should calculate the determinant of a 4x4 matrix', () => {
      const matrix = Matrix.fromString(
        '-2 -8 3 5\n-3 1 7 3\n1 2 -9 6\n-6 7 7 -9',
      );
      expect(matrix.getCofactor(0, 0)).toBe(690);
      expect(matrix.getCofactor(0, 1)).toBe(447);
      expect(matrix.getCofactor(0, 2)).toBe(210);
      expect(matrix.getCofactor(0, 3)).toBe(51);
      expect(matrix.getDeterminant()).toBe(-4071);
    });
  });

  describe('Minors of a matrix', () => {
    it('should calculate the minor for a 3x3 matrix', () => {
      const matrix = Matrix.fromString('3 5 0\n2 -1 -7\n6 -1 5');
      const submatrix = matrix.getSubmatrix(1, 0);
      expect(submatrix.getDeterminant()).toBe(25);
      expect(matrix.getMinor(1, 0)).toBe(25);
    });
  });

  describe('Cofactors of a matrix', () => {
    it('should calculate the cofactor for a 3x3 matrix', () => {
      const matrix = Matrix.fromString('3 5 0\n2 -1 -7\n6 -1 5');
      expect(matrix.getMinor(0, 0)).toBe(-12);
      expect(matrix.getCofactor(0, 0)).toBe(-12);
      expect(matrix.getMinor(1, 0)).toBe(25);
      expect(matrix.getCofactor(1, 0)).toBe(-25);
    });

    it('should calculate the cofactors matrix for a 4x4 matrix', () => {
      const matrix = Matrix.fromString(
        '-5 2 6 -8\n1 -5 1 8\n7 7 -6 -7\n1 -3 7 4',
      );
      const cofactors = Matrix.fromString(
        '116 -430 -42 -278\n240 -775 -119 -433\n128 -236 -28 -160\n-24 277 105 163',
      );
      expect(matrix.getCofactorsMatrix()).toEqual(cofactors);
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

    describe('Matrix inversion', () => {
      it('should tell if a matrix is invertible', () => {
        const matrix = Matrix.fromString(
          '6 4 4 4\n5 5 7 6\n4 -9 3 -7\n9 1 7 -6',
        );
        expect(matrix.isInvertible()).toBe(true);
      });

      it('should tell if a matrix is not invertible', () => {
        const matrix = Matrix.fromString(
          '-4 2 -2 -3\n9 6 2 6\n0 -5 1 -5\n0 0 0 0',
        );
        expect(matrix.isInvertible()).toBe(false);
      });

      it('should invert a matrix', () => {
        const matrix = Matrix.fromString(
          '-5 2 6 -8\n1 -5 1 8\n7 7 -6 -7\n1 -3 7 4',
        );
        const inverse = Matrix.fromString(
          '0.21805 0.45113 0.24060 -0.04511\n-0.80827 -1.45677 -0.44361 0.52068\n-0.07895 -0.22368 -0.05263 0.19737\n-0.52256 -0.81391 -0.30075 0.30639',
        );
        expect(matrix.getDeterminant()).toBe(532);
        expect(matrix.getCofactor(2, 3)).toBe(-160);
        expect(inverse.at(3, 2)).toBeCloseTo(-160 / 532);
        expect(matrix.getCofactor(3, 2)).toBe(105);
        expect(inverse.at(2, 3)).toBeCloseTo(105 / 532);
        matrix.getInverse().forEach((value, rowIndex, colIndex) => {
          expect(value).toBeCloseTo(inverse.at(rowIndex, colIndex), 5);
        });
      });

      it('should invert another matrix', () => {
        const matrix = Matrix.fromString(
          '8 -5 9 2\n7 5 6 1\n-6 0 9 6\n-3 0 -9 -4',
        );
        const inverse = Matrix.fromString(
          '-0.15385 -0.15385 -0.28205 -0.53846\n-0.07692 0.12308 0.02564 0.03077\n0.35897 0.35897 0.43590 0.92308\n-0.69231 -0.69231 -0.76923 -1.92308',
        );
        matrix.getInverse().forEach((value, rowIndex, colIndex) => {
          expect(value).toBeCloseTo(inverse.at(rowIndex, colIndex), 5);
        });
      });

      it('should invert a third matrix', () => {
        const matrix = Matrix.fromString(
          '9 3 0 9\n-5 -2 -6 -3\n-4 9 6 4\n-7 6 6 2',
        );
        const inverse = Matrix.fromString(
          '-0.04074 -0.07778 0.14444 -0.22222\n-0.07778 0.03333 0.36667 -0.33333\n-0.02901 -0.14630 -0.10926 0.12963\n0.17778 0.06667 -0.26667 0.33333',
        );
        matrix.getInverse().forEach((value, rowIndex, colIndex) => {
          expect(value).toBeCloseTo(inverse.at(rowIndex, colIndex), 5);
        });
      });

      it('should validate that if A * B = C, then C * B^-1 = A', () => {
        const matrixA = Matrix.fromString(
          '3 -9 7 3\n3 -8 2 -9\n-4 4 4 1\n-6 5 -1 1',
        );
        const matrixB = Matrix.fromString(
          '8 2 2 2\n3 -1 7 0\n7 0 5 4\n6 -2 0 5',
        );
        const matrixC = matrixA.multiply(matrixB);
        matrixC
          .multiply(matrixB.getInverse())
          .forEach((value, rowIndex, colIndex) => {
            expect(value).toBeCloseTo(matrixA.at(rowIndex, colIndex), 5);
          });
      });

      it('should return the identity matrix when a matrix is multiplied by its inverse', () => {
        const matrix = Matrix.fromString(
          '3 -9 7 3\n3 -8 2 -9\n-4 4 4 1\n-6 5 -1 1',
        );
        const inverse = matrix.getInverse();
        matrix.multiply(inverse).forEach((value, rowIndex, colIndex) => {
          expect(value).toBeCloseTo(
            Matrix.identity(4).at(rowIndex, colIndex),
            5,
          );
        });
      });

      it('should validate that the inverse of the identity matrix is the identity matrix', () => {
        const identity = Matrix.identity(4);
        identity.getInverse().forEach((value, rowIndex, colIndex) => {
          expect(value).toBeCloseTo(identity.at(rowIndex, colIndex), 5);
        });
      });

      it('should validate that the transpose of the inverse is equal to the inverse of the transpose', () => {
        const matrix = Matrix.fromString(
          '3 -9 7 3\n3 -8 2 -9\n-4 4 4 1\n-6 5 -1 1',
        );
        const result1 = matrix.getInverse().getTranspose();
        const result2 = matrix.getTranspose().getInverse();
        result1.forEach((value, rowIndex, colIndex) => {
          expect(value).toBeCloseTo(result2.at(rowIndex, colIndex), 5);
        });
      });
    });
  });
});
