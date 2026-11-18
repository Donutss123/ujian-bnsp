
import { apiRequest } from "../../../lib/api";

import type {
  StudentQuery,
  StudentFormData,
  StudentListResponse,
  StudentResponse,
} from "../types/student.types";

// Mengambil daftar siswa
export const getStudents = (
  query: StudentQuery
): Promise<StudentListResponse> => {
  const params = new URLSearchParams();

  params.set("page", String(query.page));
  params.set("limit", String(query.limit));

  if (query.search) {
    params.set("search", query.search);
  }

  if (query.jurusan) {
    params.set("jurusan", query.jurusan);
  }

  return apiRequest<StudentListResponse>(
    `/students?${params.toString()}`
  );
};

// Mengambil detail siswa
export const getStudentById = (
  id: string
): Promise<StudentResponse> => {
  return apiRequest<StudentResponse>(`/students/${id}`);
};

// Menambahkan siswa
export const createStudent = (
  data: StudentFormData
): Promise<StudentResponse> => {
  return apiRequest<StudentResponse>("/students", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Mengubah siswa
export const updateStudent = (
  id: string,
  data: StudentFormData
): Promise<StudentResponse> => {
  return apiRequest<StudentResponse>(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// Menghapus siswa
export const deleteStudent = (
  id: string
): Promise<StudentResponse> => {
  return apiRequest<StudentResponse>(`/students/${id}`, {
    method: "DELETE",
  });
};
