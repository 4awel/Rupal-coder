import { UserData } from "../types";

export function validateUserData(data: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length < 2
  ) {
    errors.push("Имя должно содержать минимум 2 символа");
  }

  if (!data.phone || typeof data.phone !== "string") {
    errors.push("Телефон обязателен");
  } else {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
      errors.push("Неверный формат телефона");
    }
  }

  if (!data.email || typeof data.email !== "string") {
    errors.push("Email обязателен");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push("Неверный формат email");
    }
  }

  if (
    !data.comment ||
    typeof data.comment !== "string" ||
    data.comment.trim().length < 1
  ) {
    errors.push("Комментарий не может быть пустым");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function generateLoginAndPassword(
  email: string,
  name: string,
): { login: string; password: string } {
  const login =
    email.split("@")[0] + "_" + Math.random().toString(36).substring(2, 8);
  const password =
    Math.random().toString(36).substring(2, 12) +
    Math.random().toString(36).substring(2, 12);
  return { login, password };
}
