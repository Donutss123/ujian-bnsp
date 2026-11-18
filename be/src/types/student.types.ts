// Representasi data siswa dari database
export interface Student {
  id: string;
  kode_siswa: string;
  nama_siswa: string;
  jurusan: string;
  tanggal_lahir: string;
  alamat: string;
}

// Data yang diperlukan ketika membuat siswa
export interface CreateStudentInput {
  kode_siswa: string;
  nama_siswa: string;
  jurusan: string;
  tanggal_lahir: string;
  alamat: string;
}

// Data yang diperlukan ketika mengubah siswa
export type UpdateStudentInput = CreateStudentInput;

// Parameter pencarian dan pagination
export interface StudentQuery {
  page: number;
  limit: number;
  search?: string;
  jurusan?: string;
}

// Format response pagination
export interface PaginatedStudents {
  data: Student[];
  pagination: {
    currentPage: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}