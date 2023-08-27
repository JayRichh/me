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
import { defineComponent, onBeforeUnmount, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useStore } from 'vuex';

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
    const gameMode = computed(() => store.state.gameMode);
    const router = useRouter();

    const navigateTo = (route: string) => {
      router.push({ name: route });
    };

    const toggleGameMode = () => {
      store.commit('toggleGameMode');
    };

    onBeforeUnmount(() => {
      if (gameMode.value && gameMode.value.controls) {
        gameMode.value.controls.dispose();
      }
    });

    return {
      gameMode,
      navigateTo,
      toggleGameMode
    };
  },
});
</script>
