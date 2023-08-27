import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from '../client/components/HomeView.vue';
import AboutView from '../client/components/About.vue'
import ProjectsView from '../client/components/Projects.vue'
import ContactView from '../client/components/Contact.vue'
import GameView from '../client/components/Game.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  },
  {
    path: '/game',
    name: 'Game',
    component: GameView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


export default router