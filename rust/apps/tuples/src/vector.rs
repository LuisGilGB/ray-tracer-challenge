struct Vector {
  x: f64,
  y: f64,
  z: f64,
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
}
