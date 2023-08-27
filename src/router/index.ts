import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/client/components/HomeView.vue';
import About from '@/client/components/About.vue';
import Projects from '@/client/components/Projects.vue';
import Contact from '@/client/components/Contact.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
