"use client";

import { useEffect, useState } from "react";
import CarCard from "./components/CarCard";
import Filters from "./components/Filters";

interface Car {
  name: string;
  model: string;
  make: string;
  year: number;
  price?: number;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      setError("");

      try {
        // Nu trimitem parametri goi
        if (search.trim() === "" && year.trim() === "") {
          setCars([]);
          setLoading(false);
          return;
        }

        const query = new URLSearchParams();
        if (search.trim() !== "") query.append("model", search.trim());
        if (year.trim() !== "" && !isNaN(Number(year))) query.append("year", year.trim());

        const res = await fetch(`/api/cars?${query.toString()}`);
        if (!res.ok) {
          const text = await res.text();
          console.error("API error response:", res.status, text);
          throw new Error("API error");
        }

        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch cars. Try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [search, year]);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Car Catalog</h1>
      <Filters search={search} setSearch={setSearch} year={year} setYear={setYear} />

      {loading && <p>Loading cars...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {cars.length > 0 ? (
          cars.map((car, idx) => <CarCard key={idx} car={car} />)
        ) : (
          !loading && <p>No cars found.</p>
        )}
      </div>
    </div>
  );
}
