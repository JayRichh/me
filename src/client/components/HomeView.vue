<template>
  <div id="home-container">
    <div id="three-container"></div>
    <button @click="toggleView">
      <i class="fas fa-eye"></i>
    </button>
    <div class="vue-component scene-item about-card">
      <AboutComponent />
    </div>
    <div class="vue-component scene-item projects-card">
      <ProjectsComponent />
    </div>
    <div class="vue-component scene-item contact-card">
      <ContactComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createOrbitScene } from '../scenes/createOrbitScene';
import { createFixedScene } from '../scenes/createFixedScene';
import AboutComponent from './About.vue';
import ProjectsComponent from './Projects.vue';
import ContactComponent from './Contact.vue';
import { toggleGameMode } from '../../helpers/gameUtils';
import { useStore } from 'vuex';

type ControlsType = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls | null;
};

export default defineComponent({
  name: 'HomeView',
  components: {
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
  },
  setup() {
    const store = useStore();
    const isOrbit = ref(false);
    const controls = ref<ControlsType>({
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(),
      renderer: new THREE.WebGLRenderer(),
      controls: null,
    });
    const gameMode = ref(false);

    const initializeScene = () => {
      const threeContainer = document.getElementById('three-container');
      const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
      if (threeContainer) {
        controls.value = isOrbit.value ? createOrbitScene(threeContainer, vueComponents) : createFixedScene(threeContainer, vueComponents);
      }
    };

    onMounted(initializeScene);

    onBeforeUnmount(() => {
      if (controls.value && controls.value.controls) {
        controls.value.controls.dispose();
      }
    });

    return {
      toggleView: () => {
        const threeContainer = document.getElementById('three-container');
        const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
        if (threeContainer) {
          store.commit('toggleGameMode');
          if (store.state.gameMode) {
            createOrbitScene(threeContainer, vueComponents);
          } else {
            createFixedScene(threeContainer, vueComponents);
          }
        }
      },
    };
  },
});
</script>

<style scoped>
#home-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

#three-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.vue-component {
  position: absolute;
  width: 300px;
  height: 200px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#about-card {
  top: 50px;
  left: 50px;
}

#projects-card {
  top: 50px;
  right: 50px;
}

#contact-card {
  bottom: 50px;
  left: 50px;
}
</style>

