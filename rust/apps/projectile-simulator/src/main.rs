use core::canvas::Canvas;
use core::color::Color;
use core::point::Point;
use core::vector::Vector;
use std::fs::File;
use std::io::prelude::*;

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
        position: Point::new(0.0, 32.0, 0.0),
        velocity: Vector::new(3.0, 2.0, 0.0),
    };

    let mut canvas = Canvas::new(800, 320);

    while proj.position.as_tuple().y > 0.0 || proj.velocity.as_tuple().y > 0.0 {
        proj = tick(&env, &proj);
        println!("----------------------------------");
        println!("Position: {}", proj.position.format());
        println!("Velocity: {}", proj.velocity.format());
        let x = proj.position.as_tuple().x as usize;
        let y = canvas.height - proj.position.as_tuple().y as usize;
        if x < canvas.width && y < canvas.height {
            canvas.write_pixel(x, y, Color::new(1.0, 1.0, 1.0));
        }
    }
    let mut file = File::create("projectile.ppm").unwrap();
    file.write_all(canvas.to_ppm().as_bytes()).unwrap();
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
