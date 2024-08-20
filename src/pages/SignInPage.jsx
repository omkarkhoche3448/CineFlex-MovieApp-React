import React from "react";
import { SignIn } from "@clerk/clerk-react";
import backgroundImage from "../assets/SignInBG.jpg";
import { NavLink } from "react-router-dom";

const SignInPage = () => {
  document.title = "CineFlex | SignIn";

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-[15%] lg:left-[7.3%] lg:bottom-[7%] items-center p-8">
        <div className="absolute top-[6.5%] md:top-[7%] lg:py-1 box-border lg:top-[7%] left-[8%] z-30 ">
          <NavLink
            to={`/`}
            className="text-white bg-gray-800 px-2 py-2 rounded-lg shadow-md 
            hover:bg-gray-900 hover:shadow-lg transition duration-300 ease-in-out"
          >
            Back
          </NavLink>
        </div>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
