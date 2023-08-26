<template>
  <div id="home-container">
    <div id="three-container"></div>
    <!-- ...other cards -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createFixedScene } from "../scenes/createFixedScene";

export default defineComponent({
  name: 'HomeView',
  setup() {
    const scene = ref(new THREE.Scene());
    const camera = ref(new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ));
    const renderer = ref(new THREE.WebGLRenderer());
    const controls = ref(new OrbitControls(camera.value, renderer.value.domElement));

    onMounted(() => {
      renderer.value.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.value.domElement);
      window.addEventListener("resize", onWindowResize, false);
    });

    const onWindowResize = () => {
      camera.value.aspect = window.innerWidth / window.innerHeight;
      camera.value.updateProjectionMatrix();
      renderer.value.setSize(window.innerWidth, window.innerHeight);
      render();
    };

    const render = () => {
      renderer.value.render(scene.value, camera.value);
    };

    return {
      scene,
      camera,
      renderer,
      controls,
      onWindowResize,
      render
    };
  },
});
</script>

<style scoped></style>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 16px;
}

p {
  color: #666;
  margin-bottom: 8px;
}

.scroll-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fas {
  font-size: 24px;
  margin-top: 8px;
}
</style>
