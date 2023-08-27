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
import { defineComponent, onMounted, ref } from 'vue';
import { toggleAndInitializeScene } from '../../helpers/gameUtils';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useStore();
    onMounted(() => {
      const threeContainer = document.getElementById('three-container');
      const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
      if (threeContainer) {
        toggleAndInitializeScene(store.state.gameMode, threeContainer, vueComponents);
      }
    });

    return {
      toggleView: () => {
        const threeContainer = document.getElementById('three-container');
        const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
        if (threeContainer) {
          store.commit('toggleGameMode');
          toggleAndInitializeScene(store.state.gameMode, threeContainer, vueComponents);
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

