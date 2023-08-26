<template>
  <div class="about-container">
    <h1>About Me</h1>
    <p>developer.</p>
    <p>Based in here</p>
    <p>Skills: </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutComponent',
});
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 16px;
}

p {
  color: #666;
  margin-bottom: 8px;
}
</style>
