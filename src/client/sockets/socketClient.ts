import { io, Socket } from "socket.io-client";
import * as THREE from "three";
import { EventEmitter } from "events";
import TWEEN from "@tweenjs/tween.js";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const UPDATE_INTERVAL = 50;
const socket: Socket = io();
const myObject3D = new THREE.Object3D();
const clientCubes: { [id: string]: THREE.Mesh } = {};
let myId = "";
const eventsEmitter = new EventEmitter();
let controls: OrbitControls;

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
  const hudElement = document.getElementById("hud-element") as HTMLElement;
  const homeViewElement = document.getElementById(
    "home-view-element"
  ) as HTMLElement;
  if (!hudElement || !homeViewElement) {
    return;
  }
  updateClients(clients, hudElement, homeViewElement);
});

socket.on("removeClient", (id: string) => {
  eventsEmitter.emit("removeClient", id);
});

export const setControls = (newControls: OrbitControls) => {
  controls = newControls;
};

window.addEventListener("mousemove", () => {
  if (controls) {
    socket.emit("updateCamera", {
      position: controls.object.position,
      rotation: controls.object.rotation,
    });
  }
});

window.addEventListener("mouseup", () => {
  if (controls) {
    socket.emit("updateCamera", {
      position: controls.object.position,
      rotation: controls.object.rotation,
    });
  }
});

const emitUpdate = () => {
  socket.emit("update", {
    t: Date.now(),
    p: myObject3D.position,
    r: myObject3D.rotation,
  });
};

const updateClients = (
  clients: Record<string, any>,
  hudElement: HTMLElement,
  homeViewElement: HTMLElement
) => {
  let pingStatsHtml = "Socket Ping Stats<br/><br/>";
  Object.keys(clients).forEach((id) => {
    const timestamp = Date.now();
    pingStatsHtml += `${id} ${timestamp - clients[id].t}ms<br/>`;
    updateClientCube(id, clients[id]);
  });
  (document.getElementById("pingStats") as HTMLDivElement).innerHTML =
    pingStatsHtml;
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

export const updateClientsListener = (
  callback: (
    clients: Record<string, any>,
    hudElement: HTMLElement,
    homeViewElement: HTMLElement
  ) => void
) => {
  socket.on("clients", (clients: Record<string, any>) => {
    const hudElement = document.getElementById("hud-element") as HTMLElement;
    const homeViewElement = document.getElementById(
      "home-view-element"
    ) as HTMLElement;
    if (!hudElement || !homeViewElement) {
      return;
    }

    callback(clients, hudElement, homeViewElement);
  });

  return () => {
    socket.off("clients", callback);
  };
};

export { socket, eventsEmitter };
