<script lang="ts">
import { defineComponent, onMounted } from "vue";
import HeaderApp from "./components/HeaderApp.vue";
import FooterApp from "./components/FooterApp.vue";
import { RouterLink, RouterView } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    HeaderApp,
    RouterView,
    RouterLink,
    FooterApp,
  },
  setup() {
    const store = useStore();

    const loadForms = async () => {
      try {
        console.log("Начинаем загрузку форм...");
        await store.dispatch("getFormsData");
        const forms = store.getters.forms;
        console.log("Формы загружены:", forms?.length || 0, "форм");
      } catch (error) {
        console.error("Ошибка загрузки форм:", error);
      }
    };

    const initializeApp = async () => {
      try {
        // Инициализируем auth модуль
        await store.dispatch("auth/initialize");

        const isAuthenticated = store.getters["auth/isAuthenticated"];
        console.log("Auth initialized, isAuthenticated:", isAuthenticated);

        // Загружаем формы (будут взяты из кэша если есть)
        await loadForms();
      } catch (error) {
        console.error("Ошибка инициализации:", error);
      }
    };

    onMounted(() => {
      initializeApp();
    });
  },
});
</script>

<template>
  <div id="app">
    <!-- Header -->
    <header-app></header-app>
    <!-- Main -->
    <RouterView />
    <!-- Footer -->
    <hr />
    <footer-app></footer-app>
  </div>
</template>

<style scoped></style>
