
import type { Request, Response } from "express";
import pool from "../config/database.js";

// Memeriksa koneksi database
export const checkDatabase = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time"
    );

    res.status(200).json({
      success: true,
      message: "Database connection successful",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(503).json({
      success: false,
      message: "Database connection failed",
    });
  }
};
