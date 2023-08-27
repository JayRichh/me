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
import {
  defineComponent,
  onBeforeUnmount,
  ref,
  computed,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { toggleAndInitializeScene } from "../../helpers/gameUtils";

type FocusItem = "about" | "projects" | "contact" | "default";

export default defineComponent({
  name: "Navbar",
  setup() {
    const router = useRouter();
    const store = useStore();
    let focusItem = computed(() =>
      (router.currentRoute.value.name || "home").toString()
    ) as any;

    const toggleGameMode = () => {
      store.commit("toggleGameMode");
      const threeContainer = document.getElementById("three-container");
      const vueComponents = Array.from(
        document.querySelectorAll(".vue-component")
      ) as HTMLElement[];
      if (threeContainer && vueComponents.length > 0) {
        toggleAndInitializeScene(store.state.gameMode, {
          container: threeContainer,
          vueComponents,
          clientCubes: {},
          hudElement: null,
          focusItem: focusItem as FocusItem,
        });
      }
    };

    const navigateTo = (route: string) => {
      router.push({ name: route });
    };

    onMounted(() => {
      const hudElement = document.getElementById("navbar-hud");
      if (hudElement) {
        store.commit("setHUD", hudElement);
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
