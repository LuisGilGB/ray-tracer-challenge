use crate::color::Color;

pub struct Canvas {
    pub width: usize,
    pub height: usize,
    pub pixels: Vec<Color>,
}

impl Canvas {
    pub fn new(width: usize, height: usize) -> Canvas {
        Canvas {
            width,
            height,
            pixels: vec![Color::new(0.0, 0.0, 0.0); width * height],
        }
    }

    pub fn pixel_at(&self, x: usize, y: usize) -> Color {
        self.pixels[y * self.width + x].clone()
    }

    pub fn write_pixel(&mut self, x: usize, y: usize, color: Color) {
        self.pixels[y * self.width + x] = color;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let c = Canvas::new(10, 20);
        assert_eq!(c.width, 10);
        assert_eq!(c.height, 20);
        assert_eq!(c.pixels.len(), 200);
        assert_eq!(c.pixels[0], Color::new(0.0, 0.0, 0.0));
    }

    #[test]
    fn test_write_pixel() {
        let mut c = Canvas::new(10, 20);
        let red = Color::new(1.0, 0.0, 0.0);
        c.write_pixel(2, 3, red.clone());
        assert_eq!(c.pixel_at(2, 3), red);
    }
}
