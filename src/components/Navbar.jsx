// Navbar.jsx
import React, { useRef, useState } from "react";
import logo from "../assets/movies-app.png";
import { Link } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import ProfileDropdown from "./ProfileDropDown";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { IoIosSearch } from "react-icons/io";

import {
  FcFilmReel,
  FcFrame,
  FcHome,
  FcLike,
  FcSlrBackSide,
} from "react-icons/fc";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useOnClickOutside(optionsRef, () => setShowOptions(false));
  return (
    <div
      className={`flex items-center justify-evenly bg-transparent text-white`}
    >
      <div className=" absolute z-30 mt-32 flex md:w-[78%] lg:w-[78%] items-center justify-between bg-transparent">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-8 lg:h-11 mb-3 lg:w-11  md:h-11 md:w-11"
              loading="lazy"
            />
            <h1 className="text-xl md:text-3xl bg-gradient-to-r from-[#FBBF24] to-[#60A5FA] bg-clip-text text-transparent font-extrabold">
              CineFlex
            </h1>
          </Link>
        </div>

        <div className="flex items-center justify-evenly space-x-8 lg:gap-x-9 relative">
          {/* <SearchBar />*/}
          <Link to={"/search"}>
            <IoIosSearch className="ml-10 md:ml-0 lg:ml-0 h-6 w-6 lg:h-8 lg:w-8 text-white" />
          </Link>

          <HiOutlineBars3
            className="h-8 w-8 cursor-pointer"
            onClick={() => setShowOptions(!showOptions)}
          />

          {showOptions && (
            <div
              ref={optionsRef}
              className="absolute top-12 -left-16 md:top-10 md:right-20 lg:w-40 md:w-40 
              shadow-lg divide-y divide-richblack-800 
              rounded-md border border-richblack-700 bg-richblack-800 overflow-auto z-50"
            >
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700
                               transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcHome className="h-6 w-6 mr-2" />
                Home
              </Link>
              <Link
                to="/trending"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcFrame className="h-6 w-6 mr-2" />
                Trending
              </Link>
              <Link
                to="/movie"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700
                               transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcFilmReel className="h-6 w-6 mr-2" />
                Movie
              </Link>

              <Link
                to="/tvshow"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcSlrBackSide className="h-6 w-6 mr-2" />
                Tv Show
              </Link>

              <Link
                to="/People"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcLike className="h-6 w-6 mr-2" />
                WishList
              </Link>
            </div>
          )}
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
