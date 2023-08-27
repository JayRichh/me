import * as THREE from 'three';
import TWEEN from "@tweenjs/tween.js";
import { eventsEmitter } from '../client/sockets/socketClient';

interface ClientData {
  p?: { x: number; y: number; z: number };
  r?: { _x: number; _y: number; _z: number };
}

export const initThreeJS = (scene: THREE.Scene, clientCubes: Record<string, THREE.Mesh>) => {
  const gridHelper = new THREE.GridHelper(10, 10);
  gridHelper.position.y = -0.5;
  scene.add(gridHelper);

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
};
