import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Eventify-logo03.png"
import { useSelector } from "react-redux";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for Burger Menu

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);


  const profileMenu = () => (
    <div className="flex items-center justify-center">
      <NavLink
        to={"/user/profile"}
        onClick={() => setMobileMenuOpen(false)}
        className={({ isActive }) => `hover:text-blue-400 transition duration-300 px-2 ${isActive ? "sm:border-b-2 sm:border-blue-600 sm:font-semibold" : ""}`
        }
      >
        <button
          className="flex items-center gap-2 cursor-pointer hover:text-blue-400 transition duration-300"
        >
          {user?.username}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="11" />
            <circle cx="12" cy="8" r="3" />
            <path d="M8 16c2-3 6-3 8 0" />
          </svg>
        </button>
      </NavLink>
    </div>
  );

  const navLinks = [
    { to: "/", label: "Home", auth: true },
    { to: "/events", label: "Events", auth: true },
    { to: "/calendar", label: "Calendar", auth: true },
    { to: "/about-us", label: "About Us", auth: false },
    { to: "/contact-us", label: "Contact Us", auth: false },
    { to: "/login", label: "Log In", auth: false },
  ];

  return (
    <nav className="bg-blue sticky top-0 w-full z-50 flex items-center justify-between py-4 px-6 sm:px-10 text-white border-b-2 border-gray-800">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <img src={logo} alt="logo" className="h-10"/>
      </Link>

      {/* Burger Menu Button */}
      <button className="sm:hidden text-white" onClick={toggleMobileMenu} aria-label="Toggle Menu">
        {mobileMenuOpen ? <CloseIcon size={30} /> : <MenuIcon size={30} />}
      </button>

      {/* Mobile Menu (Dropdown) */}
      <div
        className={`fixed top-16 right-0 w-52 bg-blue shadow-lg transition-all duration-300 transform ${mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } sm:hidden flex flex-col gap-4 p-5`}
      >
        {user?.role === "Admin" ? (
          <div className="text-center">
            <p>Welcome, Admin</p>
            {profileMenu()}
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map(
              (link) =>
                (user ? link.auth : !link.auth) && (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="hover:text-blue-300 transition duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                )
            )}
            {user && profileMenu()}
          </div>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-5 items-center text-lg">
        {user?.role === "Admin" ? (
          <div className="flex gap-2 items-center">
            <p>Welcome, Admin</p>
            {profileMenu()}
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            {navLinks.map(
              (link) =>
                (user ? link.auth : !link.auth) && (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `hover:text-blue-400 transition duration-300 px-2 ${isActive && "border-b-2 border-blue-600 font-semibold"}`
                    }
                  >
                    {link.label}
                  </NavLink>

                )
            )}
            {user && profileMenu()}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
