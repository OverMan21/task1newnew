"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 py-12 bg-white rounded-2xl shadow-sm">
      {/* Text stânga */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Find, book, rent <br />
          a car—quick and <br />
          super easy!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Streamline your car rental experience with our effortless booking
          process.
        </p>

        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">
          Explore Cars
        </button>
      </div>

      {/* Imagine dreapta */}
      <div className="relative w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <div className="absolute inset-0 rounded-3xl bg-blue-600 rotate-6 -z-10" />
        <Image
          src="/car.png" // imaginea din /public/car.png
          alt="Car"
          width={600}
          height={400}
          className="drop-shadow-lg object-contain"
        />
      </div>
    </section>
  );
}
