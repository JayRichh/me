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
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { toggleGameMode } from '../../helpers/toggleGameMode';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const gameMode = ref(false);
    const router = useRouter();
    const threeContainer = document.getElementById('three-container');
    const vueComponents = Array.from(document.querySelectorAll('.vue-component')) as HTMLElement[];

    const navigateTo = (route: string) => {
      router.push({ name: route });
    };

    return {
      toggleGameMode: () => {
        if (threeContainer && vueComponents.length > 0) {
          gameMode.value = toggleGameMode(gameMode.value, threeContainer, vueComponents);
        } else {
          console.error('threeContainer or vueComponents not found');
        }
      },
      navigateTo,
    };
  },
});
</script>

<style scoped>
.hud-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 24px;
  position: relative;
}

.hud-button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}

.hud-button:hover::after {
  visibility: visible;
  transform: scaleX(1);
}

.hud-button:active {
  transform: scale(0.95);
}

#navbar-hud {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 10px;
  gap: 10px;
}
.game-button {
  background-color: #3498db;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.game-button:hover {
  background-color: #2980b9;
}

.game-button:active {
  background-color: #27ae60;
}

.home-button {
  background-color: #2ecc71;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.home-button:hover {
  background-color: #27ae60;
}

.home-button:active {
  background-color: #3498db;
}

.about-button {
  background-color: #9b59b6;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.about-button:hover {
  background-color: #8e44ad;
}

.about-button:active {
  background-color: #2ecc71;
}

.projects-button {
  background-color: #e67e22;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.projects-button:hover {
  background-color: #d35400;
}

.projects-button:active {
  background-color: #3498db;
}

.contact-button {
  background-color: #e74c3c;
  transition: background-color 0.5s ease, color 0.5s ease;
}

.contact-button:hover {
  background-color: #c0392b;
}

.contact-button:active {
  background-color: #3498db;
}

.hud-button::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.5s ease-in-out 0s;
}

.hud-button:hover::after {
  visibility: visible;
  transform: scaleX(1);
}
</style>
