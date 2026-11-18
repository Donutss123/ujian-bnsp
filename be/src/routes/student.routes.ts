
import { Router } from "express";

import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";

const router = Router();

// Mengambil seluruh siswa
router.get("/", getStudents);

// Mengambil detail siswa berdasarkan ID
router.get("/:id", getStudentById);

// Menambahkan siswa
router.post("/", createStudent);

// Mengubah data siswa
router.put("/:id", updateStudent);

// Menghapus siswa
router.delete("/:id", deleteStudent);

export default router;
