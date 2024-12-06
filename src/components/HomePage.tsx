import React, { useState } from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
<h1 className="text-5xl font-bold leading-tight md:text-6xl mb-4 bg-gradient-to-r from-fuchsia-700 to-fuchsia-300 bg-clip-text text-transparent animate-fade-in">
Everything App<br />for Students
      </h1>
      <p className="text-lg text-gray-50 md:text-xl max-w-md mb-8 animate-fade-in animation-delay-2 ">
        Your all-in-one platform to access study notes, question papers, and more.
      </p>
      <Link href="/signup">
        <div
          onMouseMove={handleMouseMove}
          className="relative inline-block group mt-8"
        >
          <div
            className="absolute inset-0 rounded-full transition duration-300 ease-in-out pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 80%)`,
            }}
          />
          <button className="relative px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition duration-300 ease-in-out">
            TRY IT FREE →
          </button>
        </div>
      </Link>
    </div>
  );
};

export default HomePage;
