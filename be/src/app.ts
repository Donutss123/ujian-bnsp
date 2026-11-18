
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import studentRoutes from "./routes/student.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middleware utama
app.use(cors());
app.use(express.json());

// Health check server
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API is running",
  });
});

// Health check database
app.use("/api/health", healthRoutes);

// Student API
app.use("/api/students", studentRoutes);

// Handler endpoint yang tidak ditemukan
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Error handler harus diletakkan paling akhir
app.use(errorHandler);

export default app;
