import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-richblack-600 focus:outline-none"
      >
        <img className="h-8 w-8 rounded-full" src={logo} alt="Profile" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 py-2 bg-richblack-800 rounded-lg shadow-xl">
          <Link
            to="/profile"
            className="block px-4 py-2 text-white hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <CgProfile className="inline  h-5 w-5 mr-2" />
            Profile
          </Link>
          <Link
            to="/logout"
            className="block px-4 py-2 text-white  hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <CiLogout className="inline h-5 w-5 mr-2" />
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
