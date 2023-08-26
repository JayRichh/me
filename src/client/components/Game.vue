<template>
  <div class="game-container">
    <h1>Game Zone</h1>
    <div id="gameCanvas"></div>
    <button @click="toggleGameMode">Toggle Game Mode</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { io } from "socket.io-client";
import TWEEN from "@tweenjs/tween.js";
import { createFixedScene } from "../scenes/createFixedScene";
import { createOrbitScene } from "../scenes/createOrbitScene";

export default defineComponent({
  name: 'GameComponent',
  setup() {
    const gameMode = ref(false);
    const socket = io();
    let myId = "";
    let timestamp = Date.now();
    const clientCubes: { [id: string]: THREE.Mesh } = {};

    socket.on("connect", function () {
      console.log("connect");
    });
    socket.on("disconnect", function (message: any) {
      console.log("disconnect " + message);
    });
    
    let myObject3D = new THREE.Object3D();
    socket.on("id", (id: any) => {
      myId = id;
      setInterval(() => {
        socket.emit("update", {
          t: Date.now(),
          p: myObject3D.position,
          r: myObject3D.rotation,
        });
      }, 50);
    });
    socket.on("clients", (clients: any) => {
      let pingStatsHtml = "Socket Ping Stats<br/><br/>";
      Object.keys(clients).forEach((p) => {
        timestamp = Date.now();
        pingStatsHtml += p + " " + (timestamp - clients[p].t) + "ms<br/>";
        if (!clientCubes[p]) {
          let geometry = new THREE.BoxGeometry(1, 1, 1); // Define geometry
          let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Define material
          clientCubes[p] = new THREE.Mesh(geometry, material);
          clientCubes[p].name = p;
          myObject3D.add(clientCubes[p]);
        } else {
          if (clients[p].p) {
            new TWEEN.Tween(clientCubes[p].position)
              .to(
                {
                  x: clients[p].p.x,
                  y: clients[p].p.y,
                  z: clients[p].p.z,
                },
                50
              )
              .start();
          }
          if (clients[p].r) {
            new TWEEN.Tween(clientCubes[p].rotation)
              .to(
                {
                  x: clients[p].r._x,
                  y: clients[p].r._y,
                  z: clients[p].r._z,
                },
                50
              )
              .start();
          }
        }
      });
      (document.getElementById("pingStats") as HTMLDivElement).innerHTML =
        pingStatsHtml;
    });
    socket.on("removeClient", (id: string) => {
      scene.remove(scene.getObjectByName(id) as THREE.Object3D);
    });

    const toggleGameMode = () => {
      gameMode.value = !gameMode.value;
      if (gameMode.value) {
        createOrbitScene(/* parameters */);
      } else {
        createFixedScene(/* parameters */);
      }
    };

    onMounted(() => {
      createFixedScene(/* parameters */);
    });

    return {
      toggleGameMode,
    };
  },
});
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 16px;
}

#gameCanvas {
  width: 100%;
  height: 400px;
  background-color: #000;
}

button {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>
