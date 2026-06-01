"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const db_1 = require("./utils/db");
const router_1 = require("./routes/router");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = parseInt(process.env.PORT || "3006", 10);
const server = http_1.default.createServer(async (req, res) => {
    try {
        await (0, router_1.router)(req, res);
    }
    catch (error) {
        console.error("Server error:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Внутренняя ошибка сервера" }));
    }
});
async function startServer() {
    await (0, db_1.connectDB)();
    server.listen(PORT, () => {
        console.log(`🚀 Native TypeScript server running on http://localhost:${PORT}`);
        console.log(`📝 Endpoints:`);
        console.log(`   POST   http://localhost:${PORT}/api/form/send`);
        console.log(`   GET    http://localhost:${PORT}/api/form/get`);
        console.log(`   GET    http://localhost:${PORT}/api/user/:id`);
        console.log(`   PUT    http://localhost:${PORT}/api/user/:id (requires Basic Auth)`);
    });
}
startServer();
process.on("SIGINT", () => {
    console.log("\n👋 Shutting down server...");
    server.close(() => {
        process.exit(0);
    });
});
