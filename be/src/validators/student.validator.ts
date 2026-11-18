import { z } from "zod";
import { STUDENT_MAJORS } from "../constants/student.constants.js";

// Validasi format tanggal lahir
const dateSchema = z.string().refine((value) => {
  const date = new Date(`${value}T00:00:00.000Z`);

  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}, "Format tanggal harus YYYY-MM-DD dan merupakan tanggal yang valid");

// Validasi data siswa
export const studentSchema = z.object({
  kode_siswa: z.string().trim().min(1).max(20),
  nama_siswa: z.string().trim().min(1).max(100),
  jurusan: z.enum(STUDENT_MAJORS),
  tanggal_lahir: dateSchema,
  alamat: z.string().trim().min(1),
});

// Validasi parameter pagination dan pencarian
export const studentQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(5),
  search: z.string().trim().optional(),
  jurusan: z.enum(STUDENT_MAJORS).optional(),
});

// Validasi UUID
export const studentIdSchema = z.string().uuid();