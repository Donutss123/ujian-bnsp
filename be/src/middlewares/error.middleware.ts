
import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/app-error.js";

interface DatabaseError extends Error {
  code?: string;
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next
) => {
  // Menangani error dari aplikasi
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  // Menangani error dari PostgreSQL
  const databaseError = error as DatabaseError;

  if (databaseError.code === "23505") {
    res.status(409).json({
      success: false,
      message: "Kode siswa sudah digunakan",
    });

    return;
  }

  if (databaseError.code === "23514") {
    res.status(400).json({
      success: false,
      message: "Data tidak memenuhi aturan database",
    });

    return;
  }

  if (databaseError.code === "23502") {
    res.status(400).json({
      success: false,
      message: "Kolom wajib tidak boleh kosong",
    });

    return;
  }

  // Menangani error yang tidak dikenal
  console.error("Unexpected error:", error);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
};
