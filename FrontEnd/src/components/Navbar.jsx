import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0f1411] shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">
              ⚡ HYDROGEN<span className="text-hydrogen-neon">CHAIN</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 md:flex">
            <Link
              to="/"
              className="text-white transition hover:text-hydrogen-neon"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white transition hover:text-hydrogen-neon"
            >
              About
            </Link>

            {false ? (
              <button className="bg-hydrogen-neon text-[#0f1411] px-4 py-2 rounded-xl font-medium hover:bg-[#0ef29b] transition">
                Logout
              </button>
            ) : (
              <Link
                to="/register"
                className="bg-hydrogen-neon text-[#0f1411] px-4 py-2 rounded-xl font-medium hover:bg-[#0ef29b] transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-hydrogen-neon focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0f1411] px-4 pb-4 space-y-3">
          <Link
            to="/"
            className="block text-white transition hover:text-hydrogen-neon"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-white transition hover:text-hydrogen-neon"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full bg-hydrogen-neon text-[#0f1411] px-4 py-2 rounded-xl font-medium hover:bg-[#0ef29b] transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block bg-hydrogen-neon text-[#0f1411] px-4 py-2 rounded-xl font-medium text-center hover:bg-[#0ef29b] transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
