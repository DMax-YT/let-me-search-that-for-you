import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Let me search that for you",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/yandex",
    name: "Yandex",
    component: () => import("../views/Yandex.vue"),
  },
  {
    path: "/google",
    name: "Google",
    component: () => import("../views/Google.vue"),
  },
  {
    path: "/duckduckgo",
    name: "DuckDuckGo",
    component: () => import("../views/DuckDuckGo.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
