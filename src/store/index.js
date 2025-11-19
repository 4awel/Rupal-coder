import { createStore } from "vuex";
import axios from "axios";
export default createStore({
    state: () => ({
        isLoading: false,
        isSubmitted: false,
        error: null,
        success: false,
        forms: [],
    }),
    mutations: {
        SET_LOADING(state, payload) {
            state.isLoading = payload;
        },
        SET_SUBMITTED(state, payload) {
            state.isSubmitted = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        SET_SUCCESS(state, payload) {
            state.success = payload;
        },
        RESET_FORM(state) {
            state.isLoading = false;
            state.isSubmitted = false;
            state.error = null;
            state.success = false;
        },
        SET_FORMS(state, payload) {
            state.forms = payload;
        },
    },
    actions: {
        async submitForm({ commit }, formData) {
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
            }
            catch (error) {
                let errorMessage = "Неизвестная ошибка";
                if (axios.isAxiosError(error)) {
                    errorMessage =
                        error.response?.data || error.message || "Ошибка сервера";
                }
                else if (error instanceof Error) {
                    errorMessage = error.message;
                }
                commit("SET_ERROR", errorMessage);
                commit("SET_SUCCESS", false);
                throw error;
            }
            finally {
                commit("SET_LOADING", false);
            }
        },
        async getFormsData({ commit }) {
            try {
                const response = await axios("/api/form/get");
                commit("SET_FORMS", response.data);
            }
            catch (err) {
                console.log(err);
            }
        },
        resetForm({ commit }) {
            commit("RESET_FORM");
        },
    },
    getters: {
        isFormLoading: (state) => state.isLoading,
        isFormSubmitted: (state) => state.isSubmitted,
        formError: (state) => state.error,
        formSuccess: (state) => state.success,
        forms: (state) => state.forms,
    },
});
//# sourceMappingURL=index.js.map