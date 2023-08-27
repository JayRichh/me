<template>
  <div id="game-container">
    <div id="three-container"></div>
    <button @click="toggleGameMode">
      <i class="fas fa-toggle-on"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { createOrbitScene } from '../scenes/createOrbitScene';
import { createFixedScene } from '../scenes/createFixedScene';
import { toggleGameMode as toggleGameModeHelper } from '../../helpers/toggleGameMode';

export default defineComponent({
  name: 'Game',
  setup() {
    const gameMode = ref(false);

    const toggleGameMode = () => {
      gameMode.value = !gameMode.value;
      const threeContainer = document.getElementById('three-container');
      const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
      if (threeContainer) {
        if (gameMode.value) {
          createOrbitScene(threeContainer, vueComponents);
        } else {
          createFixedScene(threeContainer, vueComponents);
        }
      } else {
        console.error('threeContainer element not found');
      }
    };

    onMounted(() => {
      const threeContainer = document.getElementById('three-container');
      const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
      if (threeContainer) {
        createFixedScene(threeContainer, vueComponents);
      }
    });

    return {
      toggleGameMode,
    };
  },
});
</script>

<style scoped>
#game-container {
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
</style>

