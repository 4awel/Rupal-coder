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
        console.log("Формы успешно загружены:", store.getters.forms);
      } catch (error) {
        console.error("Ошибка загрузки форм:", error);
      }
    };
    onMounted(() => {
      loadForms();
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
