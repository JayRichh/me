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
import { useStore } from 'vuex';
import { toggleAndInitializeScene } from '../../helpers/gameUtils';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const store = useStore();
    const router = useRouter();

    const toggleGameMode = () => {
      store.commit('toggleGameMode');
      
    };

    const navigateTo = (route: string) => {
      router.push({ name: route });
    };

    onMounted(() => {
      const hudElement = document.getElementById('navbar-hud');
      if (hudElement) {
        store.commit('setHUD', hudElement);
      }
    });

    return {
      toggleGameMode,
      navigateTo,
    };
  },
});
</script>

<style scoped>
.hud-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
</style>