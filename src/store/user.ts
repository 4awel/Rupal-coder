// store/user.ts
import { Module } from 'vuex';
import authService from '@/services/auth.service';
import type { UserData } from '@/types';

interface UserStateType {
  profile: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const userModule: Module<UserStateType, any> = {
  namespaced: true,

  state: (): UserStateType => ({
    profile: null,
    isLoading: false,
    error: null,
  }),

  mutations: {
    SET_PROFILE(state, profile: UserData | null) {
      state.profile = profile;
    },
    SET_LOADING(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    async fetchUserProfile({ commit, rootState }, userId?: string) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      try {
        const targetUserId = userId || rootState.auth.userId;
        if (!targetUserId) {
          throw new Error('ID пользователя не указан');
        }
        
        const user = await authService.getUser(targetUserId);
        commit('SET_PROFILE', user);
        return user;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async updateUserProfile({ commit, rootState }, userData: Partial<UserData>) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      
      try {
        const userId = rootState.auth.userId;
        if (!userId) {
          throw new Error('Не авторизован');
        }
        
        const updatedUser = await authService.updateUser(userId, userData);
        commit('SET_PROFILE', updatedUser);
        return updatedUser;
      } catch (error: any) {
        commit('SET_ERROR', error.message);
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },

  getters: {
    profile: (state: UserStateType) => state.profile,
    isLoading: (state: UserStateType) => state.isLoading,
    error: (state: UserStateType) => state.error,
  },
};

export default userModule;