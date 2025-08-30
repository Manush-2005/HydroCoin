import { useAuthContext } from "@/Context/AuthContext";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useAuthGovContext } from "@/Context/GovContext";
import is from "zod/v4/locales/is.cjs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { producer, isLoggedInAsPro } = useAuthContext();
  const { government, isLoggedInAsGov } = useAuthGovContext();
  return (
    <nav className="bg-[#0f1411] shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-10 bg-[#0f1411]">
        <div className="flex items-center justify-between py-5 bg-[#0f1411]">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">
              HYDRO<span className="text-hydrogen-neon">COIN</span>
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

            {isLoggedInAsGov || isLoggedInAsPro ? (
              <Menubar className="h-[3.25rem] border-0 bg-[#0f1411]">
                <MenubarMenu className="bg-gray-500">
                  <MenubarTrigger className="!p-0">
                    <Avatar className="w-10 h-10 duration-300 cursor-pointer tsmransition-all ring-1 ring-white md:w-12 md:h-12">
                      <AvatarImage
                        src={producer?.profileImage || government?.profileImage}
                        alt="profile"
                        className="object-cover w-full h-full rounded-full"
                      />
                      <AvatarFallback className="text-xl text-green-500 bg-green-200">
                        {producer?.name?.charAt(0) ||
                          government?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent className="bg-gray-300 shadow-md rounded-lg min-w-[180px] py-2">
                    <div className="px-4 py-2 text-center">
                      <p className="text-sm text-black">Hello 👋</p>
                      <p className="font-bold text-green-600 ">
                        {producer?.name || government?.name}
                      </p>
                    </div>
                    <MenubarSeparator className="my-2" />
                    <Link to="/profile">
                      <MenubarItem className="transition-colors cursor-pointer hover:bg-blue-100 hover:text-green-600">
                        My Profile
                      </MenubarItem>
                    </Link>
                    <Link to={isLoggedInAsPro ? "/producer/dashboard" : "/government/pending-requests"}>
                      <MenubarItem className="transition-colors cursor-pointer hover:bg-green-100 hover:text-green-600">
                        Dashboard
                      </MenubarItem>
                    </Link>
                    <MenubarSeparator className="my-2" />
                    <Link to="/logout">
                      <MenubarItem className="transition-colors cursor-pointer hover:bg-red-100 hover:text-red-500">
                        Logout
                      </MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              <Link to="/login">
                <Button className="text-white bg-green-500 hover:bg-green-600">
                  Log In
                </Button>
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

          {isLoggedInAsGov || isLoggedInAsPro ? (
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
