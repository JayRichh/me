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

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
  nextTick(() => {
    const hudElement = document.getElementById('navbar-hud');
    if (hudElement) {
      store.commit('setHUD', hudElement);
    }
  });
});
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
