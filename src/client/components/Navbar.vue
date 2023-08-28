<template>
  <div id="navbar-hud">
    <router-link :to="{ name: 'toggleGameMode' }">
      <i class="fas fa-gamepad"></i>
    </router-link>
    <router-link :to="{ name: 'home' }">
      <i class="fas fa-home"></i>
    </router-link>
    <router-link :to="{ name: 'about' }">
      <i class="fas fa-user"></i>
    </router-link>
    <router-link :to="{ name: 'projects' }">
      <i class="fas fa-briefcase"></i>
    </router-link>
    <router-link :to="{ name: 'contact' }">
      <i class="fas fa-envelope"></i>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Navbar",
  setup() {
    const router = useRouter();
    const store = useStore();
    let focusItem = computed(() => store.state.focusItem) as any;

    onMounted(() => {
      const hudElement = document.getElementById("navbar-hud") as HTMLElement;
      if (hudElement) {
        store.commit("setHUD", hudElement);
      }
    });

    return {};
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
