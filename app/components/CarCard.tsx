import React, { useState } from "react";
import DetailView from "./DetailView";

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

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="font-bold text-lg">{car.make} {car.model}</h2>
      <p>An: {car.year}</p>
      <button
        onClick={() => setShowDetails(true)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Details
      </button>

      {showDetails && (
        <DetailView car={car} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
};

export default CarCard;
