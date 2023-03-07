use crate::tuple::{CoordValue, Tuple};

#[derive(Debug, Clone)]
pub struct Color {
    tuple: Tuple,
}

impl Color {
    pub fn new(r: CoordValue, g: CoordValue, b: CoordValue) -> Color {
        Color {
            tuple: Tuple::new(r, g, b),
        }
    }

    pub fn from(t: Tuple) -> Color {
        Color { tuple: t }
    }

    pub fn from_array(a: [CoordValue; 3]) -> Color {
        Color {
            tuple: Tuple::from_array(a),
        }
    }

    pub fn from_tuple(t: (CoordValue, CoordValue, CoordValue)) -> Color {
        Color {
            tuple: Tuple::from_tuple(t),
        }
    }

    pub fn from_color(c: &Color) -> Color {
        Color {
            tuple: c.tuple.clone(),
        }
    }

    pub fn as_tuple(&self) -> Tuple {
        self.tuple.clone()
    }

    pub fn red(&self) -> CoordValue {
        self.tuple.x
    }

    pub fn green(&self) -> CoordValue {
        self.tuple.y
    }

    pub fn blue(&self) -> CoordValue {
        self.tuple.z
    }

    pub fn add(&self, other: &Color) -> Color {
        Color {
            tuple: self.tuple.add(&other.tuple),
        }
    }

    pub fn sub(&self, other: &Color) -> Color {
        Color {
            tuple: self.tuple.sub(&other.tuple),
        }
    }

    pub fn mul(&self, scalar: CoordValue) -> Color {
        Color {
            tuple: self.tuple.scalar_mul(scalar),
        }
    }

    pub fn hadamard_product(&self, other: &Color) -> Color {
        Color::from_array([
            self.red() * other.red(),
            self.green() * other.green(),
            self.blue() * other.blue(),
        ])
    }
}

impl PartialEq for Color {
    fn eq(&self, other: &Color) -> bool {
        self.tuple == other.tuple
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let c = Color::new(1.0, 2.0, 3.0);
        assert_eq!(c.red(), 1.0);
        assert_eq!(c.green(), 2.0);
        assert_eq!(c.blue(), 3.0);
    }

    #[test]
    fn test_from() {
        let t = Tuple::new(1.0, 2.0, 3.0);
        let c = Color::from(t);
        assert_eq!(c.red(), 1.0);
        assert_eq!(c.green(), 2.0);
        assert_eq!(c.blue(), 3.0);
    }

    #[test]
    fn test_from_array() {
        let c = Color::from_array([1.0, 2.0, 3.0]);
        assert_eq!(c.red(), 1.0);
        assert_eq!(c.green(), 2.0);
        assert_eq!(c.blue(), 3.0);
    }

    #[test]
    fn test_from_tuple() {
        let c = Color::from_tuple((1.0, 2.0, 3.0));
        assert_eq!(c.red(), 1.0);
        assert_eq!(c.green(), 2.0);
        assert_eq!(c.blue(), 3.0);
    }

    #[test]
    fn test_from_color() {
        let c = Color::new(1.0, 2.0, 3.0);
        let c2 = Color::from_color(&c);
        assert_eq!(c.red(), c2.red());
        assert_eq!(c.green(), c2.green());
        assert_eq!(c.blue(), c2.blue());
    }

    #[test]
    fn test_add() {
        let c1 = Color::new(1.0, 2.0, 3.0);
        let c2 = Color::new(4.0, 5.0, 6.0);
        let c3 = c1.add(&c2);
        assert_eq!(c3.red(), 5.0);
        assert_eq!(c3.green(), 7.0);
        assert_eq!(c3.blue(), 9.0);
    }

    #[test]
    fn test_sub() {
        let c1 = Color::new(1.0, 2.0, 3.0);
        let c2 = Color::new(4.0, 5.0, 6.0);
        let c3 = c1.sub(&c2);
        assert_eq!(c3.red(), -3.0);
        assert_eq!(c3.green(), -3.0);
        assert_eq!(c3.blue(), -3.0);
    }

    #[test]
    fn test_mul() {
        let c1 = Color::new(1.0, 2.0, 3.0);
        let scalar = 2.0;
        let c3 = c1.mul(scalar);
        assert_eq!(c3.red(), 2.0);
        assert_eq!(c3.green(), 4.0);
        assert_eq!(c3.blue(), 6.0);
    }

    #[test]
    fn test_hadamard_product() {
        let c1 = Color::new(1.0, 2.0, 3.0);
        let c2 = Color::new(4.0, 5.0, 6.0);
        let c3 = c1.hadamard_product(&c2);
        assert_eq!(c3.red(), 4.0);
        assert_eq!(c3.green(), 10.0);
        assert_eq!(c3.blue(), 18.0);
    }
}
