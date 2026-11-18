
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { X, Save } from "lucide-react";

import type {
  Student,
  StudentFormData,
} from "../types/student.types";

import { STUDENT_MAJORS } from "../constants/student.constants";

interface StudentFormModalProps {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => Promise<void>;
}

const initialForm: StudentFormData = {
  kode_siswa: "",
  nama_siswa: "",
  jurusan: "RPL",
  tanggal_lahir: "",
  alamat: "",
};

function StudentFormModal({
  isOpen,
  student,
  onClose,
  onSubmit,
}: StudentFormModalProps) {
  const [formData, setFormData] =
    useState<StudentFormData>(initialForm);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Isi form dengan data siswa saat mode edit.
  // Kosongkan form saat mode tambah.
  useEffect(() => {
    if (student) {
      setFormData({
        kode_siswa: student.kode_siswa,
        nama_siswa: student.nama_siswa,
        jurusan: student.jurusan,
        tanggal_lahir: student.tanggal_lahir.slice(0, 10),
        alamat: student.alamat,
      });
    } else {
      setFormData(initialForm);
    }
  }, [student, isOpen]);

  if (!isOpen) return null;

  // Mengubah nilai input sesuai field yang diedit.
  const handleChange = (
    field: keyof StudentFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Mengirim data form ke komponen halaman.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl">

        {/* Header modal */}
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {student ? "Edit Data Siswa" : "Tambah Siswa"}
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              {student
                ? "Perbarui informasi siswa."
                : "Masukkan informasi siswa baru."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-text-secondary transition hover:bg-surface-hover hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5">

          {/* Kode siswa */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Kode Siswa
            </label>

            <input
              type="text"
              required
              maxLength={20}
              value={formData.kode_siswa}
              onChange={(event) =>
                handleChange("kode_siswa", event.target.value)
              }
              placeholder="Contoh: S021"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary"
            />
          </div>

          {/* Nama siswa */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Nama Siswa
            </label>

            <input
              type="text"
              required
              maxLength={100}
              value={formData.nama_siswa}
              onChange={(event) =>
                handleChange("nama_siswa", event.target.value)
              }
              placeholder="Masukkan nama siswa"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary"
            />
          </div>

          {/* Jurusan */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Jurusan
            </label>

            <select
              required
              value={formData.jurusan}
              onChange={(event) =>
                handleChange("jurusan", event.target.value)
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary"
            >
              {STUDENT_MAJORS.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal lahir */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Tanggal Lahir
            </label>

            <input
              type="date"
              required
              value={formData.tanggal_lahir}
              onChange={(event) =>
                handleChange("tanggal_lahir", event.target.value)
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Alamat
            </label>

            <textarea
              required
              rows={3}
              value={formData.alamat}
              onChange={(event) =>
                handleChange("alamat", event.target.value)
              }
              placeholder="Masukkan alamat siswa"
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary"
            />
          </div>

          {/* Tombol aksi */}
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-surface-hover"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default StudentFormModal;
