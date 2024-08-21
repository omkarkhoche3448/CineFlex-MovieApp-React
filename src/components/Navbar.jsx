import React, { useRef, useState } from "react";
import logo from "../assets/movies-app.png";
import { NavLink } from "react-router-dom";
import { HiOutlineBars3 } from "react-icons/hi2";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { IoIosSearch } from "react-icons/io";

import {
  FcFilmReel,
  FcFrame,
  FcHome,
  FcLike,
  FcSlrBackSide,
} from "react-icons/fc";

import {
  SignIn,
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
  const optionsRef = useRef(null);
  const { isSignedIn } = useUser();

  useOnClickOutside(optionsRef, () => setShowOptions(false));
  const handleWishlistClick = () => {
    if (isSignedIn) {
      navigate("/wishlist");
    } else {
      navigate("/sign-in?redirectUrl=/wishlist");
    }
    setShowOptions(false);
  };
  return (
    <div
      className={`flex items-center justify-evenly bg-transparent text-white`}
    >
      <div className=" absolute z-30 mt-32 flex md:w-[78%] lg:w-[78%] items-center lg:justify-between bg-transparent gap-16 ">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-8 lg:h-11 mb-3 lg:w-11  md:h-11 md:w-11"
              loading="lazy"
            />
            <h1 className="text-xl md:text-3xl bg-gradient-to-r from-[#FBBF24] to-[#60A5FA] bg-clip-text text-transparent font-extrabold">
              CineFlex
            </h1>
          </NavLink>
        </div>

        <div className="flex items-center justify-evenly space-x-4 lg:space-x-5 relative ">
          <NavLink to={"/search"}>
            <IoIosSearch className=" md:ml-0 lg:ml-0 h-6 w-6 text-white" />
          </NavLink>

          <HiOutlineBars3
            className="h-7 w-7 cursor-pointer"
            onClick={() => setShowOptions(!showOptions)}
          />

          {showOptions && (
            <div
              ref={optionsRef}
              className="absolute top-10 lg:top-12 -left-[50px] md:-left-20 lg:-left-24 md:top-10 md:right-20 lg:w-40 md:w-40 
              shadow-lg divide-y divide-richblack-800 
              rounded-md border border-richblack-700 bg-richblack-800 overflow-auto z-30"
            >
              <NavLink
                to="/"
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700
                               transition-colors duration-200 ease-in-out"
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
                className="flex items-center px-4 py-2 text-white hover:bg-gray-700
                               transition-colors duration-200 ease-in-out"
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

          <ClerkLoading>
            <span className="Spinner" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      border: "2px solid #FFF",
                    },
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">Login</SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
