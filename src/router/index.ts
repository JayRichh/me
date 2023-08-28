import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "../client/components/Home.vue";
import About from "../client/components/About.vue";
import Projects from "../client/components/Projects.vue";
import Contact from "../client/components/Contact.vue";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/projects",
    name: "projects",
    component: Projects,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0, el: document.body };
    }
  },
});
router.beforeEach((to, from, next) => {
  store.commit("setFocusItem", to.name);
  next();
});

export default router;
