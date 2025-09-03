"use client";

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
}

export default function Filters({ search, setSearch, year, setYear }: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by model or make"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />
      <input
        type="number"
        placeholder="Filter by year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border rounded px-3 py-2 w-32"
      />
    </div>
  );
}
