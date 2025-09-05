"use client";

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
}

export default function Filters({ search, setSearch, year, setYear }: FiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
      <input
        type="text"
        placeholder="🔍 Search by model or make..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-purple-200 rounded-lg px-4 py-2 shadow-sm bg-white/70 backdrop-blur focus:ring-2 focus:ring-indigo-400 outline-none flex-1"
      />
      <input
        type="number"
        placeholder="📅 Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border border-purple-200 rounded-lg px-4 py-2 shadow-sm bg-white/70 backdrop-blur focus:ring-2 focus:ring-indigo-400 outline-none w-40"
      />
    </div>
  );
}
