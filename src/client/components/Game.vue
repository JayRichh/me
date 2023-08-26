<template>
  <div class="game-container">
    <h1>Game Zone</h1>
    <div id="gameCanvas"></div>
    <button @click="toggleGameMode">Toggle Game Mode</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import TWEEN from "@tweenjs/tween.js";
import { socket, eventsEmitter } from '../sockets/socketClient';
import { initThreeJS } from '../../helpers/threeHelpers';

export default defineComponent({
  name: 'GameComponent',
  setup() {
    const scene = ref(new THREE.Scene());
    const camera = ref(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    const renderer = ref(new THREE.WebGLRenderer());
    const controls = ref(new OrbitControls(camera.value, renderer.value.domElement));
    const clientCubes = ref<{ [id: string]: THREE.Mesh }>({});
    const stats = new Stats();
    const gui = new GUI();

    const gameMode = ref(false);

    camera.value.position.z = 4;

    const toggleGameMode = () => {
      gameMode.value = !gameMode.value;
    };

    // GUI setup
    const cubeFolder = gui.addFolder("Cube");
    const cubePositionFolder = cubeFolder.addFolder("Position");
    cubePositionFolder.add(camera.value.position, "x", -5, 5);
    cubePositionFolder.add(camera.value.position, "z", -5, 5);
    cubePositionFolder.open();

    // Event listeners
    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
      camera.value.aspect = window.innerWidth / window.innerHeight;
      camera.value.updateProjectionMatrix();
      renderer.value.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.value.update();
      TWEEN.update();
      render();
      stats.update();
    };

    // Render function
    const render = () => {
      renderer.value.render(scene.value, camera.value);
    };

    onMounted(() => {
      initThreeJS(scene.value, clientCubes.value);
      const gameCanvas = document.getElementById('gameCanvas');
      if (gameCanvas) {
        renderer.value.setSize(gameCanvas.clientWidth, gameCanvas.clientHeight);
        gameCanvas.appendChild(renderer.value.domElement);
      }
      eventsEmitter.on("removeClient", id => {
        const objectToRemove = scene.value.getObjectByName(id);
        if (objectToRemove) {
          scene.value.remove(objectToRemove);
        }
      });
      animate();
    });

    onBeforeUnmount(() => {
      eventsEmitter.off("removeClient", removeClient);
    });

    const removeClient = (...args: any[]) => {
      const id = args[0];
      if (typeof id !== 'string') {
        throw new Error('Expected first argument to be a string');
      }
      if (clientCubes.value[id]) {
        scene.value.remove(clientCubes.value[id]);
        delete clientCubes.value[id];
      }
    };

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
