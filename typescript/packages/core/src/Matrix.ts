class Matrix {
  private _matrix: number[][];

  constructor() {
    this._matrix = [];
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
}

export default Matrix;
