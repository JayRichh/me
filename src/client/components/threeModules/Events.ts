import { Scene, Raycaster, Vector2, Object3D, Camera } from "three";
import * as THREE from "three";
import { eventsEmitter } from "../../sockets/socketClient";
import TWEEN from "@tweenjs/tween.js";
import type { ClientData } from "../../../helpers/gameUtils";
import BaseScene from "./BaseScene";

/**
 * The Events class handles all the events related to the 3D scene.
 * It uses a raycaster for detecting mouse interactions and emits events for client updates.
 * It also handles the removal of clients from the scene.
 */
export class Events {
  scene: BaseScene;
  raycaster: Raycaster;
  mouse: Vector2;

  /**
   * The constructor initializes the raycaster and mouse vector.
   * It also sets up event listeners for client updates and removals.
   * @param scene - The 3D scene.
   * @param clientCubes - A record of client meshes indexed by their ids.
   */
  constructor(scene: Scene, clientCubes: Record<string, THREE.Mesh>) {
    this.scene = scene as unknown as BaseScene;
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();

    eventsEmitter.on("removeClient", (id: string) => {
      const cube = clientCubes[id];
      if (cube) {
        scene.remove(cube);
        delete clientCubes[id];
      }
    });

    eventsEmitter.on("updateClients", (clients: Record<string, ClientData>) => {
      Object.entries(clients).forEach(([id, clientData]) => {
        let cube = clientCubes[id];
        if (!cube) {
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          cube = new THREE.Mesh(geometry, material);
          cube.name = id;
          scene.add(cube);
          clientCubes[id] = cube;
        }
        if (clientData.p) {
          new TWEEN.Tween(cube.position).to(clientData.p, 50).start();
        }
        if (clientData.r) {
          new TWEEN.Tween(cube.rotation).to(clientData.r, 50).start();
        }
      });
    });
  }

  /**
   * Updates the mouse vector based on the mouse move event.
   * @param event - The mouse move event.
   */
  onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  /**
   * Checks for intersections of the raycaster with the scene's children.
   * @param camera - The camera from which the raycaster is set.
   * @returns An array of intersected objects.
   */
  checkIntersects(camera: THREE.Camera): THREE.Intersection[] {
    this.raycaster.setFromCamera(this.mouse, camera);
    return this.raycaster.intersectObjects(this.scene.scene.children);
  }
}
