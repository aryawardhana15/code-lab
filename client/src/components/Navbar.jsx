import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Coding Platform</Link>
        <div className="space-x-4">
          <Link to="/classes" className="hover:text-blue-200">Kelas</Link>
          <Link to="/login" className="hover:text-blue-200">Login</Link>
          <Link to="/register" className="bg-white text-blue-700 px-4 py-2 rounded-full hover:bg-gray-100">Daftar</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
