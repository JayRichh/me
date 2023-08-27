<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick } from 'vue';
import Navbar from '@/client/components/Navbar.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { toggleAndInitializeScene } from './helpers/gameUtils';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const focusItem = (route.name || 'home').toString();

    onMounted(() => {
      nextTick(() => {
        const threeContainer = document.getElementById('three-container');
        const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];
        if (threeContainer && vueComponents.length > 0) {
          store.commit('setGameMode', toggleAndInitializeScene(store.state.gameMode, threeContainer, vueComponents, focusItem));
        }
      });
    });
  },
});
</script>
Save to grepper
gameUtils.ts
No changes are needed here since it already accommodates the new focusItem parameter.

createFixedScene.ts
No changes are needed here either, as it already includes the logic for adjusting the camera based on the focusItem.

With these changes, the HUD will be created and managed in Navbar.vue, and the scene will be initialized in App.vue. The helper methods in gameUtils.ts will be used for toggling and initializing the scene, ensuring DRY (Don't Repeat Yourself) methodology.

Would you like to proceed with the next steps?







<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.scene-item {
  position: absolute;
  width: 300px;
  height: 200px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateZ(-500px);
}

.about-card {
  top: 50px;
  left: 50px;
}

.projects-card {
  top: 50px;
  right: 50px;
}

.contact-card {
  bottom: 50px;
  left: 50px;
}

</style>
