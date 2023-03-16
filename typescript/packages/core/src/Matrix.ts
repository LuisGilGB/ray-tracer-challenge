import Tuple from "./Tuple";

class Matrix {
  private _matrix: number[][];

  constructor(rows = 0, columns = 0) {
    this._matrix = Array(rows)
      .fill(0)
      .map(() => Array(columns).fill(0));
  }

  public static fromString(str: string): Matrix {
    const matrix = new Matrix();
    matrix._matrix = str
      .split("\n")
      .map((row) => row
        .split(" ")
        .map((num) => parseFloat(num))
      );
    return matrix;
  }

  public static fromArray(arr: number[][]): Matrix {
    const matrix = new Matrix();
    matrix._matrix = arr;
    return matrix;
  }

  public get matrix(): number[][] {
    return this._matrix;
  }

  public get rows(): number[][] {
    return this._matrix;
  }

  public get columns(): number[][] {
    return this._matrix[0]
      .map((_, i) => this._matrix
        .map(row => row[i])
      );
  }

  public getRow(row: number): number[] {
    return this._matrix[row];
  }

  public getColumn(column: number): number[] {
    return this._matrix.map(row => row[column]);
  }

  public getDiagonal(): number[] {
    return this._matrix.map((row, i) => row[i]);
  }

  public getElementAt(row: number, column: number): number {
    return this._matrix[row][column];
  }

  public equals(other: Matrix): boolean {
    return this._matrix
      .every((row, i) => row
        .every((num, j) => num === other.getElementAt(i, j))
      );
  }

  public multiply(other: Matrix): Matrix {
    const result = new Matrix(this.rows.length, other.columns.length);
    result._matrix = result._matrix.map((resultRow, rowIndex) => resultRow
      .map((_, columnIndex) => this.getRow(rowIndex)
        .reduce((sum, value, i) => sum + value * other.getElementAt(i, columnIndex), 0)
      )
    );
    return result;
  }

  public multiplyTuple(tuple: Tuple): Tuple {
    return Tuple.fromArray(this.multiply(Matrix.fromArray([tuple.toArray()])).matrix[0]);
  }
}

export default Matrix;
