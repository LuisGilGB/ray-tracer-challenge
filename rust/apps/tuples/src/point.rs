pub struct Point {
    x: f64,
    y: f64,
    z: f64,
}

impl Point {
    pub fn from_array(a: [f64; 3]) -> Point {
        Point { x: a[0], y: a[1], z: a[2] }
    }

    pub fn from_tuple(t: (f64, f64, f64)) -> Point {
        Point { x: t.0, y: t.1, z: t.2 }
    }

    pub fn from_point(p: &Point) -> Point {
        Point { x: p.x, y: p.y, z: p.z }
    }

    pub fn equals(&self, p: &Point) -> bool {
        self.x == p.x && self.y == p.y && self.z == p.z
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let p = Point { x: 1.0, y: 2.0, z: 3.0 };
        assert_eq!(p.x, 1.0);
        assert_eq!(p.y, 2.0);
        assert_eq!(p.z, 3.0);
    }

    #[test]
    fn it_should_create_from_array() {
        let p = Point::from_array([1.0, 2.0, 3.0]);
        assert_eq!(p.x, 1.0);
        assert_eq!(p.y, 2.0);
        assert_eq!(p.z, 3.0);
    }

    #[test]
    fn it_should_create_from_tuple() {
        let p = Point::from_tuple((1.0, 2.0, 3.0));
        assert_eq!(p.x, 1.0);
        assert_eq!(p.y, 2.0);
        assert_eq!(p.z, 3.0);
    }

    #[test]
    fn it_should_create_from_another_point() {
        let p = Point { x: 1.0, y: 2.0, z: 3.0 };
        let p2 = Point::from_point(&p);
        assert_eq!(p.x, p2.x);
        assert_eq!(p.y, p2.y);
        assert_eq!(p.z, p2.z);
    }

    #[test]
    fn it_should_be_equal_to_another_point_with_same_coordinates() {
        let p = Point { x: 1.0, y: 2.0, z: 3.0 };
        let p2 = Point { x: 1.0, y: 2.0, z: 3.0 };
        assert!(p.equals(&p2));
    }

    #[test]
    fn it_should_not_be_equal_to_another_point_with_different_coordinates() {
        let p = Point { x: 1.0, y: 2.0, z: 3.0 };
        let p2 = Point { x: 1.0, y: 2.0, z: 4.0 };
        assert!(!p.equals(&p2));
    }
}
