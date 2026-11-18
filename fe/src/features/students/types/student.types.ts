
export interface Student {
  id: string;
  kode_siswa: string;
  nama_siswa: string;
  jurusan: string;
  tanggal_lahir: string;
  alamat: string;
}

export interface StudentFormData {
  kode_siswa: string;
  nama_siswa: string;
  jurusan: string;
  tanggal_lahir: string;
  alamat: string;
}

export interface StudentQuery {
  page: number;
  limit: number;
  search?: string;
  jurusan?: string;
}

export interface Pagination {
  currentPage: number;
  limit: number;
  totalData: number;
  totalPages: number;
}

export interface StudentListResponse {
  success: boolean;
  message: string;
  data: Student[];
  pagination: Pagination;
}

export interface StudentResponse {
  success: boolean;
  message: string;
  data: Student;
}
