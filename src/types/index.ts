// types.ts
export interface UserData {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthDate?: string;
  gender?: string;
  favoriteLanguages?: string[];
  biography?: string;
  comment?: string; // Делаем опциональным
  login: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  phone: string;
  password: string;
  email?: string;
}

export interface RegisterData {
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

export interface RegisterResponse {
  userId: string;
  login: string;
  token: string;
  message: string;
}

export interface AuthStateType {
  isAuthenticated: boolean;
  user: UserData | null;
  userLogin: string | null;
  userId: string | null;
  token: string | null; // Должен быть string | null
  isLoading: boolean;
  error: string | null;
  success?: boolean;
}

// Добавляем отдельный тип для ответа сервера при регистрации
export interface RegisterApiResponse {
  userId: string;
  login: string;
  token: string;
  message: string;
}

// Тип для ответа при входе
export interface LoginApiResponse {
  user: UserData;
  token: string;
}

// types.ts
export interface AuthStateType {
  isAuthenticated: boolean;
  user: UserData | null;
  userLogin: string | null;
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  success?: boolean;
  initialized?: boolean; // Добавляем
}

export interface FormStateType {
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
  success: boolean;
  isOpenModal: boolean;
  forms: UserData[];
  formsLoaded?: boolean; // Добавляем
}