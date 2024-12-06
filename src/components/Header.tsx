// src/components/Header.tsx
"use client"; // Add this to make Header a Client Component

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll';

interface HeaderProps {
  isLoggedIn: boolean;
  onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onNavigate }) => {
  return (
    <header className="p-4 font-maria">
      <nav className="flex items-center">
        {/* Logo Section */}
        <div className="flex items-center w-1/5">
          <Image
            src="/assists/logo.svg"
            alt="Logo"
            width={40}
            height={40}
          />
        </div>

        {/* Centered Navigation Links */}
        <div className="flex-grow flex justify-center pr-4">
          <div className="flex space-x-4 border border-white rounded-full px-6 py-2">
            <ScrollLink to="home" smooth={true} duration={500} className="text-white hover:text-blue-200 cursor-pointer">
              Home
            </ScrollLink>
            <ScrollLink to="features" smooth={true} duration={500} className="text-white hover:text-blue-200 cursor-pointer">
              Features
            </ScrollLink>
            <ScrollLink to="about" smooth={true} duration={500} className="text-white hover:text-blue-200 cursor-pointer">
              About
            </ScrollLink>
            <ScrollLink to="supported" smooth={true} duration={500} className="text-white hover:text-blue-200 cursor-pointer">
              Supported
            </ScrollLink>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center w-1/5 justify-end">
          <Link href="/login/" className="bg-white text-blue-500 px-4 py-2 rounded-md mr-2 hover:bg-blue-100">
            Login
          </Link>
          <Link href="/signup" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Register
          </Link>
        </div>
      </nav>

      {/* Conditional Button for Logged-In Users */}
      {isLoggedIn && (
        <div className="text-center mt-4">
          <button 
            onClick={() => onNavigate('/dashboard')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
