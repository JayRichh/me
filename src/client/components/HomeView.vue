<template>
  <div id="home-container">
    <div id="three-container"></div>
    <button @click="toggleView">Toggle View</button>
    <div id="three-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { initThreeJS } from '../../helpers/threeHelpers';
import { createOrbitScene } from '../scenes/createOrbitScene';
import { createFixedScene } from '../scenes/createFixedScene';
import { io } from 'socket.io-client';

const socket = io();

export default defineComponent({
  name: 'HomeView',
  setup() {
    const scene = ref(new THREE.Scene());
    const camera = ref(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
    const renderer = ref(new THREE.WebGLRenderer());
    const controls = ref(new OrbitControls(camera.value, renderer.value.domElement));
    const clientCubes = ref<{ [id: string]: THREE.Mesh }>({});
    const isOrbit = ref(false);

    onMounted(async () => {
      initThreeJS(scene.value, clientCubes.value);
      const threeContainer = document.getElementById('three-container');
      if (!threeContainer) throw new Error("Failed to get the three-container element");
      renderer.value.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
      threeContainer.appendChild(renderer.value.domElement);
      
      // Import Vue components
      const AboutComponent = (await import('../components/About.vue')).default;
      const ContactComponent = (await import('../components/Contact.vue')).default;
      const ProjectsComponent = (await import('../components/Projects.vue')).default;
      const vueComponents = [AboutComponent, ContactComponent, ProjectsComponent];
      renderScene();
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

    const renderScene = async () => {
      const threeContainer = document.getElementById('three-container');
      if (!threeContainer) throw new Error("Failed to get the three-container element");
      // Import Vue components
      const AboutComponent = (await import('../components/About.vue')).default;
      const ContactComponent = (await import('../components/Contact.vue')).default;
      const ProjectsComponent = (await import('../components/Projects.vue')).default;
      const vueComponents = [AboutComponent, ContactComponent, ProjectsComponent];
      if (isOrbit.value) {
        createOrbitScene(threeContainer, vueComponents.map(component => component.$el));
      } else {
        createFixedScene(threeContainer, vueComponents.map(component => component.$el));
      }
    };

    const toggleView = () => {
    isOrbit.value = !isOrbit.value;
    socket.emit('toggleView', { view: isOrbit.value ? 'orbit' : 'fixed' });
    renderScene();
    };

    return {
      scene,
      camera,
      renderer,
      controls,
      onWindowResize,
      render,
      renderScene,
      toggleView,
    };
  },
});
</script>

<style scoped>
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
