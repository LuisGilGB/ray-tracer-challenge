import {Transform3D} from 'core';
import {PhongMaterial} from 'material';
import Shape from './Shape';

class TestShape extends Shape {
  constructor(params?: {material?: PhongMaterial; transform?: Transform3D}) {
    super(params);
    Object.freeze(this);
  }

  clone(): TestShape {
    return new TestShape({
      material: this.material,
      transform: this.selfTransform,
    });
  }

  cloneWith(params: {
    material?: PhongMaterial;
    transform?: Transform3D;
  }): TestShape {
    return new TestShape({
      material: params.material ?? this.material,
      transform: params.transform ?? this.selfTransform,
    });
  }
}

export default TestShape;
