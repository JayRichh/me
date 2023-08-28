import * as THREE from "three";

export class Player {
  constructor(scene: THREE.Scene, clientCubes: Record<string, THREE.Mesh>) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    clientCubes["player"] = cube;
  }
}
