<template>
  <main class="login-container">
    <div class="bg-gradient"></div>

    <div class="login-card">
      <div class="tabs">
        <button
          class="tab-btn"
          :class="{ active: isLoginMode }"
          @click="switchMode(true)"
        >
          Вход
        </button>
        <button
          class="tab-btn"
          :class="{ active: !isLoginMode }"
          @click="switchMode(false)"
        >
          Регистрация
        </button>
      </div>

      <!-- Форма входа -->
      <form v-if="isLoginMode" @submit.prevent="handleLogin" class="auth-form">
        <h2>Добро пожаловать!</h2>
        <p class="subtitle">Войдите в свой аккаунт</p>

        <div class="input-group">
          <label>Логин</label>
          <input
            type="text"
            v-model="loginForm.login"
            placeholder="Введите логин"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label>Пароль</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="loginForm.password"
            placeholder="••••••••"
            required
            :disabled="isLoading"
          />
          <button
            type="button"
            class="toggle-password"
            @click="showPassword = !showPassword"
          >
            <span v-if="!showPassword">👁️</span>
            <span v-else>👁️‍🗨️</span>
          </button>
        </div>

        <div class="form-options">
          <label class="checkbox">
            <input type="checkbox" v-model="rememberMe" />
            <span>Запомнить меня</span>
          </label>
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? "Вход..." : "Войти" }}
        </button>
      </form>

      <!-- Форма регистрации -->
      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <h2>Создать аккаунт</h2>
        <p class="subtitle">Присоединяйтесь к нам</p>

        <div class="input-group">
          <label>Имя *</label>
          <input
            type="text"
            v-model="registerForm.name"
            placeholder="Иван Иванов"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label>Телефон *</label>
          <input
            type="tel"
            v-model="registerForm.phone"
            placeholder="+7 (999) 123-45-67"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label>Email *</label>
          <input
            type="email"
            v-model="registerForm.email"
            placeholder="example@mail.com"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label>Пароль *</label>
          <input
            :type="showRegisterPassword ? 'text' : 'password'"
            v-model="registerForm.password"
            placeholder="Придумайте пароль"
            required
            :disabled="isLoading"
          />
          <button
            type="button"
            class="toggle-password"
            @click="showRegisterPassword = !showRegisterPassword"
          >
            <span v-if="!showRegisterPassword">👁️</span>
            <span v-else>👁️‍🗨️</span>
          </button>
        </div>

        <div class="input-group">
          <label>Подтверждение пароля *</label>
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="registerForm.confirmPassword"
            placeholder="Повторите пароль"
            required
            :disabled="isLoading"
          />
          <button
            type="button"
            class="toggle-password"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <span v-if="!showConfirmPassword">👁️</span>
            <span v-else>👁️‍🗨️</span>
          </button>
        </div>

        <div class="input-group">
          <label>Комментарий *</label>
          <textarea
            v-model="registerForm.comment"
            placeholder="Ваш комментарий..."
            rows="3"
            :disabled="isLoading"
          ></textarea>
        </div>

        <label class="checkbox terms">
          <input
            type="checkbox"
            v-model="agreeTerms"
            required
            :disabled="isLoading"
          />
          <span
            >Я соглашаюсь с <a href="#">условиями использования</a> и
            <a href="#">политикой конфиденциальности</a></span
          >
        </label>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          {{ isLoading ? "Регистрация..." : "Зарегистрироваться" }}
        </button>
      </form>
    </div>

    <div
      v-if="notification.show"
      class="notification"
      :class="notification.type"
    >
      {{ notification.message }}
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

interface LoginForm {
  login: string;
  password: string;
}

interface RegisterForm {
  name: string;
  phone: string;
  email: string;
  comment: string;
  password: string;
  confirmPassword: string;
}

interface Notification {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export default defineComponent({
  name: "LoginPage",
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoginMode = ref(true);
    const showPassword = ref(false);
    const showRegisterPassword = ref(false);
    const showConfirmPassword = ref(false);
    const rememberMe = ref(false);
    const agreeTerms = ref(false);
    const isLoading = ref(false);

    const loginForm = ref<LoginForm>({
      login: "",
      password: "",
    });

    const registerForm = ref<RegisterForm>({
      name: "",
      phone: "",
      email: "",
      comment: "",
      password: "",
      confirmPassword: "",
    });

    const notification = ref<Notification>({
      show: false,
      message: "",
      type: "success",
    });

    const switchMode = (isLogin: boolean) => {
      isLoginMode.value = isLogin;
      notification.value.show = false;
      // Очищаем ошибки при переключении
      if (isLogin) {
        loginForm.value = { login: "", password: "" };
      } else {
        registerForm.value = {
          name: "",
          phone: "",
          email: "",
          comment: "",
          password: "",
          confirmPassword: "",
        };
        agreeTerms.value = false;
      }
    };

    const showNotification = (message: string, type: "success" | "error") => {
      notification.value = {
        show: true,
        message,
        type,
      };

      setTimeout(() => {
        notification.value.show = false;
      }, 3000);
    };

    const handleLogin = async () => {
      if (!loginForm.value.login || !loginForm.value.password) {
        showNotification("Пожалуйста, заполните все поля", "error");
        return;
      }

      isLoading.value = true;

      try {
        await store.dispatch("auth/login", {
          login: loginForm.value.login,
          password: loginForm.value.password,
        });

        showNotification("Успешный вход! Перенаправление...", "success");

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error: any) {
        showNotification(error.message || "Ошибка при входе", "error");
      } finally {
        isLoading.value = false;
      }
    };

    const handleRegister = async () => {
      // Валидация полей
      if (
        !registerForm.value.name ||
        !registerForm.value.phone ||
        !registerForm.value.email ||
        !registerForm.value.comment ||
        !registerForm.value.password
      ) {
        showNotification(
          "Пожалуйста, заполните все обязательные поля",
          "error",
        );
        return;
      }

      // Валидация пароля
      if (registerForm.value.password.length < 6) {
        showNotification("Пароль должен содержать минимум 6 символов", "error");
        return;
      }

      // Проверка совпадения паролей
      if (registerForm.value.password !== registerForm.value.confirmPassword) {
        showNotification("Пароли не совпадают", "error");
        return;
      }

      // Валидация email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(registerForm.value.email)) {
        showNotification("Введите корректный email адрес", "error");
        return;
      }

      // Валидация телефона
      const phoneRegex = /^\+?[\d\s-()]{10,}$/;
      if (!phoneRegex.test(registerForm.value.phone)) {
        showNotification("Введите корректный номер телефона", "error");
        return;
      }

      if (!agreeTerms.value) {
        showNotification("Подтвердите согласие с условиями", "error");
        return;
      }

      isLoading.value = true;

      try {
        // Отправляем данные на регистрацию
        const response = await store.dispatch("auth/register", {
          name: registerForm.value.name,
          phone: registerForm.value.phone,
          email: registerForm.value.email,
          comment: registerForm.value.comment,
          password: registerForm.value.password, // Добавляем пароль
        });

        showNotification("Регистрация успешна! Перенаправление...", "success");

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } catch (error: any) {
        console.error("Registration error:", error);
        showNotification(error.message || "Ошибка при регистрации", "error");
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoginMode,
      showPassword,
      showRegisterPassword,
      showConfirmPassword,
      rememberMe,
      agreeTerms,
      isLoading,
      loginForm,
      registerForm,
      notification,
      switchMode,
      handleLogin,
      handleRegister,
    };
  },
});
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
  overflow: hidden;
}

.bg-gradient {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(105deg, #f9d76e 0%, #fe4a2f 100%);
  opacity: 0.1;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
}

.login-card {
  position: relative;
  z-index: 1;
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 40px;
  transition: all 0.3s ease;
}

.tabs {
  display: flex;
  gap: 10px;
  background: #f5f5f5;
  padding: 5px;
  border-radius: 60px;
  margin-bottom: 30px;
}

.tab-btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: transparent;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.tab-btn.active {
  background: linear-gradient(105deg, #f9d76e 0%, #fe4a2f 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(254, 74, 47, 0.2);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-form h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(105deg, #fe4a2f 0%, #f9d76e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: #666;
  font-size: 14px;
  margin-top: -10px;
}

.input-group {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.input-group input,
.input-group textarea {
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

.input-group textarea {
  resize: vertical;
  min-height: 80px;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #fe4a2f;
  box-shadow: 0 0 0 3px rgba(254, 74, 47, 0.1);
}

.input-group input:disabled,
.input-group textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.toggle-password {
  position: absolute;
  right: 16px;
  bottom: 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  padding: 0;
}

.toggle-password:hover {
  opacity: 1;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #666;
}

.checkbox input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #fe4a2f;
}

.submit-btn {
  background: linear-gradient(105deg, #f9d76e 0%, #fe4a2f 100%);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(254, 74, 47, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.terms {
  font-size: 12px;
}

.terms a {
  color: #fe4a2f;
  text-decoration: none;
}

.terms a:hover {
  text-decoration: underline;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  animation: slideIn 0.3s ease;
  max-width: 350px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.notification.success {
  background: linear-gradient(105deg, #4caf50 0%, #45a049 100%);
}

.notification.error {
  background: linear-gradient(105deg, #f44336 0%, #da190b 100%);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .login-card {
    padding: 30px 25px;
    margin: 20px;
    max-width: 95%;
  }

  .auth-form h2 {
    font-size: 24px;
  }

  .tab-btn {
    padding: 10px 16px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 25px 20px;
  }

  .form-options {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .submit-btn {
    padding: 12px;
  }

  .input-group input,
  .input-group textarea {
    padding: 12px 14px;
    font-size: 14px;
  }

  .toggle-password {
    bottom: 12px;
  }
}
</style>
