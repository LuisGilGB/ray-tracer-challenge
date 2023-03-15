#[derive(Debug)]
pub struct Matrix {
    rows: usize,
    columns: usize,
    data: Vec<Vec<f64>>,
}

impl Matrix {
    pub fn new(rows: usize, columns: usize) -> Matrix {
        Matrix {
            rows,
            columns,
            data: vec![vec![0.0; columns]; rows],
        }
    }

    pub fn from_string(s: &str) -> Matrix {
        let mut rows = Vec::new();
        for line in s.lines() {
            let mut row = Vec::new();
            for value in line.split_whitespace() {
                row.push(value.parse::<f64>().unwrap());
            }
            rows.push(row);
        }
        Matrix {
            rows: rows.len(),
            columns: rows[0].len(),
            data: rows,
        }
    }

    pub fn from_vec(input_array: Vec<Vec<f64>>) -> Matrix {
        let mut rows = Vec::new();
        for row in input_array.iter() {
            let mut r = Vec::new();
            for value in row.iter() {
                r.push(*value);
            }
            rows.push(r);
        }
        Matrix {
            rows: rows.len(),
            columns: rows[0].len(),
            data: rows,
        }
    }

    pub fn from_matrix(m: &Matrix) -> Matrix {
        let data = m.data.clone();
        Matrix {
            rows: m.rows,
            columns: m.columns,
            data,
        }
    }

    pub fn get(&self, row: usize, column: usize) -> f64 {
        self.data[row][column]
    }

    pub fn get_rows(&self) -> Vec<Vec<f64>> {
        self.data.clone()
    }

    pub fn get_columns(&self) -> Vec<Vec<f64>> {
        let mut columns = Vec::new();
        for i in 0..self.columns {
            let mut column = Vec::new();
            for j in 0..self.rows {
                column.push(self.data[j][i]);
            }
            columns.push(column);
        }
        columns
    }

    pub fn get_row(&self, row: usize) -> Vec<f64> {
        self.data[row].clone()
    }

    pub fn get_column(&self, column: usize) -> Vec<f64> {
        let mut c = Vec::new();
        for i in 0..self.rows {
            c.push(self.data[i][column]);
        }
        c
    }

    pub fn get_diagonal(&self) -> Vec<f64> {
        let mut d = Vec::new();
        for i in 0..self.rows {
            d.push(self.data[i][i]);
        }
        d
    }
}

impl PartialEq for Matrix {
    fn eq(&self, other: &Matrix) -> bool {
        if self.rows != other.rows || self.columns != other.columns {
            return false;
        }
        for i in 0..self.rows {
            for j in 0..self.columns {
                if self.data[i][j] != other.data[i][j] {
                    return false;
                }
            }
        }
        true
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let m = Matrix::new(4, 4);
        assert_eq!(m.rows, 4);
        assert_eq!(m.columns, 4);
    }

    #[test]
    fn test_create_2x2_matrix_from_string() {
        let m = Matrix::from_string("1 2\n3 4");
        assert_eq!(m.rows, 2);
        assert_eq!(m.columns, 2);
        assert_eq!(m.data[0][0], 1.0);
        assert_eq!(m.data[0][1], 2.0);
        assert_eq!(m.data[1][0], 3.0);
        assert_eq!(m.data[1][1], 4.0);
    }

    #[test]
    fn test_create_3x3_matrix_from_string() {
        let m = Matrix::from_string("1 2 3\n4 5 6\n7 8 9");
        assert_eq!(m.rows, 3);
        assert_eq!(m.columns, 3);
        assert_eq!(m.data[0][0], 1.0);
        assert_eq!(m.data[0][1], 2.0);
        assert_eq!(m.data[0][2], 3.0);
        assert_eq!(m.data[1][0], 4.0);
        assert_eq!(m.data[1][1], 5.0);
        assert_eq!(m.data[1][2], 6.0);
        assert_eq!(m.data[2][0], 7.0);
        assert_eq!(m.data[2][1], 8.0);
        assert_eq!(m.data[2][2], 9.0);
    }

    #[test]
    fn test_create_4x4_matrix_from_string() {
        let m = Matrix::from_string("1 2 3 4\n5 6 7 8\n9 8 7 6\n5 4 3 2");
        assert_eq!(m.rows, 4);
        assert_eq!(m.columns, 4);
        assert_eq!(m.data[0][0], 1.0);
        assert_eq!(m.data[0][1], 2.0);
        assert_eq!(m.data[0][2], 3.0);
        assert_eq!(m.data[0][3], 4.0);
        assert_eq!(m.data[1][0], 5.0);
        assert_eq!(m.data[1][1], 6.0);
        assert_eq!(m.data[1][2], 7.0);
        assert_eq!(m.data[1][3], 8.0);
        assert_eq!(m.data[2][0], 9.0);
        assert_eq!(m.data[2][1], 8.0);
        assert_eq!(m.data[2][2], 7.0);
        assert_eq!(m.data[2][3], 6.0);
        assert_eq!(m.data[3][0], 5.0);
        assert_eq!(m.data[3][1], 4.0);
        assert_eq!(m.data[3][2], 3.0);
        assert_eq!(m.data[3][3], 2.0);
    }

    #[test]
    fn test_create_2x2_matrix_from_vec() {
        let m = Matrix::from_vec(vec![vec![1.0, 2.0], vec![3.0, 4.0]]);
        assert_eq!(m.rows, 2);
        assert_eq!(m.columns, 2);
        assert_eq!(m.data[0][0], 1.0);
        assert_eq!(m.data[0][1], 2.0);
        assert_eq!(m.data[1][0], 3.0);
        assert_eq!(m.data[1][1], 4.0);
    }

    #[test]
    fn test_create_3x3_matrix_from_vec() {
        let m = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0],
            vec![4.0, 5.0, 6.0],
            vec![7.0, 8.0, 9.0],
        ]);
        assert_eq!(m.rows, 3);
        assert_eq!(m.columns, 3);
        assert_eq!(m.data[0][0], 1.0);
        assert_eq!(m.data[0][1], 2.0);
        assert_eq!(m.data[0][2], 3.0);
        assert_eq!(m.data[1][0], 4.0);
        assert_eq!(m.data[1][1], 5.0);
        assert_eq!(m.data[1][2], 6.0);
        assert_eq!(m.data[2][0], 7.0);
        assert_eq!(m.data[2][1], 8.0);
        assert_eq!(m.data[2][2], 9.0);
    }

    #[test]
    fn test_create_4x4_matrix_from_vec() {
        let m = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        assert_eq!(m.rows, 4);
        assert_eq!(m.columns, 4);
        assert_eq!(m.data[0][0], 1.0);
        assert_eq!(m.data[0][1], 2.0);
        assert_eq!(m.data[0][2], 3.0);
        assert_eq!(m.data[0][3], 4.0);
        assert_eq!(m.data[1][0], 5.0);
        assert_eq!(m.data[1][1], 6.0);
        assert_eq!(m.data[1][2], 7.0);
        assert_eq!(m.data[1][3], 8.0);
        assert_eq!(m.data[2][0], 9.0);
        assert_eq!(m.data[2][1], 8.0);
        assert_eq!(m.data[2][2], 7.0);
        assert_eq!(m.data[2][3], 6.0);
        assert_eq!(m.data[3][0], 5.0);
        assert_eq!(m.data[3][1], 4.0);
        assert_eq!(m.data[3][2], 3.0);
        assert_eq!(m.data[3][3], 2.0);
    }

    #[test]
    fn test_get_element_from_matrix() {
        let m = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        assert_eq!(m.get(0, 0), 1.0);
        assert_eq!(m.get(0, 1), 2.0);
        assert_eq!(m.get(0, 2), 3.0);
        assert_eq!(m.get(0, 3), 4.0);
        assert_eq!(m.get(1, 0), 5.0);
        assert_eq!(m.get(1, 1), 6.0);
        assert_eq!(m.get(1, 2), 7.0);
        assert_eq!(m.get(1, 3), 8.0);
        assert_eq!(m.get(2, 0), 9.0);
        assert_eq!(m.get(2, 1), 8.0);
        assert_eq!(m.get(2, 2), 7.0);
        assert_eq!(m.get(2, 3), 6.0);
        assert_eq!(m.get(3, 0), 5.0);
        assert_eq!(m.get(3, 1), 4.0);
        assert_eq!(m.get(3, 2), 3.0);
        assert_eq!(m.get(3, 3), 2.0);
    }

    #[test]
    fn test_get_rows_from_matrix() {
        let m = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        assert_eq!(
            m.get_rows(),
            [
                [1.0, 2.0, 3.0, 4.0],
                [5.0, 6.0, 7.0, 8.0],
                [9.0, 8.0, 7.0, 6.0],
                [5.0, 4.0, 3.0, 2.0],
            ]
        );
    }

    #[test]
    fn test_get_columns_from_matrix() {
        let m = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        assert_eq!(
            m.get_columns(),
            [
                [1.0, 5.0, 9.0, 5.0],
                [2.0, 6.0, 8.0, 4.0],
                [3.0, 7.0, 7.0, 3.0],
                [4.0, 8.0, 6.0, 2.0],
            ]
        );
    }

    #[test]
    fn test_get_a_row_from_matrix() {
        let m = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        assert_eq!(m.get_row(0), [1.0, 2.0, 3.0, 4.0]);
        assert_eq!(m.get_row(1), [5.0, 6.0, 7.0, 8.0]);
        assert_eq!(m.get_row(2), [9.0, 8.0, 7.0, 6.0]);
        assert_eq!(m.get_row(3), [5.0, 4.0, 3.0, 2.0]);
    }

    #[test]
    fn test_get_a_column_from_matrix() {
        let m = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        assert_eq!(m.get_column(0), [1.0, 5.0, 9.0, 5.0]);
        assert_eq!(m.get_column(1), [2.0, 6.0, 8.0, 4.0]);
        assert_eq!(m.get_column(2), [3.0, 7.0, 7.0, 3.0]);
        assert_eq!(m.get_column(3), [4.0, 8.0, 6.0, 2.0]);
    }

    #[test]
    fn test_get_diagonal_from_matrix() {
        let m = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        assert_eq!(m.get_diagonal(), [1.0, 6.0, 7.0, 2.0]);
    }

    #[test]
    fn test_matrix_equality() {
        let m1 = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        let m2 = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 2.0],
        ]);
        let m3 = Matrix::from_vec(vec![
            vec![1.0, 2.0, 3.0, 4.0],
            vec![5.0, 6.0, 7.0, 8.0],
            vec![9.0, 8.0, 7.0, 6.0],
            vec![5.0, 4.0, 3.0, 1.0],
        ]);
        assert_eq!(m1, m2);
        assert_ne!(m1, m3);
    }
}
