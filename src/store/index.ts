import { createStore } from "vuex";

import axios, {  AxiosError } from "axios";
export interface Forms_DataType {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export interface FormStateType {
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
  success: boolean;
  forms: Forms_DataType[];
  isOpenModal: boolean;
}

export interface FormDataType {
  name: string;
  phone: string;
  email: string;
  comment: string;
  agree?: boolean;
}

export default createStore({
  state: (): FormStateType => ({
    isLoading: false,
    isSubmitted: false,
    error: null,
    success: false,
    isOpenModal: false,

    forms: [],
  }),

  mutations: {
    SET_LOADING(state: any, payload: boolean) {
      state.isOpenModal = payload;
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

    SET_MODAL(state: any, payload: boolean) {
      state.isOpenModal = payload;
    },

    RESET_FORM(state: any) {
      state.isLoading = false;
      state.isSubmitted = false;
      state.error = null;
      state.success = false;
    },

    SET_FORMS(state: any, payload: Forms_DataType[]) {
      state.forms = payload;
    },
  },

  actions: {
    async submitForm({ commit }: any, formData: FormDataType) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        await axios.post("/api/form/send", {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          comment: formData.comment,
        });

        commit("SET_SUCCESS", true);
        commit("SET_SUBMITTED", true);

        // Автоматический сброс через 5 секунд
        setTimeout(() => {
          commit("RESET_FORM");
        }, 5000);
      } catch (error: unknown) {
        let errorMessage = "Неизвестная ошибка";

        if (axios.isAxiosError(error)) {
          errorMessage =
            error.response?.data || error.message || "Ошибка сервера";
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
      try {
        const response = await axios("/api/form/get");
        commit("SET_FORMS", response.data);
      } catch (err) {
        console.log(err);
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
    isOpenModal: (state: any) => {return state.isOpenModal},
  },
});
