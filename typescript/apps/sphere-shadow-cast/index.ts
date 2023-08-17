import {Canvas} from 'core';
import * as fs from 'fs';

const main = () => {
  const size = 400;
  const canvas = new Canvas(size, size);

  fs.writeFileSync('output.ppm', canvas.toPPM());
};

main();
