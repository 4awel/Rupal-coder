import { IncomingMessage, ServerResponse } from "http";
import { User } from "../models/User";
import { sendJSON } from "../utils/response";

export async function authenticate(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<any | null> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    sendJSON(res, 401, { error: "Требуется авторизация" });
    return null;
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8",
  );
  const [login, password] = credentials.split(":");

  if (!login || !password) {
    sendJSON(res, 401, { error: "Неверные учетные данные" });
    return null;
  }

  const user = await User.findOne({ login });

  if (!user) {
    sendJSON(res, 401, { error: "Пользователь не найден" });
    return null;
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    sendJSON(res, 401, { error: "Неверный пароль" });
    return null;
  }

  return user;
}
