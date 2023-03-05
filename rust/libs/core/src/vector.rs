use crate::tuple::{CoordValue, Tuple};

#[derive(Debug, Clone)]
pub struct Vector {
    tuple: Tuple,
}

impl Vector {
    pub fn new(x: CoordValue, y: CoordValue, z: CoordValue) -> Vector {
        Vector {
            tuple: Tuple::new(x, y, z),
        }
    }

    pub fn from(t: Tuple) -> Vector {
        Vector { tuple: t }
    }

    pub fn from_array(a: [CoordValue; 3]) -> Vector {
        Vector {
            tuple: Tuple::from_array(a),
        }
    }

    pub fn from_tuple(t: (CoordValue, CoordValue, CoordValue)) -> Vector {
        Vector {
            tuple: Tuple::from_tuple(t),
        }
    }

    pub fn from_vector(v: &Vector) -> Vector {
        Vector {
            tuple: v.tuple.clone(),
        }
    }

    pub fn as_tuple(&self) -> Tuple {
        self.tuple.clone()
    }

    pub fn as_features(&self) -> (CoordValue, CoordValue, CoordValue) {
        (self.tuple.x, self.tuple.y, self.tuple.z)
    }

    pub fn add(&self, other: &Vector) -> Vector {
        Vector {
            tuple: self.tuple.add(&other.tuple),
        }
    }

    pub fn sub(&self, other: &Vector) -> Vector {
        Vector {
            tuple: self.tuple.sub(&other.tuple),
        }
    }

    pub fn neg(&self) -> Vector {
        Vector {
            tuple: self.tuple.neg(),
        }
    }

    pub fn scalar_mul(&self, scalar: CoordValue) -> Vector {
        Vector {
            tuple: self.tuple.scalar_mul(scalar),
        }
    }

    pub fn scalar_div(&self, scalar: CoordValue) -> Vector {
        Vector {
            tuple: self.tuple.scalar_div(scalar),
        }
    }

    pub fn magnitude(&self) -> CoordValue {
        f32::sqrt(
            self.tuple.x * self.tuple.x + self.tuple.y * self.tuple.y + self.tuple.z * self.tuple.z,
        )
    }

    pub fn normalize(&self) -> Vector {
        let mag = self.magnitude();
        Vector {
            tuple: Tuple {
                x: self.tuple.x / mag,
                y: self.tuple.y / mag,
                z: self.tuple.z / mag,
            },
        }
    }

    pub fn dot(&self, other: &Vector) -> CoordValue {
        self.tuple.x * other.tuple.x + self.tuple.y * other.tuple.y + self.tuple.z * other.tuple.z
    }

    pub fn cross(&self, other: &Vector) -> Vector {
        Vector {
            tuple: Tuple {
                x: self.tuple.y * other.tuple.z - self.tuple.z * other.tuple.y,
                y: self.tuple.z * other.tuple.x - self.tuple.x * other.tuple.z,
                z: self.tuple.x * other.tuple.y - self.tuple.y * other.tuple.x,
            },
        }
    }
}

impl PartialEq for Vector {
    fn eq(&self, other: &Vector) -> bool {
        self.tuple.eq(&other.tuple)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    const EPSILON: CoordValue = 0.0000001;

    #[test]
    fn test_new() {
        let v = Vector::new(1.0, 2.0, 3.0);
        assert_eq!(v.tuple.x, 1.0);
        assert_eq!(v.tuple.y, 2.0);
        assert_eq!(v.tuple.z, 3.0);
    }

    #[test]
    fn test_from() {
        let t = Tuple::new(1.0, 2.0, 3.0);
        let v = Vector::from(t);
        assert_eq!(v.tuple.x, 1.0);
        assert_eq!(v.tuple.y, 2.0);
        assert_eq!(v.tuple.z, 3.0);
    }

    #[test]
    fn test_from_array() {
        let a = [1.0, 2.0, 3.0];
        let v = Vector::from_array(a);
        assert_eq!(v.tuple.x, 1.0);
        assert_eq!(v.tuple.y, 2.0);
        assert_eq!(v.tuple.z, 3.0);
    }

    #[test]
    fn test_from_tuple() {
        let t = (1.0, 2.0, 3.0);
        let v = Vector::from_tuple(t);
        assert_eq!(v.tuple.x, 1.0);
        assert_eq!(v.tuple.y, 2.0);
        assert_eq!(v.tuple.z, 3.0);
    }

    #[test]
    fn test_from_vector() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = Vector::from_vector(&v1);
        assert_eq!(v2.tuple.x, 1.0);
        assert_eq!(v2.tuple.y, 2.0);
        assert_eq!(v2.tuple.z, 3.0);
    }

    #[test]
    fn test_clone() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = v1.clone();
        assert_eq!(v2.tuple.x, 1.0);
        assert_eq!(v2.tuple.y, 2.0);
        assert_eq!(v2.tuple.z, 3.0);
    }

    #[test]
    fn test_as_tuple() {
        let v = Vector::new(1.0, 2.0, 3.0);
        let t = v.as_tuple();
        assert_eq!(t.x, 1.0);
        assert_eq!(t.y, 2.0);
        assert_eq!(t.z, 3.0);
    }

    #[test]
    fn test_as_features() {
        let v = Vector::new(1.0, 2.0, 3.0);
        let (x, y, z) = v.as_features();
        assert_eq!(x, 1.0);
        assert_eq!(y, 2.0);
        assert_eq!(z, 3.0);
    }

    #[test]
    fn test_eq() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = Vector::new(1.0, 2.0, 3.0);
        assert!(v1.eq(&v2));
    }

    #[test]
    fn test_add() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = Vector::new(4.0, 5.0, 6.0);
        let v3 = v1.add(&v2);
        assert_eq!(v3.tuple.x, 5.0);
        assert_eq!(v3.tuple.y, 7.0);
        assert_eq!(v3.tuple.z, 9.0);
    }

    #[test]
    fn test_sub() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = Vector::new(4.0, 5.0, 6.0);
        let v3 = v1.sub(&v2);
        assert_eq!(v3.tuple.x, -3.0);
        assert_eq!(v3.tuple.y, -3.0);
        assert_eq!(v3.tuple.z, -3.0);
    }

    #[test]
    fn test_neg() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = v1.neg();
        assert_eq!(v2.tuple.x, -1.0);
        assert_eq!(v2.tuple.y, -2.0);
        assert_eq!(v2.tuple.z, -3.0);
    }

    #[test]
    fn test_scalar_mul() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = v1.scalar_mul(2.0);
        assert_eq!(v2.tuple.x, 2.0);
        assert_eq!(v2.tuple.y, 4.0);
        assert_eq!(v2.tuple.z, 6.0);
    }

    #[test]
    fn test_scalar_div() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = v1.scalar_div(2.0);
        assert_eq!(v2.tuple.x, 0.5);
        assert_eq!(v2.tuple.y, 1.0);
        assert_eq!(v2.tuple.z, 1.5);
    }

    #[test]
    fn test_magnitude() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        assert!(v1.magnitude() - f32::sqrt(14.0) < EPSILON);
    }

    #[test]
    fn test_magnitude_of_1_0_0_is_1() {
        let v1 = Vector::new(1.0, 0.0, 0.0);
        assert!(v1.magnitude() - 1.0 < EPSILON);
    }

    #[test]
    fn test_magnitude_of_0_1_0_is_1() {
        let v1 = Vector::new(0.0, 1.0, 0.0);
        assert!(v1.magnitude() - 1.0 < EPSILON);
    }

    #[test]
    fn test_magnitude_of_0_0_1_is_1() {
        let v1 = Vector::new(0.0, 0.0, 1.0);
        assert!(v1.magnitude() - 1.0 < EPSILON);
    }

    #[test]
    fn test_magnitude_of_neg_1_0_0_is_1() {
        let v1 = Vector::new(-1.0, 0.0, 0.0);
        assert!(v1.magnitude() - 1.0 < EPSILON);
    }

    #[test]
    fn test_magnitude_of_0_neg_1_0_is_1() {
        let v1 = Vector::new(0.0, -1.0, 0.0);
        assert!(v1.magnitude() - 1.0 < EPSILON);
    }

    #[test]
    fn test_magnitude_of_0_0_neg_1_is_1() {
        let v1 = Vector::new(0.0, 0.0, -1.0);
        assert!(v1.magnitude() - 1.0 < EPSILON);
    }

    #[test]
    fn test_normalize() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = v1.normalize();
        assert!(v2.as_tuple().x - 1.0 / f32::sqrt(14.0) < EPSILON);
        assert!(v2.as_tuple().y - 2.0 / f32::sqrt(14.0) < EPSILON);
        assert!(v2.as_tuple().z - 3.0 / f32::sqrt(14.0) < EPSILON);
    }

    #[test]
    fn test_magnitude_of_normalized_vector_is_1() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = v1.normalize();
        assert!(v2.magnitude() - 1.0 < EPSILON);
    }

    #[test]
    fn test_dot_product() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = Vector::new(2.0, 3.0, 4.0);
        assert!(v1.dot(&v2) - 20.0 < EPSILON);
    }

    #[test]
    fn test_cross_product() {
        let v1 = Vector::new(1.0, 2.0, 3.0);
        let v2 = Vector::new(2.0, 3.0, 4.0);
        let v3 = v1.cross(&v2);
        assert_eq!(v3.tuple.x, -1.0);
        assert_eq!(v3.tuple.y, 2.0);
        assert_eq!(v3.tuple.z, -1.0);
        let v4 = v2.cross(&v1);
        assert_eq!(v4.tuple.x, 1.0);
        assert_eq!(v4.tuple.y, -2.0);
        assert_eq!(v4.tuple.z, 1.0);
    }
}
