"use client";

import React from "react";

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

interface DetailViewProps {
  car: Car;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ car, onClose }) => {
  // URL-ul direct de la Unsplash după model și an
  const imageUrl = `https://source.unsplash.com/500x300/?-${car.model} (${car.year})-`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 text-black shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="text-white bg-red-500 px-3 py-1 rounded mb-4 hover:bg-red-600"
        >
          Close
        </button>

        <img
          src={imageUrl}
          alt={`${car.model} (${car.year})`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/default-car.png";
          }}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        <h2 className="text-2xl font-bold mb-2">
          {car.make} {car.model} ({car.year})
        </h2>

        <ul className="text-black space-y-1">
          <li><strong>City MPG:</strong> {car.city_mpg}</li>
          <li><strong>Highway MPG:</strong> {car.highway_mpg}</li>
          <li><strong>Combination MPG:</strong> {car.combination_mpg}</li>
          <li><strong>Cylinders:</strong> {car.cylinders}</li>
          <li><strong>Displacement:</strong> {car.displacement}</li>
          <li><strong>Drive:</strong> {car.drive}</li>
          <li><strong>Fuel Type:</strong> {car.fuel_type}</li>
          <li><strong>Transmission:</strong> {car.transmission}</li>
          <li><strong>Class:</strong> {car.class}</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailView;
