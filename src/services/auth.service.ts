// services/auth.service.ts
import axios from "axios";
import type {
  LoginCredentials,
  RegisterData,
  RegisterResponse,
  UserData,
  LoginApiResponse,
  RegisterApiResponse,
} from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3006";

class AuthService {
  // services/auth.service.ts - метод login
  async login(
    credentials: LoginCredentials,
  ): Promise<{ user: UserData; token: string }> {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        phone: credentials.phone,
        password: credentials.password,
        email: credentials.email,
      });

      if (response.status === 200) {
        const { user, token } = response.data;

        // Убеждаемся что user.id существует
        const userData: UserData = {
          id: user._id || user.id, // Поддерживаем оба варианта
          name: user.name || "",
          phone: user.phone,
          email: user.email || "",
          login: user.login || user.phone,
          birthDate: user.birthDate,
          gender: user.gender,
          favoriteLanguages: user.favoriteLanguages,
          biography: user.biography,
        };

        console.log("Login - saving user with id:", userData.id);

        localStorage.setItem("auth_user", JSON.stringify(userData));
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_userLogin", userData.login);
        localStorage.setItem("auth_userId", userData.id);
        localStorage.setItem("auth_isAuthenticated", "true");

        return { user: userData, token };
      }
      throw new Error("Ошибка при входе");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error || error.message || "Ошибка при входе",
      );
    }
  }

  async register(registerData: RegisterData): Promise<RegisterApiResponse> {
    try {
      // Отправляем ВСЕ данные формы на сервер
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        fullName: registerData.fullName,
        phone: registerData.phone,
        email: registerData.email,
        birthDate: registerData.birthDate,
        gender: registerData.gender,
        favoriteLanguages: registerData.favoriteLanguages,
        biography: registerData.biography,
        password: registerData.password,
        agreement: registerData.agreement,
      });

      if (response.status === 201) {
        const data = response.data;

        const token = data.token;

        // Сохраняем все данные пользователя
        const userData: UserData = {
          id: data.userId,
          name: registerData.fullName,
          phone: registerData.phone,
          email: registerData.email,
          birthDate: registerData.birthDate,
          gender: registerData.gender,
          favoriteLanguages: registerData.favoriteLanguages,
          biography: registerData.biography,
          login: data.login || registerData.phone,
          comment: undefined,
        };

        // Сохраняем в localStorage
        localStorage.setItem("auth_user", JSON.stringify(userData));
        localStorage.setItem("auth_token", token);
        localStorage.setItem(
          "auth_userLogin",
          data.login || registerData.phone,
        );
        localStorage.setItem("auth_userId", data.userId);
        localStorage.setItem("auth_isAuthenticated", "true");

        return {
          userId: data.userId,
          login: data.login || registerData.phone,
          token: token,
          message: "Регистрация успешна",
        };
      }

      throw new Error("Ошибка при регистрации");
    } catch (error: any) {
      console.error("Register error:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Ошибка при регистрации";
      throw new Error(errorMessage);
    }
  }

  async updateUser(
    userId: string,
    userData: Partial<UserData>,
  ): Promise<UserData> {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Не авторизован");
      }

      const response = await axios.put(
        `${API_URL}/api/user/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const updatedUser = {
          ...JSON.parse(localStorage.getItem("auth_user") || "{}"),
          ...response.data.user,
        };
        localStorage.setItem("auth_user", JSON.stringify(updatedUser));
        return updatedUser;
      }

      throw new Error("Ошибка при обновлении");
    } catch (error: any) {
      console.error("Update error:", error);
      throw new Error(
        error.response?.data?.error || error.message || "Ошибка при обновлении",
      );
    }
  }

  async getUser(userId: string): Promise<UserData> {
    try {
      const token = localStorage.getItem("auth_token");
      const headers: any = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(`${API_URL}/api/user/${userId}`, {
        headers,
      });

      if (response.status === 200) {
        return {
          id: response.data._id || response.data.id,
          name: response.data.name || response.data.fullName || "",
          phone: response.data.phone,
          email: response.data.email || "",
          birthDate: response.data.birthDate,
          gender: response.data.gender,
          favoriteLanguages: response.data.favoriteLanguages,
          biography: response.data.biography,
          comment: response.data.comment,
          login: response.data.login,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        };
      }

      throw new Error("Пользователь не найден");
    } catch (error: any) {
      console.error("Get user error:", error);
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Ошибка при получении данных",
      );
    }
  }

  logout(): void {
    // Очищаем все данные с префиксом auth_
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_userLogin");
    localStorage.removeItem("auth_userId");
    localStorage.removeItem("auth_isAuthenticated");
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("auth_isAuthenticated") === "true";
  }

  getCurrentUser(): UserData | null {
    const userStr = localStorage.getItem("auth_user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export default new AuthService();
