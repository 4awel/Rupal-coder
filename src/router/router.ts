import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import AdminPage from "@/views/AdminPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated =
      localStorage.getItem("auth_isAuthenticated") === "true";
    if (isAuthenticated) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
