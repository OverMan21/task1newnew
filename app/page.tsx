"use client";
import { useEffect, useState } from "react";
import CarCard from "./components/CarCard";
import Filters from "./components/Filters";
import { useTheme } from "./components/ThemeContext";
import Hero from "./components/Hero";

interface Car {
  make: string;
  model: string;
  year: number;
  city_mpg: number;
  highway_mpg: number;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  transmission: string;
  class: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      setError("");

      try {
        if (search.trim() === "" && year.trim() === "") {
          setCars([]);
          setLoading(false);
          return;
        }

        const query = new URLSearchParams();
        if (search.trim() !== "") query.append("model", search.trim());
        if (year.trim() !== "" && !isNaN(Number(year)))
          query.append("year", year.trim());

        const res = await fetch(`/api/cars?${query.toString()}`);
        if (!res.ok) {
          const text = await res.text();
          console.error("API error response:", res.status, text);
          throw new Error("API error");
        }

        const data: Car[] = await res.json();
        setCars(data);
      } catch (err) {
        console.error(err);
        setError("❌ Could not fetch cars. Try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [search, year]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${
        theme === "pastel"
          ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200"
      }`}
    >
      {/* MAIN CONTENT */}
      <div>
        {/* HEADER */}
        <div className="flex justify-between items-center px-8 py-6">
          <h1 className="text-3xl font-bold">🚗 Car Catalog</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
          >
            {theme === "pastel" ? "🌙 Dark" : "🌞 Light"}
          </button>
        </div>

        {/* HERO */}
        <Hero />

        {/* SEARCH/FILTERS */}
        <div className="px-8 mt-16 mb-10">
          <Filters
            search={search}
            setSearch={setSearch}
            year={year}
            setYear={setYear}
          />
        </div>

        {/* LOADING / ERROR */}
        {loading && (
          <p className="text-center text-blue-600 font-medium">Loading cars...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* CARS GRID */}
        <div className="px-8 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {cars.length > 0 ? (
              cars.map((car, idx) => (
                <CarCard
                  key={`${car.make}-${car.model}-${car.year}-${idx}`}
                  car={car}
                />
              ))
            ) : (
              !loading && (
                <p className="text-center text-gray-500">No cars found 🚫</p>
              )
            )}
          </div>
        </div>
      </div>

      {/* FOOTER / PANEL CU BUTOANE */}
      <footer
        className={`mt-10 py-6 px-8 flex flex-wrap justify-center gap-6 border-t ${
          theme === "pastel"
            ? "bg-white/70 border-gray-300 text-gray-700"
            : "bg-gray-800/70 border-gray-600 text-gray-200"
        }`}
      >
        <button className="px-4 py-2 rounded-lg bg-white/70 hover:bg-indigo-600 text-black transition">
          Ajutor
        </button>
        <button className="px-4 py-2 rounded-lg bg-white/70 hover:bg-blue-700 text-black transition">
          Facebook
        </button>
        <button className="px-4 py-2 rounded-lg bg-white/70  text-black transition">
          Contact
        </button>
        <button className="px-4 py-2 rounded-lg bg-white/70 hbg-white/70 text-black transition">
          Despre noi
        </button>
      </footer>
    </div>
  );
}
