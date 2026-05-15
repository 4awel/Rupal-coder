import http from "http";
import { connectDB } from "./utils/db";
import { router } from "./routes/router";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT || "3006", 10);

const server = http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (error) {
    console.error("Server error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Внутренняя ошибка сервера" }));
  }
});

async function startServer() {
  await connectDB();

  server.listen(PORT, () => {
    console.log(
      `🚀 Native TypeScript server running on http://localhost:${PORT}`,
    );
    console.log(`📝 Endpoints:`);
    console.log(`   POST   http://localhost:${PORT}/api/form/send`);
    console.log(`   GET    http://localhost:${PORT}/api/form/get`);
    console.log(`   GET    http://localhost:${PORT}/api/user/:id`);
    console.log(
      `   PUT    http://localhost:${PORT}/api/user/:id (requires Basic Auth)`,
    );
  });
}

startServer();

process.on("SIGINT", () => {
  console.log("\n👋 Shutting down server...");
  server.close(() => {
    process.exit(0);
  });
});
