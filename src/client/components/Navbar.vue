<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="path/to/logo.png" alt="Logo">
      </a>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/about">About</router-link>
        <router-link class="navbar-item" to="/projects">Projects</router-link>
        <router-link class="navbar-item" to="/contact">Contact</router-link>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <button @click="toggleGameMode">Toggle Game Mode</button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createOrbitScene } from '../scenes/createOrbitScene';
import { createFixedScene } from '../scenes/createFixedScene';

export default defineComponent({
  name: 'NavbarComponent',
  setup() {
    const gameMode = ref(false);

    const toggleGameMode = () => {
      gameMode.value = !gameMode.value;
      const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
      if (gameMode.value) {
        createOrbitScene(document.body, vueComponents);
      } else {
        createFixedScene(document.body, vueComponents);
      }
    };

    return {
      toggleGameMode,
    };
  },
});
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
}

.navbar-brand {
  color: #fff;
  font-size: 24px;
}

.navbar-item {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
}

.navbar-item:hover {
  color: #007bff;
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
