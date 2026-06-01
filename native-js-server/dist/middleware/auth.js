"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const User_1 = require("../models/User");
const response_1 = require("../utils/response");
async function authenticate(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        (0, response_1.sendJSON)(res, 401, { error: "Требуется авторизация" });
        return null;
    }
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [login, password] = credentials.split(":");
    if (!login || !password) {
        (0, response_1.sendJSON)(res, 401, { error: "Неверные учетные данные" });
        return null;
    }
    const user = await User_1.User.findOne({ login });
    if (!user) {
        (0, response_1.sendJSON)(res, 401, { error: "Пользователь не найден" });
        return null;
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        (0, response_1.sendJSON)(res, 401, { error: "Неверный пароль" });
        return null;
    }
    return user;
}
