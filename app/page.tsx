"use client";
import { useEffect, useState } from "react";
import CarCard from "./components/CarCard";
import Filters from "./components/Filters";
import { useTheme } from "./components/ThemeContext";

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
      className={`p-8 min-h-screen transition-colors duration-500 ${
        theme === "pastel"
          ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🚗 Car Catalog</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
        >
          {theme === "pastel" ? "🌙 Dark" : "🌞 Light"}
        </button>
      </div>

      <Filters search={search} setSearch={setSearch} year={year} setYear={setYear} />

      {loading && <p className="text-center text-blue-600 font-medium">Loading cars...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {cars.length > 0 ? (
          cars.map((car, idx) => (
            <CarCard key={`${car.make}-${car.model}-${car.year}-${idx}`} car={car} />
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No cars found 🚫</p>
        )}
      </div>
    </div>
  );
}
