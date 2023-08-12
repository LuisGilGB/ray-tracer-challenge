import Tuple from './Tuple';
import Vector from './Vector';

class Matrix {
  private readonly _matrix: number[][];

  private constructor(values: number[][]) {
    this._matrix = values;
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
}

export default Matrix;
