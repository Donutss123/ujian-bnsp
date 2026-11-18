
import * as studentRepository from "../repositories/student.repository.js";
import { AppError } from "../utils/app-error.js";

import type {
  CreateStudentInput,
  UpdateStudentInput,
  StudentQuery,
} from "../types/student.types.js";

// Mengambil seluruh siswa
export const getAllStudents = async (query: StudentQuery) => {
  return await studentRepository.findAll(query);
};

// Mengambil detail siswa
export const getStudentById = async (id: string) => {
  const student = await studentRepository.findById(id);

  if (!student) {
    throw new AppError(404, "Siswa tidak ditemukan");
  }

  return student;
};

// Menambahkan siswa
export const createStudent = async (
  input: CreateStudentInput
) => {
  return await studentRepository.create(input);
};

// Mengubah siswa
export const updateStudent = async (
  id: string,
  input: UpdateStudentInput
) => {
  const existingStudent = await studentRepository.findById(id);

  if (!existingStudent) {
    throw new AppError(404, "Siswa tidak ditemukan");
  }

  return await studentRepository.update(id, input);
};

// Menghapus siswa
export const deleteStudent = async (id: string) => {
  const existingStudent = await studentRepository.findById(id);

  if (!existingStudent) {
    throw new AppError(404, "Siswa tidak ditemukan");
  }

  return await studentRepository.remove(id);
};
