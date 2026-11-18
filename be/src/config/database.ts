
import "dotenv/config";
import { Pool } from "pg";

// Mengambil konfigurasi database dari environment
const getRequiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} belum diatur`);
  }

  return value;
};

// Membuat connection pool PostgreSQL
const pool = new Pool({
  host: getRequiredEnv("DB_HOST"),
  port: Number(process.env.DB_PORT ?? 5432),
  user: getRequiredEnv("DB_USER"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_NAME"),
});

// Menangani error koneksi idle
pool.on("error", (error) => {
  console.error("Unexpected database error:", error);
});

export default pool;
