
import { Search, Filter } from "lucide-react";

interface StudentToolbarProps {
  search: string;
  jurusan: string;
  onSearchChange: (value: string) => void;
  onMajorChange: (value: string) => void;
}

import { STUDENT_MAJORS } from "../constants/student.constants";

const StudentToolbar = ({
  search,
  jurusan,
  onSearchChange,
  onMajorChange,
}: StudentToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Cari kode atau nama siswa..."
          className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="relative sm:w-52">
        <Filter
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />

        <select
          value={jurusan}
          onChange={(event) =>
            onMajorChange(event.target.value)
          }
          className="w-full appearance-none rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-sm text-text-primary outline-none transition focus:border-primary"
        >
          <option value="">Semua Jurusan</option>

          {STUDENT_MAJORS.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StudentToolbar;
