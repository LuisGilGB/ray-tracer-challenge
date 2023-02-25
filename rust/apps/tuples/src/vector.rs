use crate::tuple::{CoordValue, Tuple};

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

    pub fn clone(&self) -> Vector {
        Vector {
            tuple: self.tuple.clone(),
        }
    }

    pub fn as_tuple(&self) -> Tuple {
        self.tuple.clone()
    }

    pub fn as_features(&self) -> (CoordValue, CoordValue, CoordValue) {
        (self.tuple.x, self.tuple.y, self.tuple.z)
    }

    pub fn eq(&self, other: &Vector) -> bool {
        self.tuple.eq(&other.tuple)
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
}

#[cfg(test)]
mod tests {
    use super::*;

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
}
