<template>
  <div class="container-form">
    <div class="overlay-300 deg-15">
      <img src="../../assets/svg/D-fly.svg" alt="d-overlay" />
    </div>
    <div class="form-info">
      <div class="block-top">
        <h2>
          {{
            isLoginMode ? "Вход в аккаунт" : "Регистрация нового пользователя"
          }}
        </h2>
        <span class="description">
          {{
            isLoginMode
              ? "Войдите в свой аккаунт, чтобы продолжить. Если у вас нет аккаунта, вы можете зарегистрироваться."
              : "Заполните форму регистрации, чтобы создать аккаунт. Уже зарегистрированы? Войдите в систему."
          }}
        </span>
      </div>
      <div class="block-bottom">
        <button @click="toggleMode" class="toggle-mode-btn" type="button">
          {{ isLoginMode ? "Создать аккаунт" : "Уже есть аккаунт? Войти" }}
        </button>
      </div>
    </div>
    <div class="form">
      <form @submit.prevent="handleSubmit" class="contact-form smooth-scroll">
        <!-- Overlay загрузки -->
        <div v-if="isLoading" class="form-overlay">
          <div class="spinner"></div>
          <span class="loading-text">{{
            isLoginMode ? "Вход..." : "Регистрация..."
          }}</span>
        </div>

        <!-- Успешное сообщение -->
        <div v-if="success" class="success-message">
          <div class="success-icon">✓</div>
          <h3>{{ isLoginMode ? "Успешный вход!" : "Регистрация успешна!" }}</h3>
          <p>{{ successMessage }}</p>
          <button type="button" @click="redirectToAdmin" class="reset-btn">
            Перейти в админ-панель
          </button>
        </div>

        <!-- Основное содержимое формы -->
        <div v-if="!success" class="form-content">
          <!-- Поля для регистрации -->
          <template v-if="!isLoginMode">
            <div class="input-group">
              <input
                v-model="formData.fullName"
                type="text"
                placeholder="ФИО *"
                class="form-input"
                :disabled="isLoading"
              />
            </div>
            <div class="input-group">
              <input
                v-model="formData.birthDate"
                type="date"
                class="form-input"
                :disabled="isLoading"
              />
            </div>
            <div class="input-group">
              <select
                v-model="formData.gender"
                class="form-input"
                :disabled="isLoading"
              >
                <option value="">Пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
                <option value="other">Другой</option>
              </select>
            </div>
            <div class="input-group">
              <div class="checkbox-group language-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    value="javascript"
                    v-model="formData.favoriteLanguages"
                    :disabled="isLoading"
                    class="checkbox-input"
                  />
                  <span class="checkmark"></span>
                  <span class="checkbox-text">JavaScript</span>
                </label>
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    value="python"
                    v-model="formData.favoriteLanguages"
                    :disabled="isLoading"
                    class="checkbox-input"
                  />
                  <span class="checkmark"></span>
                  <span class="checkbox-text">Python</span>
                </label>
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    value="java"
                    v-model="formData.favoriteLanguages"
                    :disabled="isLoading"
                    class="checkbox-input"
                  />
                  <span class="checkmark"></span>
                  <span class="checkbox-text">Java</span>
                </label>
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    value="csharp"
                    v-model="formData.favoriteLanguages"
                    :disabled="isLoading"
                    class="checkbox-input"
                  />
                  <span class="checkmark"></span>
                  <span class="checkbox-text">C#</span>
                </label>
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    value="php"
                    v-model="formData.favoriteLanguages"
                    :disabled="isLoading"
                    class="checkbox-input"
                  />
                  <span class="checkmark"></span>
                  <span class="checkbox-text">PHP</span>
                </label>
              </div>
            </div>
            <div class="input-group">
              <textarea
                v-model="formData.biography"
                placeholder="Биография"
                class="form-textarea"
                :disabled="isLoading"
              ></textarea>
            </div>
          </template>

          <!-- Общие поля -->
          <div class="input-group">
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="Телефон *"
              class="form-input"
              :disabled="isLoading"
            />
          </div>
          <div class="input-group" v-if="!isLoginMode">
            <input
              v-model="formData.email"
              type="email"
              placeholder="E-mail *"
              class="form-input"
              :disabled="isLoading"
            />
          </div>
          <div class="input-group" v-else>
            <input
              v-model="formData.email"
              type="email"
              placeholder="E-mail"
              class="form-input"
              :disabled="isLoading"
            />
          </div>
          <div class="input-group">
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Пароль *"
              class="form-input"
              :disabled="isLoading"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="password-toggle"
            >
              {{ showPassword ? "🙈" : "👁️" }}
            </button>
          </div>
          <div class="input-group" v-if="!isLoginMode">
            <input
              v-model="formData.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Подтверждение пароля *"
              class="form-input"
              :disabled="isLoading"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="password-toggle"
            >
              {{ showConfirmPassword ? "🙈" : "👁️" }}
            </button>
          </div>

          <div class="checkbox-group" v-if="!isLoginMode">
            <label class="checkbox-label agreement-label">
              <input
                v-model="formData.agreement"
                type="checkbox"
                class="checkbox-input"
                :disabled="isLoading"
              />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                Я ознакомлен с условиями использования
              </span>
            </label>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
            <button type="button" @click="clearError" class="error-close">
              ×
            </button>
          </div>

          <button
            type="submit"
            class="submit-btn"
            :disabled="!isFormValid || isLoading"
          >
            {{
              !isLoading
                ? isLoginMode
                  ? "ВОЙТИ"
                  : "ЗАРЕГИСТРИРОВАТЬСЯ"
                : isLoginMode
                  ? "ВХОД..."
                  : "РЕГИСТРАЦИЯ..."
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: string;
  favoriteLanguages: string[];
  biography: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
}

export default defineComponent({
  name: "BlockForm",

  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoginMode = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    // Локальное состояние
    const isLoading = ref(false);
    const success = ref(false);
    const error = ref<string | null>(null);

    const formData = reactive<FormData>({
      fullName: "",
      phone: "",
      email: "",
      birthDate: "",
      gender: "",
      favoriteLanguages: [],
      biography: "",
      password: "",
      confirmPassword: "",
      agreement: false,
    });

    const successMessage = computed(() => {
      if (isLoginMode.value) {
        return "Добро пожаловать! Вы успешно вошли в систему.";
      }
      return "Ваш аккаунт успешно создан! Теперь вы можете войти.";
    });

    const isFormValid = computed(() => {
      if (!formData.phone.trim() || !formData.password.trim()) {
        return false;
      }

      if (isLoginMode.value) {
        return true;
      }

      const isBasicValid =
        formData.fullName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.password === formData.confirmPassword &&
        formData.password.length >= 6 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

      const allFieldsFilled =
        formData.fullName.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== "" &&
        formData.password === formData.confirmPassword &&
        formData.password.length >= 6;

      if (allFieldsFilled) {
        return isBasicValid && formData.agreement === true;
      }

      return isBasicValid;
    });

    const toggleMode = () => {
      isLoginMode.value = !isLoginMode.value;
      Object.assign(formData, {
        fullName: "",
        phone: "",
        email: "",
        birthDate: "",
        gender: "",
        favoriteLanguages: [],
        biography: "",
        password: "",
        confirmPassword: "",
        agreement: false,
      });
      error.value = null;
      success.value = false;
    };

    const redirectToAdmin = () => {
      // Перенаправляем на страницу /admin
      router.push("/admin");
    };

    const handleSubmit = async () => {
      if (!isFormValid.value) return;

      isLoading.value = true;
      error.value = null;

      try {
        if (isLoginMode.value) {
          // Логика входа
          await store.dispatch("auth/login", {
            phone: formData.phone,
            password: formData.password,
            email: formData.email || undefined,
          });
          success.value = true;

          // Автоматический редирект через 1.5 секунды
          setTimeout(() => {
            redirectToAdmin();
          }, 1500);
        } else {
          // Логика регистрации
          await store.dispatch("auth/register", {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            birthDate: formData.birthDate,
            gender: formData.gender,
            favoriteLanguages: formData.favoriteLanguages,
            biography: formData.biography,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            agreement: formData.agreement,
          });
          success.value = true;

          // Автоматический редирект через 1.5 секунды после регистрации
          setTimeout(() => {
            redirectToAdmin();
          }, 1500);

          // Очистка формы
          Object.assign(formData, {
            fullName: "",
            phone: "",
            email: "",
            birthDate: "",
            gender: "",
            favoriteLanguages: [],
            biography: "",
            password: "",
            confirmPassword: "",
            agreement: false,
          });
        }
      } catch (err: any) {
        error.value = err.message || "Произошла ошибка";
        success.value = false;
      } finally {
        isLoading.value = false;
      }
    };

    const resetForm = () => {
      success.value = false;
      error.value = null;
      redirectToAdmin();
    };

    const clearError = () => {
      error.value = null;
    };

    return {
      formData,
      isLoading,
      success,
      error,
      isLoginMode,
      showPassword,
      showConfirmPassword,
      successMessage,
      isFormValid,
      toggleMode,
      resetForm,
      clearError,
      handleSubmit,
      redirectToAdmin,
    };
  },
});
</script>

<style scoped>
/* Все стили остаются без изменений */
.container-form {
  display: grid;
  grid-template-columns: 33% 33%;
  background: linear-gradient(90deg, #0f111a 0%, #090924 100%);
  width: 100%;
  gap: 200px;
  padding: 100px 0;
  position: relative;
  justify-content: center;
}

.smooth-scroll {
  scroll-behavior: smooth;
}

.form-info {
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  overflow: hidden;
  z-index: 3;
}

.overlay-300.deg-15 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-300.deg-15 img {
  width: 100%;
  height: 100%;
}

.block-top {
  position: relative;
  z-index: 2;
}

.block-top h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 30px;
  line-height: 1.2;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.7;
}

.block-bottom {
  position: relative;
  z-index: 2;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.toggle-mode-btn {
  background: transparent;
  color: #f14d34;
  border: 2px solid #f14d34;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-mode-btn:hover {
  background: #f14d34;
  color: white;
  transform: translateY(-2px);
}

.form {
  display: flex;
  align-items: center;
  padding: 20px;
  z-index: 3;
}

.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: relative;
  transition: all 0.3s ease;
}

.form-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 17, 26, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 12px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #f14d34;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #fff;
  font-size: 16px;
  opacity: 0.8;
}

.success-message {
  text-align: center;
  padding: 40px 20px;
  color: white;
}

.success-icon {
  width: 60px;
  height: 60px;
  background: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto 20px;
  animation: bounceIn 0.6s ease;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-message h3 {
  color: #4caf50;
  margin-bottom: 10px;
}

.reset-btn {
  background: #f14d34;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #e6452e;
  transform: translateY(-2px);
}

.error-message {
  background: rgba(198, 40, 40, 0.1);
  color: #ff6b6b;
  padding: 12px 15px;
  border-radius: 6px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(198, 40, 40, 0.3);
}

.error-close {
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-input,
.form-textarea,
select.form-input {
  margin-top: 20px;
  padding: 18px 20px;
  border: 2px solid #aeaeae;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(15, 17, 26, 0.5);
  color: #fff;
}

select.form-input option {
  background: #0f111a;
}

input[type="date"].form-input {
  color-scheme: dark;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #f5f5f5;
  opacity: 1;
}

.form-input:focus,
.form-textarea:focus,
select.form-input:focus {
  outline: none;
  border-color: #f14d34;
  box-shadow: 0 0 0 3px rgba(241, 77, 52, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.password-toggle {
  position: absolute;
  right: 15px;
  bottom: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.7;
}

.language-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
}

.checkbox-group {
  margin: 10px 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #fff;
  position: relative;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.checkbox-label:hover .checkmark {
  border-color: #f14d34;
}

.checkbox-input:checked + .checkmark {
  background: #f14d34;
  border-color: #f14d34;
}

.checkbox-input:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-input:disabled + .checkmark {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkbox-input:disabled ~ .checkbox-text {
  opacity: 0.6;
}

.checkbox-text {
  cursor: pointer;
  user-select: none;
}

.submit-btn {
  margin-top: 10px;
  background: #f14d34;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #e6452e;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 968px) {
  .container-form {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .form-info {
    padding: 30px;
    text-align: center;
  }

  .block-top h2 {
    font-size: 2rem;
  }

  .overlay-300.deg-15 {
    top: 20px;
    width: 250px;
    height: 250px;
  }
}

@media (max-width: 768px) {
  .container-form {
    padding: 40px 0;
    gap: 30px;
  }

  .form-info {
    padding: 25px;
  }

  .block-top h2 {
    font-size: 1.75rem;
  }

  .form-input,
  .form-textarea {
    padding: 15px;
  }

  .overlay-300.deg-15 {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 480px) {
  .container-form {
    padding: 30px 0px;
  }

  .form-info {
    padding: 20px;
  }

  .block-top h2 {
    font-size: 1.5rem;
  }

  .overlay-300.deg-15 {
    width: 150px;
    height: 150px;
    top: 10px;
  }
}
</style>
