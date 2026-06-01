<template>
  <div>
    <h1>Админ-панель</h1>

    <div v-if="isLoading">Загрузка...</div>

    <div v-if="error" style="color: red">Ошибка: {{ error }}</div>

    <div v-if="user">
      <h2>Данные пользователя</h2>
      <p><strong>ФИО:</strong> {{ user.name }}</p>
      <p><strong>Телефон:</strong> {{ user.phone }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Логин:</strong> {{ user.login }}</p>
      <p>
        <strong>Дата рождения:</strong> {{ user.birthDate || "Не указана" }}
      </p>
      <p><strong>Пол:</strong> {{ user.gender || "Не указан" }}</p>
      <p>
        <strong>Любимые языки:</strong>
        {{ user.favoriteLanguages?.join(", ") || "Не указаны" }}
      </p>
      <p><strong>Биография:</strong> {{ user.biography || "Не указана" }}</p>
      <p><strong>Дата регистрации:</strong> {{ user.createdAt }}</p>

      <button @click="logout">Выйти</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "AdminPage",

  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(false);
    const error = ref(null);

    const user = computed(() => store.getters["auth/user"]);
    const isAuthenticated = computed(
      () => store.getters["auth/isAuthenticated"],
    );

    const logout = async () => {
      await store.dispatch("auth/logout");
      router.push("/");
    };

    onMounted(async () => {
      if (!isAuthenticated.value) {
        router.push("/");
      }
    });

    return {
      user,
      isLoading,
      error,
      logout,
    };
  },
};
</script>
