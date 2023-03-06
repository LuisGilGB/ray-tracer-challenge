use core::point::Point;
use core::vector::Vector;

struct Projectile {
    position: Point,
    velocity: Vector,
}

struct Environment {
    gravity: Vector,
    wind: Vector,
}

fn tick(env: &Environment, proj: &Projectile) -> Projectile {
    let position = proj.position.add_vector(&proj.velocity);
    let velocity = proj.velocity.add(&env.gravity).add(&env.wind);
    Projectile { position, velocity }
}

fn main() {
    let env = Environment {
        gravity: Vector::new(0.0, -0.1, 0.0),
        wind: Vector::new(-0.01, 0.0, 0.0),
    };
    let mut proj = Projectile {
        position: Point::new(0.0, 1.0, 0.0),
        velocity: Vector::new(1.0, 1.8, 0.0),
    };

    while proj.position.as_tuple().y > 0.0 || proj.velocity.as_tuple().y > 0.0 {
        proj = tick(&env, &proj);
        println!("----------------------------------");
        println!("Position: {}", proj.position.format());
        println!("Velocity: {}", proj.velocity.format());
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use core::tuple::CoordValue;

    const EPSILON: CoordValue = 0.0001;

    #[test]
    fn test_tick() {
        let env = Environment {
            gravity: Vector::new(0.0, -0.1, 0.0),
            wind: Vector::new(-0.01, 0.0, 0.0),
        };
        let proj = Projectile {
            position: Point::new(0.0, 1.0, 0.0),
            velocity: Vector::new(1.0, 1.8, 0.0),
        };
        let proj = tick(&env, &proj);
        assert!((proj.position.x() - 1.0).abs() < EPSILON);
        assert!((proj.position.y() - 2.8).abs() < EPSILON);
        assert!((proj.position.z() - 0.0).abs() < EPSILON);
        assert!((proj.velocity.x() - 0.99).abs() < EPSILON);
        assert!((proj.velocity.y() - 1.7).abs() < EPSILON);
        assert!((proj.velocity.z() - 0.0).abs() < EPSILON);
    }
}
