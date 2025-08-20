import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Placeholder for authentication status. This will be replaced with actual auth context later.
  const isAuthenticated = false; // Assume not authenticated for now
  const userRole = 'student'; // Placeholder for user role

  return (
    <nav className="bg-blue-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Coding Platform</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/classes" className="hover:text-blue-200">Kelas</Link>
          {isAuthenticated ? (
            <>
              {userRole === 'student' && (
                <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
              )}
              {userRole === 'mentor' && (
                <Link to="/mentor/dashboard" className="hover:text-blue-200">Mentor Dashboard</Link>
              )}
              {userRole === 'admin' && (
                <Link to="/admin/dashboard" className="hover:text-blue-200">Admin Dashboard</Link>
              )}
              <button className="hover:text-blue-200">Logout</button> {/* Placeholder for logout */}
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="bg-white text-blue-700 px-4 py-2 rounded-full hover:bg-gray-100">Daftar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
