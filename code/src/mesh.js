import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Config from './config';

class Mesh {
  constructor() {
    this.loader = new GLTFLoader();
    this.meshes = {};
  }

  async build() {
    for (const object in Config.objects) {
      const mesh = await this.loader.loadAsync(Config.objects[object].objectFile);

      if (!mesh) {
        console.log(`Error while loading mesh for ${object}`);
      }

      this.meshes[`${object}`] = mesh.scene;
    }   
  }
}

export default Mesh;
