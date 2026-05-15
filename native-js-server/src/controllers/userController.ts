import { IncomingMessage, ServerResponse } from "http";
import { User } from "../models/User";
import {
  validateUserData,
  generateLoginAndPassword,
} from "../utils/validators";
import { sendJSON, sendXML, parseBody } from "../utils/response";
import { authenticate } from "../middleware/auth";

export async function handleCreateUser(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const body = await parseBody(req);
    let userData: any = body;

    // Парсим XML если нужно
    if (body.rawXml) {
      const xml2js = await import("xml2js");
      const parser = new xml2js.Parser();
      userData = await parser.parseStringPromise(body.rawXml);
      userData = userData.root || userData.user || userData;
      Object.keys(userData).forEach((key) => {
        if (Array.isArray(userData[key]) && userData[key].length === 1) {
          userData[key] = userData[key][0];
        }
      });
    }

    // Валидация
    const validation = validateUserData(userData);
    if (!validation.isValid) {
      const acceptHeader = req.headers.accept || "";
      if (acceptHeader.includes("application/xml")) {
        sendXML(res, 400, { error: validation.errors.join(", ") });
      } else {
        sendJSON(res, 400, { errors: validation.errors });
      }
      return;
    }

    // 🔧 Проверка email
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      sendJSON(res, 400, { error: "Email уже зарегистрирован" });
      return;
    }

    // 🔧 Логин: либо пользовательский, либо из email
    let login = userData.login;
    if (!login) {
      login = userData.email; // Используем email как логин
    }
    
    // Проверка уникальности логина
    const existingLogin = await User.findOne({ login });
    if (existingLogin) {
      sendJSON(res, 400, { error: "Логин уже занят" });
      return;
    }

    // 🔧 Пароль
    let password = userData.password;
    if (!password) {
      // Генерируем временный пароль
      password = Math.random().toString(36).substring(2, 12) + 
                 Math.random().toString(36).substring(2, 12);
    } else if (password.length < 6) {
      sendJSON(res, 400, {
        error: "Пароль должен содержать минимум 6 символов",
      });
      return;
    }

    console.log("Creating user with login:", login);

    const user = new User({
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      comment: userData.comment,
      login: login,
      password: password,
    });

    await user.save();

    // 🔧 Токен для автоматического входа после регистрации
    const token = Buffer.from(`${login}:${password}`).toString("base64");

    const responseData = {
      message: "Пользователь успешно создан",
      login: login,
      password: password,
      profileUrl: `/profile/${user._id}`,
      userId: user._id,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        comment: user.comment,
        login: login,
      },
    };

    const acceptHeader = req.headers.accept || "";
    if (acceptHeader.includes("application/xml")) {
      sendXML(res, 201, responseData);
    } else {
      sendJSON(res, 201, responseData);
    }
  } catch (error) {
    console.error("Create user error:", error);
    sendJSON(res, 500, { error: "Внутренняя ошибка сервера" });
  }
}
// Обновление пользователя
export async function handleUpdateUser(
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
): Promise<void> {
  try {
    const user = await authenticate(req, res);
    if (!user) return;

    if (user._id.toString() !== userId) {
      sendJSON(res, 403, {
        error: "Нет прав для редактирования этого пользователя",
      });
      return;
    }

    const body = await parseBody(req);
    let updateData: any = body;

    if (body.rawXml) {
      const xml2js = await import("xml2js");
      const parser = new xml2js.Parser();
      updateData = await parser.parseStringPromise(body.rawXml);
      updateData = updateData.root || updateData.user || updateData;
      Object.keys(updateData).forEach((key) => {
        if (Array.isArray(updateData[key]) && updateData[key].length === 1) {
          updateData[key] = updateData[key][0];
        }
      });
    }

    delete updateData.login;
    delete updateData.password;
    delete updateData._id;
    delete updateData.createdAt;

    const validation = validateUserData(updateData);
    if (!validation.isValid) {
      sendJSON(res, 400, { errors: validation.errors });
      return;
    }

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await User.findOne({
        email: updateData.email,
        _id: { $ne: user._id },
      });
      if (existingUser) {
        sendJSON(res, 400, {
          error: "Email уже используется другим пользователем",
        });
        return;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      sendJSON(res, 404, { error: "Пользователь не найден" });
      return;
    }

    const responseData = {
      message: "Данные пользователя обновлены",
      user: {
        name: updatedUser.name,
        phone: updatedUser.phone,
        email: updatedUser.email,
        comment: updatedUser.comment,
        updatedAt: updatedUser.updatedAt,
      },
    };

    sendJSON(res, 200, responseData);
  } catch (error) {
    console.error("Update user error:", error);
    sendJSON(res, 500, { error: "Внутренняя ошибка сервера" });
  }
}

// Получение пользователя
export async function handleGetUser(
  req: IncomingMessage,
  res: ServerResponse,
  userId: string,
): Promise<void> {
  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      sendJSON(res, 404, { error: "Пользователь не найден" });
      return;
    }

    const acceptHeader = req.headers.accept || "";
    if (acceptHeader.includes("application/xml")) {
      sendXML(res, 200, user.toObject());
    } else {
      sendJSON(res, 200, user);
    }
  } catch (error) {
    console.error("Get user error:", error);
    sendJSON(res, 500, { error: "Внутренняя ошибка сервера" });
  }
}

// Логин пользователя
export async function handleLogin(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const body = await parseBody(req);
    let { login, password } = body;

    console.log("Login attempt:", { login, password: password });

    // Поддержка как JSON, так и XML
    if (body.rawXml) {
      const xml2js = await import("xml2js");
      const parser = new xml2js.Parser();
      const parsed = await parser.parseStringPromise(body.rawXml);
      login = parsed.login?.[0] || parsed.root?.login?.[0];
      password = parsed.password?.[0] || parsed.root?.password?.[0];
    }

    if (!login || !password) {
      sendJSON(res, 400, { error: "Логин и пароль обязательны" });
      return;
    }

    // Ищем пользователя по логину
    const user = await User.findOne({ login });

    if (!user) {
      console.log("User not found:", login);
      sendJSON(res, 401, { error: "Неверный логин или пароль" });
      return;
    }

    // Проверяем пароль
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", login);
      sendJSON(res, 401, { error: "Неверный логин или пароль" });
      return;
    }

    // Генерируем токен (Basic auth)
    const token = Buffer.from(`${login}:${password}`).toString("base64");

    const userData = user.toObject();
    delete userData.password;

    console.log("Login successful:", login);

    sendJSON(res, 200, {
      message: "Успешный вход",
      user: userData,
      token: token,
      userId: user._id,
      userLogin: user.login,
    });
  } catch (error) {
    console.error("Login error:", error);
    sendJSON(res, 500, { error: "Внутренняя ошибка сервера" });
  }
}

// Получение всех пользователей
export async function handleGetAllUsers(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const users = await User.find().select("-password");

    // Поддержка XML если нужно
    const acceptHeader = req.headers.accept || "";
    if (acceptHeader.includes("application/xml")) {
      sendXML(res, 200, { users: users.map((u) => u.toObject()) });
    } else {
      sendJSON(res, 200, users);
    }
  } catch (error) {
    console.error("Get all users error:", error);
    sendJSON(res, 500, { error: "Ошибка получения пользователей" });
  }
}
