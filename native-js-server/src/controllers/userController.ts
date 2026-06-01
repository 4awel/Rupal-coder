import { IncomingMessage, ServerResponse } from "http";
import { User } from "../models/User";
import { sendJSON, sendXML, parseBody } from "../utils/response";
import { authenticate } from "../middleware/auth";

export async function handleCreateUser(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const body = await parseBody(req);
    let userData: any = body;

    console.log("Received user data:", userData);

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

    // 🔧 Маппинг полей из фронтенда в серверные поля
    const mappedData = {
      name: userData.fullName || userData.name,
      phone: userData.phone,
      email: userData.email,
      birthDate: userData.birthDate,
      gender: userData.gender,
      favoriteLanguages: userData.favoriteLanguages || [],
      biography: userData.biography,
      comment: userData.comment || userData.biography,
      login: userData.login || userData.phone || userData.email,
      password: userData.password,
    };

    console.log("Mapped user data:", mappedData);

    // Валидация обязательных полей
    if (
      !mappedData.name ||
      !mappedData.phone ||
      !mappedData.email ||
      !mappedData.password
    ) {
      sendJSON(res, 400, {
        error: "Обязательные поля: ФИО, телефон, email, пароль",
        received: {
          name: !!mappedData.name,
          phone: !!mappedData.phone,
          email: !!mappedData.email,
          password: !!mappedData.password,
        },
      });
      return;
    }

    if (mappedData.password.length < 6) {
      sendJSON(res, 400, {
        error: "Пароль должен содержать минимум 6 символов",
      });
      return;
    }

    // Проверка email
    const existingEmail = await User.findOne({ email: mappedData.email });
    if (existingEmail) {
      sendJSON(res, 400, { error: "Email уже зарегистрирован" });
      return;
    }

    // Проверка телефона
    const existingPhone = await User.findOne({ phone: mappedData.phone });
    if (existingPhone) {
      sendJSON(res, 400, { error: "Телефон уже зарегистрирован" });
      return;
    }

    // Генерация уникального логина
    let login = mappedData.login;
    let counter = 1;
    let existingLogin = await User.findOne({ login });
    while (existingLogin) {
      login = `${mappedData.login}_${counter}`;
      existingLogin = await User.findOne({ login });
      counter++;
    }

    console.log("Creating user with login:", login);

    // Создаем пользователя со всеми полями
    const user = new User({
      name: mappedData.name,
      phone: mappedData.phone,
      email: mappedData.email,
      birthDate: mappedData.birthDate || "",
      gender: mappedData.gender || "",
      favoriteLanguages: mappedData.favoriteLanguages || [],
      biography: mappedData.biography || "",
      comment: mappedData.comment || "",
      login: login,
      password: mappedData.password,
    });

    await user.save();

    // Токен для автоматического входа
    const token = Buffer.from(`${login}:${mappedData.password}`).toString(
      "base64",
    );

    const responseData = {
      message: "Пользователь успешно создан",
      login: login,
      userId: user._id,
      token: token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        birthDate: user.birthDate,
        gender: user.gender,
        favoriteLanguages: user.favoriteLanguages,
        biography: user.biography,
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
    sendJSON(res, 500, {
      error: "Внутренняя ошибка сервера: " + (error as Error).message,
    });
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

    // Маппинг полей для обновления
    const mappedUpdate = {
      name: updateData.fullName || updateData.name,
      phone: updateData.phone,
      email: updateData.email,
      birthDate: updateData.birthDate,
      gender: updateData.gender,
      favoriteLanguages: updateData.favoriteLanguages,
      biography: updateData.biography,
      comment: updateData.comment || updateData.biography,
    };

    // Удаляем undefined поля
    Object.keys(mappedUpdate).forEach((key) => {
      if (mappedUpdate[key] === undefined) {
        delete mappedUpdate[key];
      }
    });

    delete mappedUpdate.login;
    delete mappedUpdate.password;
    delete mappedUpdate._id;
    delete mappedUpdate.createdAt;

    // Проверка email при обновлении
    if (mappedUpdate.email && mappedUpdate.email !== user.email) {
      const existingUser = await User.findOne({
        email: mappedUpdate.email,
        _id: { $ne: user._id },
      });
      if (existingUser) {
        sendJSON(res, 400, {
          error: "Email уже используется другим пользователем",
        });
        return;
      }
    }

    // Проверка телефона при обновлении
    if (mappedUpdate.phone && mappedUpdate.phone !== user.phone) {
      const existingUser = await User.findOne({
        phone: mappedUpdate.phone,
        _id: { $ne: user._id },
      });
      if (existingUser) {
        sendJSON(res, 400, {
          error: "Телефон уже используется другим пользователем",
        });
        return;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...mappedUpdate, updatedAt: new Date() },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      sendJSON(res, 404, { error: "Пользователь не найден" });
      return;
    }

    sendJSON(res, 200, {
      message: "Данные пользователя обновлены",
      user: updatedUser,
    });
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

// Логин пользователя (поддержка входа по phone или email)
// controllers/userController.ts - ПОЛНОСТЬЮ ИСПРАВЛЕННАЯ ВЕРСИЯ

export async function handleLogin(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const body = await parseBody(req);
    let { login, password, phone, email } = body;

    console.log("=== LOGIN ATTEMPT ===");
    console.log("Received:", { login, phone, email, hasPassword: !!password });

    // Проверка наличия пароля
    if (!password) {
      sendJSON(res, 400, { error: "Пароль обязателен" });
      return;
    }

    // Проверка наличия идентификатора
    if (!login && !phone && !email) {
      sendJSON(res, 400, { error: "Укажите логин, телефон или email" });
      return;
    }

    // Поиск пользователя
    let user = null;

    // Поиск по логину
    if (login) {
      user = await User.findOne({ login });
      if (user) console.log("Found by login:", user.login);
    }

    // Поиск по телефону (если не нашли по логину)
    if (!user && phone) {
      user = await User.findOne({ phone });
      if (user) console.log("Found by phone:", user.phone);
    }

    // Поиск по email (если не нашли по телефону)
    if (!user && email) {
      user = await User.findOne({ email });
      if (user) console.log("Found by email:", user.email);
    }

    if (!user) {
      console.log("User NOT FOUND");
      sendJSON(res, 401, { error: "Неверный логин/телефон/email или пароль" });
      return;
    }

    console.log("User found:", {
      login: user.login,
      phone: user.phone,
      email: user.email,
    });

    // ✅ КРИТИЧЕСКИ ВАЖНО: Проверяем пароль
    const isPasswordValid = await user.comparePassword(password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Invalid password for user:", user.login);
      sendJSON(res, 401, { error: "Неверный логин/телефон/email или пароль" });
      return;
    }

    // Генерируем токен
    const token = Buffer.from(`${user.login}:${password}`).toString("base64");

    const userData = user.toObject();
    delete userData.password;

    console.log("✅ Login successful for user:", user.login);

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
