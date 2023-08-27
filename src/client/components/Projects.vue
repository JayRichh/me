<template>
  <div class="vue-component scene-item projects-card">
    <h1>Projects</h1>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <a :href="project.url" target="_blank">{{ project.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProjectsComponent",
  setup() {
    const projects = ref([
      { id: 1, name: "Project 1", url: "https://example.com/project1" },
      { id: 2, name: "Project 2", url: "https://example.com/project2" },
      { id: 3, name: "Project 3", url: "https://example.com/project3" },
    ]);

    return {
      projects,
    };
  },
});
</script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 16px;
}

.project-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  height: auto;
  border-radius: 4px;
}

h2 {
  margin: 8px 0;
}

p {
  margin: 4px 0;
}

a {
  color: #007bff;
  text-decoration: none;
}
</style>
