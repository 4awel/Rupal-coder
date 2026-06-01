"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateUser = handleCreateUser;
exports.handleUpdateUser = handleUpdateUser;
exports.handleGetUser = handleGetUser;
exports.handleLogin = handleLogin;
exports.handleGetAllUsers = handleGetAllUsers;
const User_1 = require("../models/User");
const validators_1 = require("../utils/validators");
const response_1 = require("../utils/response");
const auth_1 = require("../middleware/auth");
async function handleCreateUser(req, res) {
    try {
        const body = await (0, response_1.parseBody)(req);
        let userData = body;
        // Парсим XML если нужно
        if (body.rawXml) {
            const xml2js = await Promise.resolve().then(() => __importStar(require("xml2js")));
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
        const validation = (0, validators_1.validateUserData)(userData);
        if (!validation.isValid) {
            const acceptHeader = req.headers.accept || "";
            if (acceptHeader.includes("application/xml")) {
                (0, response_1.sendXML)(res, 400, { error: validation.errors.join(", ") });
            }
            else {
                (0, response_1.sendJSON)(res, 400, { errors: validation.errors });
            }
            return;
        }
        // 🔧 Проверка email
        const existingUser = await User_1.User.findOne({ email: userData.email });
        if (existingUser) {
            (0, response_1.sendJSON)(res, 400, { error: "Email уже зарегистрирован" });
            return;
        }
        // 🔧 Логин: либо пользовательский, либо из email
        let login = userData.login;
        if (!login) {
            login = userData.email; // Используем email как логин
        }
        // Проверка уникальности логина
        const existingLogin = await User_1.User.findOne({ login });
        if (existingLogin) {
            (0, response_1.sendJSON)(res, 400, { error: "Логин уже занят" });
            return;
        }
        // 🔧 Пароль
        let password = userData.password;
        if (!password) {
            // Генерируем временный пароль
            password = Math.random().toString(36).substring(2, 12) +
                Math.random().toString(36).substring(2, 12);
        }
        else if (password.length < 6) {
            (0, response_1.sendJSON)(res, 400, {
                error: "Пароль должен содержать минимум 6 символов",
            });
            return;
        }
        console.log("Creating user with login:", login);
        const user = new User_1.User({
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
            (0, response_1.sendXML)(res, 201, responseData);
        }
        else {
            (0, response_1.sendJSON)(res, 201, responseData);
        }
    }
    catch (error) {
        console.error("Create user error:", error);
        (0, response_1.sendJSON)(res, 500, { error: "Внутренняя ошибка сервера" });
    }
}
// Обновление пользователя
async function handleUpdateUser(req, res, userId) {
    try {
        const user = await (0, auth_1.authenticate)(req, res);
        if (!user)
            return;
        if (user._id.toString() !== userId) {
            (0, response_1.sendJSON)(res, 403, {
                error: "Нет прав для редактирования этого пользователя",
            });
            return;
        }
        const body = await (0, response_1.parseBody)(req);
        let updateData = body;
        if (body.rawXml) {
            const xml2js = await Promise.resolve().then(() => __importStar(require("xml2js")));
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
        const validation = (0, validators_1.validateUserData)(updateData);
        if (!validation.isValid) {
            (0, response_1.sendJSON)(res, 400, { errors: validation.errors });
            return;
        }
        if (updateData.email && updateData.email !== user.email) {
            const existingUser = await User_1.User.findOne({
                email: updateData.email,
                _id: { $ne: user._id },
            });
            if (existingUser) {
                (0, response_1.sendJSON)(res, 400, {
                    error: "Email уже используется другим пользователем",
                });
                return;
            }
        }
        const updatedUser = await User_1.User.findByIdAndUpdate(userId, { ...updateData, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!updatedUser) {
            (0, response_1.sendJSON)(res, 404, { error: "Пользователь не найден" });
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
        (0, response_1.sendJSON)(res, 200, responseData);
    }
    catch (error) {
        console.error("Update user error:", error);
        (0, response_1.sendJSON)(res, 500, { error: "Внутренняя ошибка сервера" });
    }
}
// Получение пользователя
async function handleGetUser(req, res, userId) {
    try {
        const user = await User_1.User.findById(userId).select("-password");
        if (!user) {
            (0, response_1.sendJSON)(res, 404, { error: "Пользователь не найден" });
            return;
        }
        const acceptHeader = req.headers.accept || "";
        if (acceptHeader.includes("application/xml")) {
            (0, response_1.sendXML)(res, 200, user.toObject());
        }
        else {
            (0, response_1.sendJSON)(res, 200, user);
        }
    }
    catch (error) {
        console.error("Get user error:", error);
        (0, response_1.sendJSON)(res, 500, { error: "Внутренняя ошибка сервера" });
    }
}
// Логин пользователя
async function handleLogin(req, res) {
    try {
        const body = await (0, response_1.parseBody)(req);
        let { login, password } = body;
        console.log("Login attempt:", { login, password: password });
        // Поддержка как JSON, так и XML
        if (body.rawXml) {
            const xml2js = await Promise.resolve().then(() => __importStar(require("xml2js")));
            const parser = new xml2js.Parser();
            const parsed = await parser.parseStringPromise(body.rawXml);
            login = parsed.login?.[0] || parsed.root?.login?.[0];
            password = parsed.password?.[0] || parsed.root?.password?.[0];
        }
        if (!login || !password) {
            (0, response_1.sendJSON)(res, 400, { error: "Логин и пароль обязательны" });
            return;
        }
        // Ищем пользователя по логину
        const user = await User_1.User.findOne({ login });
        if (!user) {
            console.log("User not found:", login);
            (0, response_1.sendJSON)(res, 401, { error: "Неверный логин или пароль" });
            return;
        }
        // Проверяем пароль
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            console.log("Invalid password for user:", login);
            (0, response_1.sendJSON)(res, 401, { error: "Неверный логин или пароль" });
            return;
        }
        // Генерируем токен (Basic auth)
        const token = Buffer.from(`${login}:${password}`).toString("base64");
        const userData = user.toObject();
        delete userData.password;
        console.log("Login successful:", login);
        (0, response_1.sendJSON)(res, 200, {
            message: "Успешный вход",
            user: userData,
            token: token,
            userId: user._id,
            userLogin: user.login,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        (0, response_1.sendJSON)(res, 500, { error: "Внутренняя ошибка сервера" });
    }
}
// Получение всех пользователей
async function handleGetAllUsers(req, res) {
    try {
        const users = await User_1.User.find().select("-password");
        // Поддержка XML если нужно
        const acceptHeader = req.headers.accept || "";
        if (acceptHeader.includes("application/xml")) {
            (0, response_1.sendXML)(res, 200, { users: users.map((u) => u.toObject()) });
        }
        else {
            (0, response_1.sendJSON)(res, 200, users);
        }
    }
    catch (error) {
        console.error("Get all users error:", error);
        (0, response_1.sendJSON)(res, 500, { error: "Ошибка получения пользователей" });
    }
}
