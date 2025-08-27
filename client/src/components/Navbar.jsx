"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CodeLabLogo from "../assets/codelab.png"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Placeholder for authentication status
  const isAuthenticated = false
  const userRole = "student"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg text-gray-800"
          : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 text-2xl font-bold hover:scale-105 transition-transform">
            <img src={CodeLabLogo} alt="Code Lab Logo" className="w-10 h-10 rounded-full" />
            <div className="flex flex-col">
              <span className={`text-lg font-bold leading-tight ${isScrolled ? "text-gray-800" : "text-white"}`}>
                Code Lab
              </span>
              <span className={`text-xs leading-tight ${isScrolled ? "text-gray-600" : "text-white/80"}`}>
                Your Playground for Coding
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/classes"
              className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                isScrolled ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/20"
              } group`}
            >
              Kelas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/about"
              className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                isScrolled ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/20"
              } group`}
            >
              Tentang
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {userRole === "student" && (
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      isScrolled ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/20"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                {userRole === "mentor" && (
                  <Link
                    to="/mentor/dashboard"
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      isScrolled ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/20"
                    }`}
                  >
                    Mentor Dashboard
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      isScrolled ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/20"
                    }`}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "border-red-500 text-red-500 hover:bg-red-50"
                      : "border-white hover:bg-white hover:text-red-500"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    isScrolled ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/20"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    isScrolled
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                      : "bg-white text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  Daftar Gratis
                </Link>
              </div>
            )}
          </div>

          <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors">
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                }`}
              ></span>
            </div>
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 border-t border-white/20">
            <Link
              to="/classes"
              className="block px-4 py-3 rounded-lg hover:bg-white/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kelas
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 rounded-lg hover:bg-white/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tentang
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-lg hover:bg-white/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block mx-4 px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold text-center hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
