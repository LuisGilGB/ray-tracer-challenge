use crate::tuple::{CoordValue, Tuple};
use crate::vector::Vector;

#[derive(Debug, Clone)]
pub struct Point {
    tuple: Tuple,
}

impl Point {
    pub fn new(x: CoordValue, y: CoordValue, z: CoordValue) -> Point {
        Point {
            tuple: Tuple::new(x, y, z),
        }
    }

    pub fn from(t: Tuple) -> Point {
        Point { tuple: t }
    }

    pub fn from_array(a: [CoordValue; 3]) -> Point {
        Point {
            tuple: Tuple::from_array(a),
        }
    }

    pub fn from_tuple(t: (CoordValue, CoordValue, CoordValue)) -> Point {
        Point {
            tuple: Tuple::from_tuple(t),
        }
    }

    pub fn from_point(p: &Point) -> Point {
        Point {
            tuple: p.tuple.clone(),
        }
    }

    pub fn as_tuple(&self) -> Tuple {
        self.tuple.clone()
    }

    pub fn as_coordinates(&self) -> (CoordValue, CoordValue, CoordValue) {
        (self.tuple.x, self.tuple.y, self.tuple.z)
    }

    pub fn add_vector(&self, other: &Vector) -> Point {
        Point {
            tuple: self.tuple.add(&other.as_tuple()),
        }
    }

    pub fn sub_vector(&self, other: &Vector) -> Point {
        Point {
            tuple: self.tuple.sub(&other.as_tuple()),
        }
    }
}

impl PartialEq for Point {
    fn eq(&self, other: &Point) -> bool {
        self.tuple.eq(&other.tuple)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let p = Point::new(1.0, 2.0, 3.0);
        assert_eq!(p.tuple.x, 1.0);
        assert_eq!(p.tuple.y, 2.0);
        assert_eq!(p.tuple.z, 3.0);
    }

    #[test]
    fn test_from() {
        let t = Tuple::new(1.0, 2.0, 3.0);
        let p = Point::from(t);
        assert_eq!(p.tuple.x, 1.0);
        assert_eq!(p.tuple.y, 2.0);
        assert_eq!(p.tuple.z, 3.0);
    }

    #[test]
    fn test_from_array() {
        let p = Point::from_array([1.0, 2.0, 3.0]);
        assert_eq!(p.tuple.x, 1.0);
        assert_eq!(p.tuple.y, 2.0);
        assert_eq!(p.tuple.z, 3.0);
    }

    #[test]
    fn test_from_tuple() {
        let p = Point::from_tuple((1.0, 2.0, 3.0));
        assert_eq!(p.tuple.x, 1.0);
        assert_eq!(p.tuple.y, 2.0);
        assert_eq!(p.tuple.z, 3.0);
    }

    #[test]
    fn test_from_point() {
        let p = Point::new(1.0, 2.0, 3.0);
        let p2 = Point::from_point(&p);
        assert_eq!(p.tuple.x, p2.tuple.x);
        assert_eq!(p.tuple.y, p2.tuple.y);
        assert_eq!(p.tuple.z, p2.tuple.z);
    }

    #[test]
    fn test_clone() {
        let p = Point::new(1.0, 2.0, 3.0);
        let p2 = p.clone();
        assert_eq!(p.tuple.x, p2.tuple.x);
        assert_eq!(p.tuple.y, p2.tuple.y);
        assert_eq!(p.tuple.z, p2.tuple.z);
    }

    #[test]
    fn test_as_tuple() {
        let p = Point::new(1.0, 2.0, 3.0);
        let t = p.as_tuple();
        assert_eq!(p.tuple.x, t.x);
        assert_eq!(p.tuple.y, t.y);
        assert_eq!(p.tuple.z, t.z);
    }

    #[test]
    fn test_as_coordinates() {
        let p = Point::new(1.0, 2.0, 3.0);
        let (x, y, z) = p.as_coordinates();
        assert_eq!(p.tuple.x, x);
        assert_eq!(p.tuple.y, y);
        assert_eq!(p.tuple.z, z);
    }

    #[test]
    fn test_eq() {
        let p = Point::new(1.0, 2.0, 3.0);
        let p2 = Point::new(1.0, 2.0, 3.0);
        assert!(p.eq(&p2));
    }

    #[test]
    fn test_add_vector() {
        let p = Point::new(1.0, 2.0, 3.0);
        let v = Vector::new(1.0, 2.0, 3.0);
        let p2 = p.add_vector(&v);
        assert_eq!(p2.tuple.x, 2.0);
        assert_eq!(p2.tuple.y, 4.0);
        assert_eq!(p2.tuple.z, 6.0);
    }

    #[test]
    fn test_sub_vector() {
        let p = Point::new(1.0, 2.0, 3.0);
        let v = Vector::new(1.0, 2.0, 3.0);
        let p2 = p.sub_vector(&v);
        assert_eq!(p2.tuple.x, 0.0);
        assert_eq!(p2.tuple.y, 0.0);
        assert_eq!(p2.tuple.z, 0.0);
    }
}
