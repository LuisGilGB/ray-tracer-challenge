pub type CoordValue = f32;

pub struct Tuple {
    pub x: CoordValue,
    pub y: CoordValue,
    pub z: CoordValue,
}

impl Tuple {
    pub fn new(x: CoordValue, y: CoordValue, z: CoordValue) -> Tuple {
        Tuple { x, y, z }
    }

    pub fn from_array(a: [CoordValue; 3]) -> Tuple {
        Tuple {
            x: a[0],
            y: a[1],
            z: a[2],
        }
    }

    pub fn from_tuple(t: (CoordValue, CoordValue, CoordValue)) -> Tuple {
        Tuple {
            x: t.0,
            y: t.1,
            z: t.2,
        }
    }

    pub fn clone(&self) -> Tuple {
        Tuple {
            x: self.x,
            y: self.y,
            z: self.z,
        }
    }

    pub fn eq(&self, other: &Tuple) -> bool {
        self.x == other.x && self.y == other.y && self.z == other.z
    }

    pub fn add(&self, other: &Tuple) -> Tuple {
        Tuple {
            x: self.x + other.x,
            y: self.y + other.y,
            z: self.z + other.z,
        }
    }

    pub fn sub(&self, other: &Tuple) -> Tuple {
        Tuple {
            x: self.x - other.x,
            y: self.y - other.y,
            z: self.z - other.z,
        }
    }

    pub fn neg(&self) -> Tuple {
        Tuple {
            x: -self.x,
            y: -self.y,
            z: -self.z,
        }
    }

    pub fn scalar_mul(&self, scalar: CoordValue) -> Tuple {
        Tuple {
            x: self.x * scalar,
            y: self.y * scalar,
            z: self.z * scalar,
        }
    }

    pub fn scalar_div(&self, scalar: CoordValue) -> Tuple {
        Tuple {
            x: self.x / scalar,
            y: self.y / scalar,
            z: self.z / scalar,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let p = Tuple {
            x: 1.0,
            y: 2.0,
            z: 3.0,
        };
        assert_eq!(p.x, 1.0);
        assert_eq!(p.y, 2.0);
        assert_eq!(p.z, 3.0);
    }

    #[test]
    fn it_should_create_from_new() {
        let p = Tuple::new(1.0, 2.0, 3.0);
        assert_eq!(p.x, 1.0);
        assert_eq!(p.y, 2.0);
        assert_eq!(p.z, 3.0);
    }

    #[test]
    fn it_should_create_from_array() {
        let p = Tuple::from_array([1.0, 2.0, 3.0]);
        assert_eq!(p.x, 1.0);
        assert_eq!(p.y, 2.0);
        assert_eq!(p.z, 3.0);
    }

    #[test]
    fn it_should_create_from_tuple() {
        let p = Tuple::from_tuple((1.0, 2.0, 3.0));
        assert_eq!(p.x, 1.0);
        assert_eq!(p.y, 2.0);
        assert_eq!(p.z, 3.0);
    }

    #[test]
    fn it_should_clone() {
        let p1 = Tuple::from_array([1.0, 2.0, 3.0]);
        let p2 = p1.clone();
        assert_eq!(p2.x, 1.0);
        assert_eq!(p2.y, 2.0);
        assert_eq!(p2.z, 3.0);
    }

    #[test]
    fn it_should_equal() {
        let p1 = Tuple::from_array([1.0, 2.0, 3.0]);
        let p2 = Tuple::from_array([1.0, 2.0, 3.0]);
        assert!(p1.eq(&p2));
    }

    #[test]
    fn it_should_add_tuples() {
        let p1 = Tuple::from_array([3.0, -2.0, 5.0]);
        let p2 = Tuple::from_array([-2.0, 3.0, 1.0]);
        let p3 = p1.add(&p2);
        assert_eq!(p3.x, 1.0);
        assert_eq!(p3.y, 1.0);
        assert_eq!(p3.z, 6.0);
    }

    #[test]
    fn it_should_sub_tuples() {
        let p1 = Tuple::from_array([3.0, 2.0, 1.0]);
        let p2 = Tuple::from_array([5.0, 6.0, 7.0]);
        let p3 = p1.sub(&p2);
        assert_eq!(p3.x, -2.0);
        assert_eq!(p3.y, -4.0);
        assert_eq!(p3.z, -6.0);
    }

    #[test]
    fn it_should_negate_tuples() {
        let p1 = Tuple::from_array([1.0, -2.0, 3.0]);
        let p2 = p1.neg();
        assert_eq!(p2.x, -1.0);
        assert_eq!(p2.y, 2.0);
        assert_eq!(p2.z, -3.0);
    }

    #[test]
    fn it_should_scalar_mul_tuples() {
        let p1 = Tuple::from_array([1.0, -2.0, 3.0]);
        let p2 = p1.scalar_mul(3.5);
        assert_eq!(p2.x, 3.5);
        assert_eq!(p2.y, -7.0);
        assert_eq!(p2.z, 10.5);
    }

    #[test]
    fn it_should_scalar_div_tuples() {
        let p1 = Tuple::from_array([1.0, -2.0, 3.0]);
        let p2 = p1.scalar_div(2.0);
        assert_eq!(p2.x, 0.5);
        assert_eq!(p2.y, -1.0);
        assert_eq!(p2.z, 1.5);
    }
}
