
import type { Request, Response, NextFunction } from "express";

import * as studentService from "../services/student.service.js";

import {
  studentSchema,
  studentQuerySchema,
  studentIdSchema,
} from "../validators/student.validator.js";

import { AppError } from "../utils/app-error.js";

// GET: Mengambil seluruh siswa
export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedQuery = studentQuerySchema.safeParse(req.query);

    if (!parsedQuery.success) {
      throw new AppError(400, "Parameter pencarian tidak valid");
    }

    const result = await studentService.getAllStudents(
      parsedQuery.data
    );

    res.status(200).json({
      success: true,
      message: "Data siswa berhasil diambil",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

// GET: Mengambil detail siswa
export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedId = studentIdSchema.safeParse(req.params.id);

    if (!parsedId.success) {
      throw new AppError(400, "Format ID siswa tidak valid");
    }

    const student = await studentService.getStudentById(
      parsedId.data
    );

    res.status(200).json({
      success: true,
      message: "Detail siswa berhasil diambil",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// POST: Menambahkan siswa
export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedBody = studentSchema.safeParse(req.body);

    if (!parsedBody.success) {
      throw new AppError(400, "Data siswa tidak valid");
    }

    const student = await studentService.createStudent(
      parsedBody.data
    );

    res.status(201).json({
      success: true,
      message: "Siswa berhasil ditambahkan",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// PUT: Mengubah data siswa
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedId = studentIdSchema.safeParse(req.params.id);
    const parsedBody = studentSchema.safeParse(req.body);

    if (!parsedId.success) {
      throw new AppError(400, "Format ID siswa tidak valid");
    }

    if (!parsedBody.success) {
      throw new AppError(400, "Data siswa tidak valid");
    }

    const student = await studentService.updateStudent(
      parsedId.data,
      parsedBody.data
    );

    res.status(200).json({
      success: true,
      message: "Data siswa berhasil diperbarui",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE: Menghapus siswa
export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const parsedId = studentIdSchema.safeParse(req.params.id);

    if (!parsedId.success) {
      throw new AppError(400, "Format ID siswa tidak valid");
    }

    const student = await studentService.deleteStudent(
      parsedId.data
    );

    res.status(200).json({
      success: true,
      message: "Siswa berhasil dihapus",
      data: student,
    });
  } catch (error) {
    next(error);
  }
};
