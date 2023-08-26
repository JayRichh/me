import * as THREE from 'three';
import TWEEN from "@tweenjs/tween.js";
import { eventsEmitter } from '../client/sockets/socketClient';

export const initThreeJS = (scene: THREE.Scene, clientCubes: { [id: string]: THREE.Mesh }) => {
  // Initialize Grid Helper
  const gridHelper = new THREE.GridHelper(10, 10);
  gridHelper.position.y = -0.5;
  scene.add(gridHelper);

  // Subscribe to removeClient event
  eventsEmitter.on("removeClient", (id: string) => {
    if (clientCubes[id]) {
      scene.remove(clientCubes[id]);
      delete clientCubes[id];
    }
  });

  // Subscribe to updateClients event
  eventsEmitter.on("updateClients", (clients: any) => {
    Object.keys(clients).forEach((id) => {
      if (!clientCubes[id]) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        clientCubes[id] = new THREE.Mesh(geometry, material);
        clientCubes[id].name = id;
        scene.add(clientCubes[id]);
      }

      if (clients[id].p) {
        new TWEEN.Tween(clientCubes[id].position)
          .to(
            {
              x: clients[id].p.x,
              y: clients[id].p.y,
              z: clients[id].p.z,
            },
            50
          )
          .start();
      }

      if (clients[id].r) {
        new TWEEN.Tween(clientCubes[id].rotation)
          .to(
            {
              x: clients[id].r._x,
              y: clients[id].r._y,
              z: clients[id].r._z,
            },
            50
          )
          .start();
      }
    });
  });
};
