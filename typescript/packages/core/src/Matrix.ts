import Tuple from './Tuple';
import Vector from './Vector';

class Matrix {
  private readonly _matrix: number[][];

  private constructor(values: number[][]) {
    this._matrix = values;
    Object.freeze(this._matrix);
    Object.freeze(this);
  }

  public get rows(): number {
    return this._matrix.length;
  }

  public get columns(): number {
    return this._matrix[0].length;
  }

  public static fromString(str: string): Matrix {
    return new Matrix(
      str.split('\n').map(row => row.split(' ').map(num => parseFloat(num))),
    );
  }

  public static fromArray(arr: number[][]): Matrix {
    return new Matrix(arr);
  }

  public static fromTuple(tuple: Tuple): Matrix {
    return new Matrix([tuple.toArray()]);
  }

  public static fromVector(vector: Vector): Matrix {
    return new Matrix([vector.toArray()]);
  }

  public static fromVectors(vectors: Vector[]): Matrix {
    return new Matrix(vectors.map(vector => vector.toArray()));
  }

  public static identity(size: number): Matrix {
    return new Matrix(
      Array(size)
        .fill(Array(size).fill(0))
        .map((row: number[], i) => row.map((_, j) => (i === j ? 1 : 0))),
    );
  }

  public static createEmpty(rows: number, columns: number): Matrix {
    if (rows <= 0 || columns <= 0) {
      return new Matrix([[]]);
    }
    return new Matrix(Array(rows).fill(Array(columns).fill(0)));
  }

  public clone(): Matrix {
    return Matrix.fromArray(this._matrix);
  }

  public toArray(): number[][] {
    return this._matrix;
  }

  public format(): string {
    return this._matrix.map(row => row.join(' ')).join('\n');
  }

  public print(): void {
    console.log(`Matrix:\n${this.format()}`);
  }

  public isSquare(): boolean {
    return this.rows === this.columns;
  }

  public getRow(row: number): Tuple {
    return Tuple.fromArray(this._matrix[row]);
  }

  public getRowArray(row: number): number[] {
    return this._matrix[row];
  }

  getRowArrays(): number[][] {
    return this._matrix;
  }

  public getRowVector(row: number): Vector {
    return Vector.fromArray(this._matrix[row]);
  }

  public getRowVectors(): Vector[] {
    return this._matrix.map(row => Vector.fromArray(row));
  }

  public getColumn(column: number): Tuple {
    return Tuple.fromArray(this.getColumnArray(column));
  }

  public getColumnArray(column: number): number[] {
    return this._matrix.map(row => row[column]);
  }

  public getColumnArrays(): number[][] {
    return this._matrix[0].map((_, i) => this._matrix.map(row => row[i]));
  }

  public getColumnVector(column: number): Vector {
    return Vector.fromArray(this._matrix.map(row => row[column]));
  }

  public getColumnVectors(): Vector[] {
    return this._matrix[0].map((_, i) => this.getColumnVector(i));
  }

  public toVectors(): Vector[] {
    return this._matrix.map(row => Vector.fromArray(row));
  }

  public getDiagonal(): Tuple {
    return Tuple.fromArray(this.getDiagonalArray());
  }

  public getDiagonalArray(): number[] {
    return this._matrix.map((row, i) => row[i]);
  }

  public getDiagonalVector(): Vector {
    return Vector.fromArray(this.getDiagonalArray());
  }

  public getTranspose(): Matrix {
    return new Matrix(this.getColumnArrays());
  }

  public at(row: number, column: number): number {
    return this._matrix[row][column];
  }

  public equals(other: Matrix): boolean {
    return this._matrix.every((row, i) =>
      row.every((num, j) => num === other.at(i, j)),
    );
  }

  public forEach(fn: (num: number, row: number, column: number) => void): void {
    this._matrix.forEach((row, rowIndex) =>
      row.forEach((num, colIndex) => fn(num, rowIndex, colIndex)),
    );
  }

  public map(fn: (num: number, row: number, column: number) => number): Matrix {
    return new Matrix(
      this._matrix.map((row, i) => row.map((num, j) => fn(num, i, j))),
    );
  }

  public getSubmatrix(row: number, column: number): Matrix {
    return new Matrix(
      this.getRowArrays()
        .filter((_, i) => i !== row)
        .map(row => row.filter((_, j) => j !== column)),
    );
  }

  public getDeterminant(): number {
    if (this.rows === 2 && this.columns === 2) {
      return this.at(0, 0) * this.at(1, 1) - this.at(0, 1) * this.at(1, 0);
    } else {
      const rowIndex = 0;
      const rowVector = this.getRowVector(rowIndex);
      const cofactorsVector = rowVector.map((_, colIndex) =>
        this.getCofactor(rowIndex, colIndex),
      );
      return rowVector.dot(cofactorsVector);
    }
  }

  public getMinor(row: number, column: number): number {
    return this.getSubmatrix(row, column).getDeterminant();
  }

  public getCofactor(row: number, column: number): number {
    return (row + column) % 2 === 0
      ? this.getMinor(row, column)
      : -this.getMinor(row, column);
  }

  public getCofactorsMatrix(): Matrix {
    return this.map((_, i, j) => this.getCofactor(i, j));
  }

  public multiply(other: Matrix): Matrix {
    const firstMatrixRows = this.getRowVectors();
    const secondMatrixColumns = other.getColumnVectors();
    return new Matrix(
      firstMatrixRows.map(column =>
        secondMatrixColumns.map(row => row.dot(column)),
      ),
    );
  }

  public multiplyTuple(tuple: Tuple): Tuple {
    const matrix = this.multiply(Matrix.fromTuple(tuple).getTranspose());
    return matrix.getColumn(0);
  }

  public multiplyVector(vector: Vector): Vector {
    const matrix = this.multiply(Matrix.fromVector(vector).getTranspose());
    return matrix.getColumnVector(0);
  }

  public isInvertible(): boolean {
    return this.getDeterminant() !== 0;
  }

  public getInverse(): Matrix {
    const determinant = this.getDeterminant();
    if (determinant === 0) {
      throw new Error('Matrix is not invertible');
    }
    return this.getCofactorsMatrix()
      .getTranspose()
      .map(num => num / determinant);
  }
}

export default Matrix;
