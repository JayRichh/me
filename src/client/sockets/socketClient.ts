import { io, Socket } from "socket.io-client";
import * as THREE from "three";
import { EventEmitter } from 'events';
import TWEEN from "@tweenjs/tween.js";

const UPDATE_INTERVAL = 50;
const socket: Socket = io();
const myObject3D = new THREE.Object3D();
const clientCubes: { [id: string]: THREE.Mesh } = {};
let myId: string = "";
const eventsEmitter = new EventEmitter();

socket.on("connect", () => {
  console.log("Connected");
});

socket.on("disconnect", (message: string) => {
  console.log(`Disconnected: ${message}`);
});

socket.on("id", (id: string) => {
  myId = id;
  setInterval(() => emitUpdate(), UPDATE_INTERVAL);
});

socket.on("clients", (clients: Record<string, any>) => {
  updateClients(clients);
});

socket.on("removeClient", (id: string) => {
  eventsEmitter.emit("removeClient", id);
});

const emitUpdate = () => {
  socket.emit("update", {
    t: Date.now(),
    p: myObject3D.position,
    r: myObject3D.rotation,
  });
};

const updateClients = (clients: Record<string, any>) => {
  let pingStatsHtml = "Socket Ping Stats<br/><br/>";
  Object.keys(clients).forEach((id) => {
    const timestamp = Date.now();
    pingStatsHtml += `${id} ${timestamp - clients[id].t}ms<br/>`;
    updateClientCube(id, clients[id]);
  });
  (document.getElementById("pingStats") as HTMLDivElement).innerHTML = pingStatsHtml;
};

const updateClientCube = (id: string, clientData: any) => {
  if (!clientCubes[id]) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    clientCubes[id] = new THREE.Mesh(geometry, material);
    clientCubes[id].name = id;
    myObject3D.add(clientCubes[id]);
  } else {
    if (clientData.p) {
      new TWEEN.Tween(clientCubes[id].position)
        .to(
          {
            x: clientData.p.x,
            y: clientData.p.y,
            z: clientData.p.z,
          },
          UPDATE_INTERVAL
        )
        .start();
    }
    if (clientData.r) {
      new TWEEN.Tween(clientCubes[id].rotation)
        .to(
          {
            x: clientData.r._x,
            y: clientData.r._y,
            z: clientData.r._z,
          },
          UPDATE_INTERVAL
        )
        .start();
    }
  }
};

export { socket, eventsEmitter };