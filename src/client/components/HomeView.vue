<template>
  <div id="home-container" class="three-container">
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
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { setFixedView } from '../scenes/createFixedScene';
import { toggleAndInitializeScene } from '../../helpers/gameUtils';

export default defineComponent({
  name: 'HomeView',
  setup() {
    let store = useStore();
    let route = useRoute();
    let focusItem = ref(route.name || 'home').toString();

    watch(route, (newRoute) => {
      focusItem = (newRoute.name as any) || 'home';
      adjustScene();
    });

    const adjustScene = () => {
      const threeContainer = document.getElementById('three-container');
      const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
      if (threeContainer && vueComponents.length > 0) {
        setFixedView(threeContainer, vueComponents, focusItem);
      }
    };

    onMounted(() => {
      adjustScene();
    });

    return {
      toggleView: () => {
        const threeContainer = document.getElementById('three-container');
        const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
        if (threeContainer) {
          store.commit('toggleGameMode');
          toggleAndInitializeScene(store.state.gameMode, threeContainer, vueComponents, focusItem);
        }
      },
      toggleControls: () => {
        store.commit('toggleControlsMode');
        adjustScene();
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

