// store/index.ts
import { createStore } from "vuex";
import axios from "axios";
import authModule from "./auth";
import userModule from "./user";
import type { UserData, FormStateType } from "@/types";

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:3006";

export default createStore({
  state: (): FormStateType & { formsLoaded: boolean } => ({
    isLoading: false,
    isSubmitted: false,
    error: null,
    success: false,
    isOpenModal: false,
    forms: [],
    formsLoaded: false, // Добавляем флаг загрузки форм
  }),

  mutations: {
    SET_LOADING(state: any, payload: boolean) {
      state.isLoading = payload;
    },

    SET_SUBMITTED(state: any, payload: boolean) {
      state.isSubmitted = payload;
    },

    SET_ERROR(state: any, payload: string | null) {
      state.error = payload;
    },

    SET_SUCCESS(state: any, payload: boolean) {
      state.success = payload;
    },

    SET_OPEN(state: any, payload: boolean) {
      state.isOpenModal = payload;
    },

    RESET_FORM(state: any) {
      state.isLoading = false;
      state.isSubmitted = false;
      state.error = null;
      state.success = false;
    },

    SET_FORMS(state: any, payload: UserData[]) {
      state.forms = payload;
      state.formsLoaded = true;
      // Сохраняем формы в localStorage
      localStorage.setItem("app_forms", JSON.stringify(payload));
      localStorage.setItem("app_forms_loaded", "true");
    },

    RESTORE_FORMS(state: any) {
      const savedForms = localStorage.getItem("app_forms");
      const formsLoaded = localStorage.getItem("app_forms_loaded") === "true";

      if (savedForms && formsLoaded) {
        try {
          state.forms = JSON.parse(savedForms);
          state.formsLoaded = true;
          console.log("Forms restored from localStorage:", state.forms.length);
        } catch (error) {
          console.error("Error restoring forms:", error);
        }
      }
    },
  },

  actions: {
    async submitForm({ commit }: any, formData: UserData) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const response = await axios.post("/api/form/send", {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          comment: formData.comment,
        });

        commit("SET_SUCCESS", true);
        commit("SET_SUBMITTED", true);

        setTimeout(() => {
          commit("RESET_FORM");
        }, 5000);

        return response.data;
      } catch (error: unknown) {
        let errorMessage = "Неизвестная ошибка";

        if (axios.isAxiosError(error)) {
          errorMessage =
            error.response?.data?.error || error.message || "Ошибка сервера";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        commit("SET_ERROR", errorMessage);
        commit("SET_SUCCESS", false);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async getFormsData({ commit }: any) {
      // Сначала пробуем восстановить из localStorage
      commit("RESTORE_FORMS");

      const state = this.state;
      if (state.formsLoaded && state.forms.length > 0) {
        console.log(
          "Using cached forms from localStorage:",
          state.forms.length,
        );
        return;
      }

      try {
        console.log("Fetching forms from server...");
        const response = await axios.get("/api/form/get");
        commit("SET_FORMS", response.data);
        console.log("Forms saved to localStorage");
      } catch (err) {
        console.log("Error fetching forms:", err);
      }
    },

    resetForm({ commit }: any) {
      commit("RESET_FORM");
    },
  },

  getters: {
    isFormLoading: (state: any) => state.isLoading,
    isFormSubmitted: (state: any) => state.isSubmitted,
    formError: (state: any) => state.error,
    formSuccess: (state: any) => state.success,
    forms: (state: any) => state.forms,
    isOpenModal: (state: any) => state.isOpenModal,
    formsLoaded: (state: any) => state.formsLoaded,
  },

  modules: {
    auth: authModule,
    user: userModule,
  },
});
