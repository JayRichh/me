<template>
  <div class="projects-container">
    <h1>Projects</h1>
    <div v-for="project in projects" :key="project.id" class="project-card">
      <img :src="project.image" alt="Project preview" />
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
      <a :href="project.githubLink" target="_blank">View on GitHub</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  githubLink: string;
}

export default defineComponent({
  name: 'ProjectsComponent',
  setup() {
    const projects = ref<Project[]>([
      {
        id: 1,
        title: 'Project 1',
        description: 'This is project 1',
        image: 'path/to/image1.jpg',
        githubLink: 'https://github.com/project1',
      },
      // Add more projects here
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
