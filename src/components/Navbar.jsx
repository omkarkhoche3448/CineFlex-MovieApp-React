import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { HiOutlineBars3, HiOutlineUserCircle } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import logo from "../assets/movies-app.png";
import useOnClickOutside from "../hooks/useOnClickOutside";
import GptSearch from "../assets/gptSearch.png";

import {
  FcFilmReel,
  FcFrame,
  FcHome,
  FcLike,
  FcSlrBackSide,
} from "react-icons/fc";

import {
  SignedIn,
  useUser,
  SignedOut,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const { isSignedIn } = useUser();
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useOnClickOutside(optionsRef, () => setShowOptions(false));

  const handleWishlistClick = () => {
    if (isSignedIn) {
      navigate("/wishlist");
    } else {
      navigate("/sign-in?redirectUrl=/wishlist");
    }
    setShowOptions(false);
  };

  const handleMouseEnter = (icon) => setHoveredIcon(icon);
  const handleMouseLeave = () => setHoveredIcon(null);

  return (
    <div className="flex items-center justify-evenly bg-transparent text-white">
      <div className="absolute z-30 mt-32 flex md:w-[78%] lg:w-[78%] items-center md:p-1 lg:p-1 justify-between bg-transparent gap-16">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-8 md:h-11 md:w-11 mb-3"
              loading="lazy"
            />
            <h1 className="text-xl md:text-3xl bg-gradient-to-r from-[#FBBF24] to-[#60A5FA] bg-clip-text text-transparent font-extrabold">
              CineFlex
            </h1>
          </NavLink>
        </div>

        <div className="relative flex items-center space-x-3 lg:space-x-4 md:space-x-6">
          <>
            <div
              className="relative flex items-center"
              onMouseEnter={() => handleMouseEnter("gptSearch")}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to={
                  isSignedIn
                    ? "/gpt-search"
                    : "/sign-in?redirectUrl=/gpt-search"
                }
              >
                <img
                  src={GptSearch}
                  alt="GPT Search"
                  className="h-6 w-6 md:h-8 md:w-8 cursor-pointer"
                />
              </NavLink>
              {hoveredIcon === "gptSearch" && (
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-700 bg-opacity-80 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {isSignedIn ? "GPT Search" : "Log in to use GPT Search"}
                </span>
              )}
            </div>

            <div
              className="relative flex items-center"
              onMouseEnter={() => handleMouseEnter("search")}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink to={"/search"}>
                <IoIosSearch className="h-6 w-6 md:h-8 md:w-8 cursor-pointer" />
              </NavLink>
              {hoveredIcon === "search" && (
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-700 bg-opacity-60 text-white text-xs rounded px-2 py-1">
                  Search
                </span>
              )}
            </div>

            <div
              className="relative flex items-center"
              onMouseEnter={() => handleMouseEnter("menu")}
              onMouseLeave={handleMouseLeave}
            >
              <HiOutlineBars3
                className="h-6 w-6 md:h-8 md:w-8 cursor-pointer"
                onClick={() => setShowOptions(!showOptions)}
              />
              {hoveredIcon === "menu" && (
                <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-700 bg-opacity-60 text-white text-xs rounded px-2 py-1">
                  Menu
                </span>
              )}
            </div>
          </>

          <ClerkLoading>
            <span className="Spinner" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <div
                className="relative flex items-center"
                onMouseEnter={() => handleMouseEnter("user")}
                onMouseLeave={handleMouseLeave}
              >
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        border: "2px solid #FFF",
                      },
                    },
                  }}
                />
                {hoveredIcon === "user" && (
                  <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-700 bg-opacity-60 text-white text-xs rounded px-2 py-1">
                    Account
                  </span>
                )}
              </div>
            </SignedIn>
            <SignedOut>
              <div
                className="relative flex items-center"
                onMouseEnter={() => handleMouseEnter("signIn")}
                onMouseLeave={handleMouseLeave}
              >
                <SignInButton mode="modal">
                  <HiOutlineUserCircle className="h-6 w-6 md:h-8 md:w-8 cursor-pointer" />
                </SignInButton>
                {hoveredIcon === "signIn" && (
                  <span className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-700 bg-opacity-60 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    Sign In
                  </span>
                )}
              </div>
            </SignedOut>
          </ClerkLoaded>

          {showOptions && (
            <div
              ref={optionsRef}
              className="absolute top-10 lg:w-40 lg:-left-6 md:w-40 md:right-12 right-1
              shadow-lg divide-y divide-richblack-800  rounded-md border border-richblack-700 bg-richblack-800 overflow-auto z-30"
            >
              <NavLink
                to="/"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcHome className="h-6 w-6 mr-2" />
                Home
              </NavLink>
              <NavLink
                to="/trending"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcFrame className="h-6 w-6 mr-2" />
                Trending
              </NavLink>
              <NavLink
                to="/movie"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcFilmReel className="h-6 w-6 mr-2" />
                Movie
              </NavLink>

              <NavLink
                to="/tvshow"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={() => setShowOptions(false)}
              >
                <FcSlrBackSide className="h-6 w-6 mr-2" />
                Tv Show
              </NavLink>

              <NavLink
                to={isSignedIn ? "/wishlist" : "/sign-in"}
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200 ease-in-out"
                onClick={handleWishlistClick}
              >
                <FcLike className="h-6 w-6 mr-2" />
                WishList
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
