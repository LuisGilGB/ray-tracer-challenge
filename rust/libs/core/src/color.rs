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
        assert_eq!(c.tuple.x, 1.0);
        assert_eq!(c.tuple.y, 2.0);
        assert_eq!(c.tuple.z, 3.0);
    }

    #[test]
    fn test_from() {
        let t = Tuple::new(1.0, 2.0, 3.0);
        let c = Color::from(t);
        assert_eq!(c.tuple.x, 1.0);
        assert_eq!(c.tuple.y, 2.0);
        assert_eq!(c.tuple.z, 3.0);
    }

    #[test]
    fn test_from_array() {
        let c = Color::from_array([1.0, 2.0, 3.0]);
        assert_eq!(c.tuple.x, 1.0);
        assert_eq!(c.tuple.y, 2.0);
        assert_eq!(c.tuple.z, 3.0);
    }

    #[test]
    fn test_from_tuple() {
        let c = Color::from_tuple((1.0, 2.0, 3.0));
        assert_eq!(c.tuple.x, 1.0);
        assert_eq!(c.tuple.y, 2.0);
        assert_eq!(c.tuple.z, 3.0);
    }

    #[test]
    fn test_from_color() {
        let c = Color::new(1.0, 2.0, 3.0);
        let c2 = Color::from_color(&c);
        assert_eq!(c.tuple.x, c2.tuple.x);
        assert_eq!(c.tuple.y, c2.tuple.y);
        assert_eq!(c.tuple.z, c2.tuple.z);
    }
}
