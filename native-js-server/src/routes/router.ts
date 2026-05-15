import { IncomingMessage, ServerResponse } from "http";
import {
  handleCreateUser,
  handleUpdateUser,
  handleGetUser,
  handleLogin,
  handleGetAllUsers,
} from "../controllers/userController";
import { sendJSON } from "../utils/response";
import { authenticate } from "../middleware/auth";
import { User } from "../models/User";

export async function router(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = url.pathname;
  const method = req.method || "GET";

  if (method === "OPTIONS") {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    res.end();
    return;
  }

  // POST /api/form/send - отправка формы (создание пользователя)
  if (method === "POST" && pathname === "/api/form/send") {
    await handleCreateUser(req, res);
    return;
  }

  // GET /api/form/get - получение всех форм (всех пользователей)
  if (method === "GET" && pathname === "/api/form/get") {
    await handleGetAllUsers(req, res);
    return;
  }

  // POST /api/auth/login - вход пользователя
  if (method === "POST" && pathname === "/api/auth/login") {
    await handleLogin(req, res);
    return;
  }

  // POST /api/auth/register - регистрация
  if (method === "POST" && pathname === "/api/auth/register") {
    await handleCreateUser(req, res);
    return;
  }

  // GET /api/user/:id - получить пользователя по ID
  if (
    method === "GET" &&
    pathname.startsWith("/api/user/") &&
    pathname !== "/api/user/me"
  ) {
    const userId = pathname.split("/")[3];
    if (userId) {
      await handleGetUser(req, res, userId);
      return;
    }
  }

  // GET /api/user/me - получить текущего авторизованного пользователя
  if (method === "GET" && pathname === "/api/user/me") {
    const user = await authenticate(req, res);
    if (user) {
      const userData = user.toObject();
      delete userData.password;
      sendJSON(res, 200, userData);
    }
    return;
  }

  // PUT /api/user/:id - обновить пользователя
  if (
    method === "PUT" &&
    pathname.startsWith("/api/user/") &&
    pathname !== "/api/user/me"
  ) {
    const userId = pathname.split("/")[3];
    if (userId) {
      await handleUpdateUser(req, res, userId);
      return;
    }
  }

  // PUT /api/user/me - обновить текущего пользователя
  if (method === "PUT" && pathname === "/api/user/me") {
    const user = await authenticate(req, res);
    if (user) {
      await handleUpdateUser(req, res, user._id.toString());
    }
    return;
  }

  // DELETE /api/user/:id - удалить пользователя
  if (method === "DELETE" && pathname.startsWith("/api/user/")) {
    const userId = pathname.split("/")[3];
    if (userId && userId !== "me") {
      const user = await authenticate(req, res);
      if (user && user._id.toString() === userId) {
        try {
          await User.findByIdAndDelete(userId);
          sendJSON(res, 200, { message: "Пользователь удален" });
        } catch (error) {
          sendJSON(res, 500, { error: "Ошибка при удалении" });
        }
      } else {
        sendJSON(res, 403, { error: "Нет прав для удаления" });
      }
      return;
    }
  }

  // GET /api/check-email/:email - проверка существования email
  if (method === "GET" && pathname.startsWith("/api/check-email/")) {
    const email = decodeURIComponent(pathname.split("/")[3]);
    try {
      const existingUser = await User.findOne({ email });
      sendJSON(res, 200, { exists: !!existingUser });
    } catch (error) {
      sendJSON(res, 500, { error: "Ошибка проверки email" });
    }
    return;
  }

  // GET /api/check-login/:login - проверка существования логина
  if (method === "GET" && pathname.startsWith("/api/check-login/")) {
    const login = decodeURIComponent(pathname.split("/")[3]);
    try {
      const existingUser = await User.findOne({ login });
      sendJSON(res, 200, { exists: !!existingUser });
    } catch (error) {
      sendJSON(res, 500, { error: "Ошибка проверки логина" });
    }
    return;
  }

  // POST /api/contact/send - отдельный эндпоинт для контактной формы
  if (method === "POST" && pathname === "/api/contact/send") {
    try {
      const body = await parseBody(req);
      console.log("Contact form submission:", body);
      sendJSON(res, 200, {
        message: "Сообщение отправлено",
        data: body,
      });
    } catch (error) {
      sendJSON(res, 500, { error: "Ошибка при отправке сообщения" });
    }
    return;
  }

  // GET /api/health - проверка работоспособности
  if (method === "GET" && pathname === "/api/health") {
    sendJSON(res, 200, {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
    return;
  }

  // GET / - корневой эндпоинт
  if (method === "GET" && pathname === "/") {
    sendJSON(res, 200, {
      message: "API Server is running",
      version: "1.0.0",
      endpoints: {
        forms: {
          "POST /api/form/send": "Отправить форму регистрации",
          "GET /api/form/get": "Получить все формы",
        },
        auth: {
          "POST /api/auth/login": "Вход пользователя",
          "POST /api/auth/register": "Регистрация пользователя",
        },
        users: {
          "GET /api/user/:id": "Получить пользователя по ID",
          "GET /api/user/me": "Получить текущего пользователя",
          "PUT /api/user/:id": "Обновить пользователя",
          "PUT /api/user/me": "Обновить текущего пользователя",
          "DELETE /api/user/:id": "Удалить пользователя",
        },
        utils: {
          "GET /api/check-email/:email": "Проверить существование email",
          "GET /api/check-login/:login": "Проверить существование логина",
          "POST /api/contact/send": "Отправить контактную форму",
          "GET /api/health": "Проверка здоровья сервера",
        },
      },
    });
    return;
  }

  // 404 - Not Found
  sendJSON(res, 404, {
    error: "Endpoint не найден",
    path: pathname,
    method: method,
  });
}
