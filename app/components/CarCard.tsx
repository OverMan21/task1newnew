"use client";

interface Car {
  name: string;
  model: string;
  make: string;
  year: number;
  price?: number;
}

export default function CarCard({ car }: { car: Car }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
      <p className="text-sm text-gray-500">Year: {car.year}</p>
      {car.price && <p className="text-sm">Price: ${car.price}</p>}
    </div>
  );
}
