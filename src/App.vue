<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <div id="pingStats"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { createScene } from "./client/scenes/createScene";
import store from "./store/index";
import Navbar from "./components/Navbar.vue";

type FocusItem = "about" | "projects" | "contact" | "default";

export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();
    const focusItem = (route.name || "home").toString();

    onMounted(() => {
      nextTick(() => {
        const threeContainer = document.getElementById("app");
        const navbarElement = document.getElementById("navbar");
        const homeViewElement = document.getElementById("home-container");

        if (threeContainer && navbarElement && homeViewElement) {
          createScene({
            container: threeContainer,
            vueComponents: [navbarElement, homeViewElement],
            clientCubes: {},
            focusItem: focusItem as FocusItem,
          });
        }
      });
    });
  },
});
</script>

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
