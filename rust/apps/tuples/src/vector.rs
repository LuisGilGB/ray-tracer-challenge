struct Vector {
  x: f64,
  y: f64,
  z: f64,
}

impl Vector {
  pub fn from_array(a: [f64; 3]) -> Vector {
    Vector { x: a[0], y: a[1], z: a[2] }
  }

  pub fn from_tuple(t: (f64, f64, f64)) -> Vector {
    Vector { x: t.0, y: t.1, z: t.2 }
  }

  pub fn from_vector(v: &Vector) -> Vector {
    Vector { x: v.x, y: v.y, z: v.z }
  }

  pub fn equals(&self, v: &Vector) -> bool {
    self.x == v.x && self.y == v.y && self.z == v.z
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_works() {
    let p = Vector { x: 1.0, y: 2.0, z: 3.0 };
    assert_eq!(p.x, 1.0);
    assert_eq!(p.y, 2.0);
    assert_eq!(p.z, 3.0);
  }

  #[test]
  fn it_should_create_from_array() {
    let p = Vector::from_array([1.0, 2.0, 3.0]);
    assert_eq!(p.x, 1.0);
    assert_eq!(p.y, 2.0);
    assert_eq!(p.z, 3.0);
  }

  #[test]
  fn it_should_create_from_tuple() {
    let p = Vector::from_tuple((1.0, 2.0, 3.0));
    assert_eq!(p.x, 1.0);
    assert_eq!(p.y, 2.0);
    assert_eq!(p.z, 3.0);
  }

  #[test]
  fn it_should_create_from_another_vector() {
    let p = Vector { x: 1.0, y: 2.0, z: 3.0 };
    let p2 = Vector::from_vector(&p);
    assert_eq!(p.x, p2.x);
    assert_eq!(p.y, p2.y);
    assert_eq!(p.z, p2.z);
  }

  #[test]
  fn it_should_be_equal_to_another_vector_with_the_same_features() {
    let p = Vector { x: 1.0, y: 2.0, z: 3.0 };
    let p2 = Vector { x: 1.0, y: 2.0, z: 3.0 };
    assert!(p.equals(&p2));
  }

  #[test]
  fn it_should_not_be_equal_to_another_vector_with_different_features() {
    let p = Vector { x: 1.0, y: 2.0, z: 3.0 };
    let p2 = Vector { x: 1.0, y: 2.0, z: 4.0 };
    assert!(!p.equals(&p2));
  }
}
