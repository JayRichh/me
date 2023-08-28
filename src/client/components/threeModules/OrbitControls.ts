import { PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls as ThreeOrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Class to manage the OrbitControls of the Three.js scene.
 * It allows to enable or disable the zoom, rotate and pan controls.
 */
export class OrbitControls {
  controls: ThreeOrbitControls;

  /**
   * Constructs the OrbitControls object.
   * @param camera - The camera of the scene.
   * @param renderer - The renderer of the scene.
   */
  constructor(camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.controls = new ThreeOrbitControls(camera, renderer.domElement);
  }

  /**
   * Enables the zoom, rotate and pan controls.
   */
  enableOrbitControls() {
    this.controls.enableZoom = true;
    this.controls.enableRotate = true;
    this.controls.enablePan = true;
  }

  /**
   * Disables the zoom, rotate and pan controls.
   */
  disableOrbitControls() {
    this.controls.enableZoom = false;
    this.controls.enableRotate = false;
    this.controls.enablePan = false;
  }

  // Placeholder for future methods
}
