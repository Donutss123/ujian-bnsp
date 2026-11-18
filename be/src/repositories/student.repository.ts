
import pool from "../config/database.js";

import type {
  Student,
  CreateStudentInput,
  UpdateStudentInput,
  StudentQuery,
  PaginatedStudents,
} from "../types/student.types.js";

// Mengambil data siswa dengan pagination, search, dan filter
export const findAll = async (
  query: StudentQuery
): Promise<PaginatedStudents> => {
  const { page, limit, search, jurusan } = query;

  const conditions: string[] = [];
  const values: unknown[] = [];

  // Filter berdasarkan kode atau nama siswa
  if (search) {
    values.push(`%${search}%`);

    conditions.push(
      `(kode_siswa ILIKE $${values.length}
      OR nama_siswa ILIKE $${values.length})`
    );
  }

  // Filter berdasarkan jurusan
  if (jurusan) {
    values.push(jurusan);
    conditions.push(`jurusan = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  // Menghitung total data sesuai filter
  const countResult = await pool.query<{ count: string }>(
    `SELECT COUNT(*) AS count
     FROM students
     ${whereClause}`,
    values
  );

  const totalData = Number(countResult.rows[0].count);

  // Menghitung offset pagination
  const offset = (page - 1) * limit;

  const dataValues = [...values, limit, offset];

  // Mengambil data sesuai halaman
  const result = await pool.query<Student>(
    `SELECT *
     FROM students
     ${whereClause}
     ORDER BY kode_siswa ASC
     LIMIT $${dataValues.length - 1}
     OFFSET $${dataValues.length}`,
    dataValues
  );

  return {
    data: result.rows,
    pagination: {
      currentPage: page,
      limit,
      totalData,
      totalPages: Math.ceil(totalData / limit),
    },
  };
};

// Mengambil satu siswa berdasarkan ID
export const findById = async (
  id: string
): Promise<Student | null> => {
  const result = await pool.query<Student>(
    "SELECT * FROM students WHERE id = $1",
    [id]
  );

  return result.rows[0] ?? null;
};

// Menambahkan siswa baru
export const create = async (
  input: CreateStudentInput
): Promise<Student> => {
  const {
    kode_siswa,
    nama_siswa,
    jurusan,
    tanggal_lahir,
    alamat,
  } = input;

  const result = await pool.query<Student>(
    `INSERT INTO students (
      kode_siswa,
      nama_siswa,
      jurusan,
      tanggal_lahir,
      alamat
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [kode_siswa, nama_siswa, jurusan, tanggal_lahir, alamat]
  );

  return result.rows[0];
};

// Mengubah data siswa
export const update = async (
  id: string,
  input: UpdateStudentInput
): Promise<Student | null> => {
  const {
    kode_siswa,
    nama_siswa,
    jurusan,
    tanggal_lahir,
    alamat,
  } = input;

  const result = await pool.query<Student>(
    `UPDATE students
     SET
       kode_siswa = $1,
       nama_siswa = $2,
       jurusan = $3,
       tanggal_lahir = $4,
       alamat = $5
     WHERE id = $6
     RETURNING *`,
    [kode_siswa, nama_siswa, jurusan, tanggal_lahir, alamat, id]
  );

  return result.rows[0] ?? null;
};

// Menghapus siswa
export const remove = async (
  id: string
): Promise<Student | null> => {
  const result = await pool.query<Student>(
    `DELETE FROM students
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0] ?? null;
};
