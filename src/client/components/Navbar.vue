<template>
  <div id="navbar-hud">
    <button class="hud-button game-button" @click="toggleGameMode">
      <i class="fas fa-gamepad"></i>
    </button>
    <button class="hud-button home-button" @click="navigateTo('home')">
      <i class="fas fa-home"></i>
    </button>
    <button class="hud-button about-button" @click="navigateTo('about')">
      <i class="fas fa-user"></i>
    </button>
    <button class="hud-button projects-button" @click="navigateTo('projects')">
      <i class="fas fa-briefcase"></i>
    </button>
    <button class="hud-button contact-button" @click="navigateTo('contact')">
      <i class="fas fa-envelope"></i>
    </button>
  </div>
</template>


<script lang="ts">
import { defineComponent, onBeforeUnmount, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useStore } from 'vuex';
import {CSS3DRenderer, CSS3DSprite, CSS3DObject} from 'three-css3d';
import router from '@/router';
import { toggleAndInitializeScene } from '@/helpers/gameUtils';

type ControlsType = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls | null;
};

export default defineComponent({
  name: 'Navbar',
  setup() {
    const store = useStore();
    const hudElement = ref<HTMLElement | null>(null);

    const createHUD = (hudElement: HTMLElement) => {
      const hud = new CSS3DObject(hudElement);
      return hud;
    };

    onMounted(() => {
      hudElement.value = document.getElementById('navbar-hud');
      if (hudElement.value) {
        const hud = createHUD(hudElement.value);
        store.commit('setHUD', hud);
      }
    });

    return {
      toggleGameMode: () => {
        const threeContainer = document.getElementById('three-container');
        const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
        if (threeContainer) {
          store.commit('toggleGameMode');
          toggleAndInitializeScene(store.state.gameMode, threeContainer, vueComponents);
        }
      },
      navigateTo: (route: string) => {
        router.push({ name: route });
      }
    };
  },
});

</script>
