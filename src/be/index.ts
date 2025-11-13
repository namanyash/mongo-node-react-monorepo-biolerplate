import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
console.log("🔍 Loading AppConfig...");
import { AppConfig } from "./AppConfig";
console.log("✅ AppConfig loaded, PORT:", AppConfig.APP_PORT.value);
import { Database } from "./database";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = AppConfig.APP_PORT.value;
const db = Database.getInstance();

// Connect to MongoDB on startup (non-blocking)
db.connect().catch((err) => console.log("MongoDB connection failed on startup:", err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

app.get("/api/build", (req: Request, res: Response) => {
  try {
    const buildPath = path.join(__dirname, "../build.json");
    if (fs.existsSync(buildPath)) {
      const buildInfo = JSON.parse(fs.readFileSync(buildPath, "utf-8"));
      res.json(buildInfo);
    } else {
      res.status(404).json({ error: "build.json not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to read build.json" });
  }
});

app.get("/api/db-test", async (req: Request, res: Response) => {
  try {
    const result = await db.testConnection();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database test failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../../dist")));

// Catch-all route for React Router
app.get("/*any", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

console.log(`🚀 Backend running at http://localhost:${PORT}`);
