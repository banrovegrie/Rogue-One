import * as THREE from 'three';
import Mesh from './mesh'
import Background from './background'
import Input from './input'
import Player from './player'
import Enemy from './enemy'
import Config from './config'

class Game {
  constructor() {
    this.playerVelocityX = 0;
    this.playerVelocityY = 0;
  }

  async init() {
    /* Setup */
    this.setCamera();
    this.setScene();
    this.setRenderer();

    /* Background */
    this.background = new Background();
    await this.background.build();
    this.scene.add(this.background.stars);

    /* Meshes */
    this.mesh = new Mesh();
    await this.mesh.build();

    /* Player */
    this.player = new Player(
      this.mesh.meshes.player,
      this,
    );

    /* Enemies */
    this.enemy = new Enemy(
      this.mesh.meshes.enemy,
      this,
    );
    this.enemy.addEnemy();
    this.enemy.addEnemy(-1.5, 1.5);
    this.enemy.addEnemy(1.5, 1.5);

    /* Add light */
    this.addLight();

    /* Setup input */
    this.inputCon = new Input();

    document.body.appendChild(this.renderer.domElement);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  setScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('black');
  }

  setCamera() {
    const cameraSettings = Config.camera.cameraSettings;
    this.camera = new THREE.PerspectiveCamera(
      cameraSettings.cameraFov,
      cameraSettings.cameraAspect,
      cameraSettings.cameraNear,
      cameraSettings.cameraFar
    );

    const position = Config.camera.position;
    this.camera.position.x = position.x;
    this.camera.position.y = position.y;
    this.camera.position.z = position.z;

    const lookAt = Config.camera.lookAt;
    this.camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
  }

  addLight() {
    const color = 0xFFFFFF;
    const intensity = 1;

    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 2, 0);

    this.scene.add(light);
  }

  render(time) {
    if (this.player) {
      this.player.update(time);
    }

    if (this.enemy) {
      this.enemy.update();
    }

    if (this.background) {
      this.background.update();
    }

    /* Render */
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.render.bind(game));
  }
}

const game = new Game();
game.init();
requestAnimationFrame(game.render.bind(game));
