<template>
  <div class="game-container">
    <h1>Game Zone</h1>
    <div id="gameCanvas"></div>
    <button @click="toggleGameMode">Toggle Game Mode</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { createOrbitScene } from '../scenes/createOrbitScene';
import { createFixedScene } from '../scenes/createFixedScene';
import { toggleGameMode } from '../../helpers/toggleGameMode';

export default defineComponent({
  name: 'GameComponent',
  setup() {
    const gameMode = ref(false);
    
    const toggle = () => {
      toggleGameMode();
    };

    const toggleGameMode = () => {
      gameMode.value = !gameMode.value;
      const gameCanvas = document.getElementById('gameCanvas');
      const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
      if (gameCanvas) {
        if (gameMode.value) {
          createOrbitScene(gameCanvas, vueComponents);
        } else {
          createFixedScene(gameCanvas, vueComponents);
        }
      } else {
        console.error('gameCanvas element not found');
      }
    };

    onMounted(() => {
      const gameCanvas = document.getElementById('gameCanvas');
      const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
      if (gameCanvas) {
        createFixedScene(gameCanvas, vueComponents);
      }
    });

    return {
      toggleGameMode,
      toggle,
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
