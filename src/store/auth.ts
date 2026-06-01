// store/auth.ts
import { Module } from "vuex";
import authService from "@/services/auth.service";
import type {
  AuthStateType,
  UserData,
  LoginCredentials,
  RegisterData,
} from "@/types";

const authModule: Module<AuthStateType, any> = {
  namespaced: true,

  state: (): AuthStateType => ({
    isAuthenticated: false,
    user: null,
    userLogin: null,
    userId: null,
    token: null,
    isLoading: false,
    error: null,
    success: false,
    initialized: false,
  }),

  mutations: {
    SET_AUTH(
      state,
      payload: {
        isAuthenticated: boolean;
        user: UserData | null;
        userLogin: string | null;
        userId: string | null;
        token: string | null;
      },
    ) {
      state.isAuthenticated = payload.isAuthenticated;
      state.user = payload.user;
      state.userLogin = payload.userLogin;
      state.userId = payload.userId;
      state.token = payload.token;

      if (payload.isAuthenticated && payload.user && payload.token) {
        localStorage.setItem("auth_user", JSON.stringify(payload.user));
        localStorage.setItem("auth_userLogin", payload.userLogin || "");
        localStorage.setItem("auth_userId", payload.userId || "");
        localStorage.setItem("auth_token", payload.token);
        localStorage.setItem("auth_isAuthenticated", "true");
        console.log("✅ Auth saved to localStorage", { 
          userId: payload.userId, 
          userLogin: payload.userLogin 
        });
      } else {
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_userLogin");
        localStorage.removeItem("auth_userId");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_isAuthenticated");
        console.log("❌ Auth cleared from localStorage");
      }
    },
    
    SET_LOADING(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    
    SET_ERROR(state, error: string | null) {
      state.error = error;
    },
    
    SET_SUCCESS(state, success: boolean) {
      state.success = success;
    },
    
    CLEAR_AUTH(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.userLogin = null;
      state.userId = null;
      state.token = null;
      state.error = null;
      state.success = false;
      state.initialized = false;

      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_userLogin");
      localStorage.removeItem("auth_userId");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_isAuthenticated");
      console.log("❌ Auth cleared");
    },
    
    SET_INITIALIZED(state, initialized: boolean) {
      state.initialized = initialized;
      console.log("Auth initialized set to:", initialized);
    },
    
    RESTORE_AUTH(state) {
      const isAuthenticated = localStorage.getItem("auth_isAuthenticated") === "true";
      const userStr = localStorage.getItem("auth_user");
      const userLogin = localStorage.getItem("auth_userLogin");
      const userId = localStorage.getItem("auth_userId");
      const token = localStorage.getItem("auth_token");

      console.log("RESTORE_AUTH - localStorage check:", {
        isAuthenticated,
        hasUserStr: !!userStr,
        userLogin,
        userId: userId || "(empty)",
        hasToken: !!token,
        userIdLength: userId?.length
      });

      // ✅ Исправляем условие - проверяем что userId не пустая строка
      if (isAuthenticated && userStr && userId && userId !== "" && token) {
        try {
          const user = JSON.parse(userStr);
          
          state.isAuthenticated = true;
          state.user = user;
          state.userLogin = userLogin;
          state.userId = userId;
          state.token = token;
          
          console.log("✅ Auth restored from localStorage for user:", userLogin);
        } catch (error) {
          console.error("Error restoring auth:", error);
          state.isAuthenticated = false;
          state.token = null;
        }
      } else {
        console.log("❌ No valid auth data in localStorage");
        state.isAuthenticated = false;
        state.token = null;
      }
    },
  },

  actions: {
    async initialize({ commit, dispatch, state }) {
      console.log("=== INITIALIZING AUTH ===");
      
      // Восстанавливаем из localStorage
      commit("RESTORE_AUTH");
      
      // Проверяем состояние после восстановления
      console.log("Auth state after restore:", {
        isAuthenticated: state.isAuthenticated,
        hasUser: !!state.user,
        hasToken: !!state.token,
        userId: state.userId
      });
      
      // Если есть токен, проверяем его валидность
      if (state.token && state.userId) {
        try {
          const freshUser = await dispatch("refreshUserData");
          if (freshUser) {
            console.log("✅ User data refreshed from server");
          }
        } catch (err) {
          console.log("Could not refresh user data, using cached version");
        }
      }
      
      commit("SET_INITIALIZED", true);
      return state.isAuthenticated;
    },
    
    async refreshUserData({ commit, state }) {
      if (!state.token || !state.userId) return null;
      
      try {
        const authService = (await import("@/services/auth.service")).default;
        const freshUser = await authService.getUser(state.userId);
        
        if (freshUser) {
          commit("SET_AUTH", {
            isAuthenticated: true,
            user: freshUser,
            userLogin: freshUser.login,
            userId: state.userId,
            token: state.token,
          });
          return freshUser;
        }
      } catch (err) {
        console.log("Could not refresh user data:", err);
      }
      return null;
    },

    async login({ commit }, credentials: LoginCredentials) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_SUCCESS", false);

      try {
        const authService = (await import("@/services/auth.service")).default;
        const { user, token } = await authService.login(credentials);
        
        console.log("Login response user:", user);
        
        commit("SET_AUTH", {
          isAuthenticated: true,
          user,
          userLogin: user.login || user.phone,
          userId: user.id,
          token: token,
        });
        commit("SET_SUCCESS", true);
        return user;
      } catch (error: any) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async register({ commit }, registerData: RegisterData) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_SUCCESS", false);

      try {
        const authService = (await import("@/services/auth.service")).default;
        const response = await authService.register(registerData);

        const userData: UserData = {
          id: response.userId,
          name: registerData.fullName,
          phone: registerData.phone,
          email: registerData.email,
          birthDate: registerData.birthDate,
          gender: registerData.gender,
          favoriteLanguages: registerData.favoriteLanguages,
          biography: registerData.biography,
          login: response.login || registerData.phone,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        commit("SET_AUTH", {
          isAuthenticated: true,
          user: userData,
          userLogin: userData.login,
          userId: response.userId,
          token: response.token,
        });
        commit("SET_SUCCESS", true);

        return response;
      } catch (error: any) {
        commit("SET_ERROR", error.message);
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async logout({ commit }) {
      const authService = (await import("@/services/auth.service")).default;
      authService.logout();
      commit("CLEAR_AUTH");
    },

    resetForm({ commit }) {
      commit("SET_SUCCESS", false);
      commit("SET_ERROR", null);
      commit("SET_LOADING", false);
    },
  },

  getters: {
    isAuthenticated: (state: AuthStateType) => state.isAuthenticated,
    user: (state: AuthStateType) => state.user,
    userLogin: (state: AuthStateType) => state.userLogin,
    userId: (state: AuthStateType) => state.userId,
    token: (state: AuthStateType) => state.token,
    isLoading: (state: AuthStateType) => state.isLoading,
    error: (state: AuthStateType) => state.error,
    formSuccess: (state: AuthStateType) => state.success || false,
    isFormLoading: (state: AuthStateType) => state.isLoading,
    formError: (state: AuthStateType) => state.error,
    initialized: (state: AuthStateType) => state.initialized || false,
  },
};

export default authModule;