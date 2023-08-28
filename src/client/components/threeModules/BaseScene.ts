/**
 * BaseScene class is responsible for setting up the Three.js scene, camera, renderer and controls.
 * It provides methods to add the renderer to a container, set the camera position, set the controls and animate the scene.
 * This class is used in the createScene.ts file to create and manage the Three.js scene for the web application.
 */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Player } from "./Player";
import { StaticObjects } from "./StaticObjects";

export default class BaseScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls | null;

  /**
   * Constructor for the BaseScene class.
   * Initializes the scene, camera, renderer and controls.
   */
  constructor(clientCubes: Record<string, THREE.Mesh>) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.controls = null;
  }

  /**
   * Adds the renderer to the provided container.
   * @param container - The HTML element to which the renderer will be added.
   */
  addToContainer(container: HTMLElement) {
    container.appendChild(this.renderer.domElement);
  }

  /**
   * Sets the camera position based on the provided focus item.
   * @param focusItem - The item on which the camera should focus.
   */
  setCameraPosition(focusItem: string) {
    const positions: Record<string, [number, number, number]> = {
      about: [0, 2, 5],
      projects: [0, 4, 5],
      contact: [0, 6, 5],
      default: [0, 0, 5],
    };
    this.camera.position.set(...positions[focusItem]);
  }

  /**
   * Sets the controls for the scene.
   * @param controls - The controls to be set for the scene.
   */
  setControls(controls: OrbitControls | null) {
    this.controls = controls;
  }

  /**
   * Animates the scene by updating the controls and rendering the scene.
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
  }
}
