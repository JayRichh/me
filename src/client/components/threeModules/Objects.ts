import * as THREE from "three";

/**
 * The Objects class is responsible for creating and managing the objects in the scene.
 * It creates a cube and adds it to the scene and clientCubes record.
 */
export class Objects {
  /**
   * The constructor takes a THREE.Scene object and a Record of clientCubes as parameters.
   * It creates a cube, adds it to the scene and clientCubes record.
   * @param scene - The scene to which the cube will be added.
   * @param clientCubes - The record of clientCubes to which the cube will be added.
   */
  constructor(scene: THREE.Scene, clientCubes: Record<string, THREE.Mesh>) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    clientCubes["player"] = cube;
  }

  // Placeholder for future methods
}
