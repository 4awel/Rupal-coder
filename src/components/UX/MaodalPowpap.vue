<template>
  <div>
    <!-- <button @click="showModal = true" class="open-modal-btn">KKKKKKKK</button> -->

    <!-- Модальное окно -->
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-title">Оставить заявку на поддержку сайта</h3>
          <button @click="closeModal" class="modal-close-btn">&times;</button>
        </div>

        <div class="modal-content">
          <!-- Форма из вашего компонента -->
          <form
            @submit.prevent="handleSubmit"
            class="contact-form"
            :class="formClasses"
          >
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
              <button type="button" @click="resetForm" class="reset-btn">
                Отправить еще
              </button>
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
                <button type="button" @click="clearError" class="error-close">
                  ×
                </button>
              </div>

              <button
                type="submit"
                class="submit-btn"
                :class="{ loading: isLoading }"
                :disabled="!isFormValid || isLoading"
              >
                <span v-if="!isLoading">СВЯЖИТЕСЬ С НАМИ!</span>
                <span v-else>ОТПРАВКА...</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, watch } from "vue";
import { useStore } from "vuex";
interface FormData {
  name: string;
  phone: string;
  email: string;
  comment: string;
  agree: boolean;
}

export default defineComponent({
  name: "MaodalPowpap",
  setup() {
    const store = useStore();
    const showModal = computed(() => store.getters.isOpenModal);
    const isOpen = ref(false);
    const isLoading = computed(() => store.getters.isFormLoading);
    const success = computed(() => store.getters.formSuccess);
    const error = computed(() => store.getters.formError);
    console.log(showModal.value);

    watch(showModal, (newValue) => {
        isOpen.value = newValue;
        console.log(newValue)
    });

    const closeModal = () => {
      store.commit("SET_OPEN", false);
    } 


    const formData = reactive<FormData>({
      name: "",
      phone: "",
      email: "",
      comment: "",
      agree: false,
    });

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

    const formClasses = computed(() => ({
      "form-loading": isLoading.value,
      "form-success": success.value,
      "form-error": error.value,
    }));

    const handleSubmit = async () => {
      try {
        await store.dispatch("submitForm", formData);

        // Очистка формы после успешной отправки
        Object.assign(formData, {
          name: "",
          phone: "",
          email: "",
          comment: "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    const resetForm = () => {
      store.dispatch("resetForm");
    };

    const clearError = () => {
      store.commit("SET_ERROR", null);
    };

    return {
      showModal,
      formData,
      isLoading,
      success,
      error,
      isFormValid,
      formClasses,
      handleSubmit,
      resetForm,
      clearError,
      isOpen,
      closeModal
    };
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.showModal) {
        this.closeModal();
      }
    });
  },
  beforeUnmount() {
    document.removeEventListener("keydown", () => {});
    document.body.style.overflow = "auto";
  },
});
</script>

<style scoped>
/* Кнопка открытия модального окна */
.open-modal-btn {
  padding: 12px 24px;
  background-color: #f14d34;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.open-modal-btn:hover {
  background-color: #e6452e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(241, 77, 52, 0.3);
}

/* Overlay модального окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease;
  backdrop-filter: blur(4px);
}

/* Контейнер модального окна */
.modal-container {
  background: linear-gradient(135deg, #0f111a 0%, #090924 100%);
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.4s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Заголовок модального окна */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 17, 26, 0.8);
  border-radius: 16px 16px 0 0;
  position: sticky;
  top: 0;
  z-index: 2;
}

.modal-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.modal-close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 28px;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

/* Контент модального окна */
.modal-content {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Стили формы (из вашего компонента) */
.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  background: rgba(15, 17, 26, 0.95);
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
  padding: 30px 20px;
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
  margin-top: 8px;
  padding: 16px 20px;
  border: 2px solid rgba(174, 174, 174, 0.3);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  /* width: 100%; */
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(245, 245, 245, 0.6);
  opacity: 1;
  transition: color 0.3s ease;
}

.form-input:focus::placeholder,
.form-textarea:focus::placeholder {
  color: rgba(192, 192, 192, 0.4);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #f14d34;
  box-shadow: 0 0 0 3px rgba(241, 77, 52, 0.1);
  background: rgba(255, 255, 255, 0.08);
}

.form-input:disabled,
.form-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
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
  color: rgba(255, 255, 255, 0.9);
}

.checkbox-input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(203, 213, 224, 0.5);
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
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

/* Стили для кнопки отправки */
.submit-btn {
  margin-top: 10px;
  position: relative;
  overflow: hidden;
  background: #f14d34;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  background: #e6452e;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(241, 77, 52, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
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

/* Анимация для модального окна */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Адаптивность */
@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    margin: 10px;
  }

  .modal-header {
    padding: 20px;
  }

  .modal-title {
    font-size: 1.3rem;
  }

  .modal-content {
    padding: 20px;
  }

  .form-input,
  .form-textarea {
    padding: 14px 16px;
  }
}

@media (max-width: 480px) {
  .modal-container {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-header {
    padding: 16px;
  }

  .modal-content {
    padding: 16px;
  }

  .success-message {
    padding: 20px 15px;
  }
}

/* Скроллбар для модального окна */
.modal-container::-webkit-scrollbar {
  width: 8px;
}

.modal-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.modal-container::-webkit-scrollbar-thumb {
  background: rgba(241, 77, 52, 0.5);
  border-radius: 4px;
}

.modal-container::-webkit-scrollbar-thumb:hover {
  background: rgba(241, 77, 52, 0.7);
}
</style>
