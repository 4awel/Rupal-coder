<template>
  <div class="container-form">
    <div class="overlay-300 deg-15">
      <img src="../../assets/svg/D-fly.svg" alt="d-overlay" />
    </div>
    <div class="form-info">
      <div class="block-top">
        <h2>Оставить заявку на поддержку сайта</h2>
        <span class="description"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
          voluptatem sint ipsam magnam deleniti, quam magni repellat quisquam
          ducimus modi necessitatibus repudiandae at autem debitis tempore est
          distinctio nulla ullam ipsa, praesentium minus. Culpa ad nobis
          repudiandae labore nesciunt fugiat dicta quo, delectus pariatur quas
          aliquid neque ab aperiam iusto quia, sint velit nihil, tempora ut.
          Asperiores incidunt architecto eius.</span
        >
      </div>
      <div class="block-bottom">
        <span class="phone">8 800 222-26-73</span>
        <a href="info@drupal-coder.com" class="email">info@drupal-coder.com</a>
      </div>
    </div>
    <div class="form">
      <form id="form" @submit.prevent="handleSubmit" class="contact-form smooth-scroll" :class="formClasses">
        <!-- Overlay загрузки -->
        <div v-if="isLoading" class="form-overlay">
          <div class="spinner"></div>
          <span class="loading-text">Отправка данных...</span>
        </div>

        <!-- Успешное сообщение -->
        <div v-if="success" class="success-message">
          <div class="success-icon">✓</div>
          <h3>Успешно отправлено!</h3>
          <p>Мы свяжемся с вами в ближайшее время</p>
          <button type="button" @click="resetForm" class="reset-btn">Отправить еще</button>
        </div>

        <!-- Основное содержимое формы -->
        <div v-if="!success" class="form-content">
          <div class="input-group">
            <input
              v-model="formData.name"
              type="text"
              placeholder="Ваше имя"
              class="form-input"
              :disabled="isLoading"
              required
            />
          </div>
          <div class="input-group">
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="Телефон"
              class="form-input"
              :disabled="isLoading"
              required
            />
          </div>
          <div class="input-group">
            <input
              v-model="formData.email"
              type="email"
              placeholder="E-mail"
              class="form-input"
              :disabled="isLoading"
              required
            />
          </div>
          <div class="input-group">
            <textarea
              v-model="formData.comment"
              placeholder="Ваш комментарий"
              id="comment"
              class="form-textarea"
              :disabled="isLoading"
            ></textarea>
          </div>

          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                v-model="formData.agree"
                type="checkbox"
                class="checkbox-input"
                :disabled="isLoading"
                required
              />
              <span class="checkmark"></span>
              <span class="checkbox-text">
                Отправляя заявку, я даю согласие на
                <a href="#" class="privacy-link"
                  >обработку своих персональных данных.*</a
                >
              </span>
            </label>
          </div>

          <!-- Сообщение об ошибке -->
          <div v-if="error" class="error-message">
            {{ error }}
            <button type="button" @click="clearError" class="error-close">×</button>
          </div>

          <ButtonTypeBould
            style="width: 100%"
            class="submit-btn"
            :class="{ loading: isLoading }"
            :disabled="!isFormValid || isLoading"
          >
            <span v-if="!isLoading">СВЯЖИТЕСЬ С НАМИ!</span>
            <span v-else>ОТПРАВКА...</span>
          </ButtonTypeBould>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";

interface FormData {
  name: string;
  phone: string;
  email: string;
  comment: string;
  agree: boolean;
}

export default defineComponent({
  name: "BlockForm",

  setup() {
    const store = useStore();

    const formData = reactive<FormData>({
      name: "",
      phone: "",
      email: "",
      comment: "",
      agree: false,
    });

    // Геттеры из Vuex
    const isLoading = computed(() => store.getters.isFormLoading);
    const success = computed(() => store.getters.formSuccess);
    const error = computed(() => store.getters.formError);

    const isFormValid = computed(() => {
      return (
        formData.name.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.agree !== false &&
        isValidEmail(formData.email)
      );
    });

    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Обработчики
    const handleSubmit = async () => {
      if (!isFormValid.value) return;

      try {
        await store.dispatch("submitForm", formData);

        // Очистка формы после успешной отправки
        Object.assign(formData, {
          name: "",
          phone: "",
          email: "",
          comment: "",
        });
      } catch (error) {
        console.error("Ошибка отправки формы:", error);
      }
    };

    const resetForm = () => {
      store.dispatch("resetForm");
    };

    const clearError = () => {
      store.commit("SET_ERROR", null);
    };

    // Классы для анимаций
    const formClasses = computed(() => ({
      "form-loading": isLoading.value,
      "form-success": success.value,
      "form-error": error.value,
    }));

    return {
      formData,
      isLoading,
      resetForm,
      clearError,
      handleSubmit,
      success,
      error,
      formClasses,
      isFormValid
    };
  },
});
</script>

<style scoped>
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

.phone {
  font-size: 2rem;
  font-weight: 600;
}

.email {
  font-size: 1.2rem;
  opacity: 0.9;
  color: #fff;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.email:hover {
  opacity: 1;
  text-decoration: underline;
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

/* Анимации состояний формы */
.contact-form.form-loading {
  opacity: 0.7;
  pointer-events: none;
}

.contact-form.form-success {
  animation: successPulse 0.6s ease;
}

.contact-form.form-error {
  animation: errorShake 0.5s ease;
}

@keyframes successPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes errorShake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* Overlay загрузки */
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

/* Сообщение об успехе */
.success-message {
  text-align: center;
  padding: 40px 20px;
  animation: fadeIn 0.5s ease;
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

/* Сообщение об ошибке */
.error-message {
  background: rgba(198, 40, 40, 0.1);
  color: #ff6b6b;
  padding: 12px 15px;
  border-radius: 6px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideDown 0.3s ease;
  border: 1px solid rgba(198, 40, 40, 0.3);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
}

.form-input,
.form-textarea {
  margin-top: 20px;
  padding: 18px 20px;
  border: 2px solid #aeaeae;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(15, 17, 26, 0.5);
  color: #fff;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #f5f5f5;
  opacity: 1;
  transition: color 0.3s ease;
}

.form-input:focus::placeholder,
.form-textarea:focus::placeholder {
  color: #c0c0c0;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #f14d34;
  box-shadow: 0 0 0 3px rgba(241, 77, 52, 0.1);
}

.form-input:disabled,
.form-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

/* Checkbox Styles */
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
}

.checkbox-input {
  display: none;
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

.checkbox-label:has(.checkbox-input:disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}

.privacy-link {
  color: #f14d34;
  text-decoration: none;
  transition: color 0.3s ease;
}

.privacy-link:hover {
  color: #fb6f5a;
  text-decoration: underline;
}

/* Стили для кнопки */
.submit-btn {
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.submit-btn.loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Анимация для элементов формы */
.form-input:focus,
.form-textarea:focus {
  transform: translateY(-2px);
}

.checkbox-label:hover .checkmark {
  border-color: #f14d34;
}

/* Адаптивность */
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
    margin-bottom: 20px;
  }

  .description {
    font-size: 1rem;
  }

  .phone {
    font-size: 1.3rem;
  }

  .form-input,
  .form-textarea {
    padding: 15px;
  }

  .overlay-300.deg-15 {
    width: 200px;
    height: 200px;
  }

  .success-message {
    padding: 30px 15px;
  }
}

@media (max-width: 480px) {
  .container-form {
    padding: 30px 0px;
    gap: 200px;
  }

  .form-info {
    padding: 20px;
  }

  .block-top h2 {
    font-size: 1.5rem;
  }

  .block-bottom {
    margin-top: 30px;
    gap: 10px;
  }

  .overlay-300.deg-15 {
    width: 150px;
    height: 150px;
    top: 10px;
  }
}
</style>
