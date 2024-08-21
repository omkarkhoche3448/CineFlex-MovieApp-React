import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"; // Importing an icon
import backgroundImage from "../assets/SignInBG.jpg";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectUrl =
    new URLSearchParams(location.search).get("redirectUrl") || "/";

  const handleSignInSuccess = () => {
    navigate(redirectUrl);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

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
        <div className="absolute top-[6.5%] md:top-[7%] lg:py-1 box-border lg:top-[7%] left-[8%] z-30">
          <div
            onClick={handleGoBack}
            className="flex items-center text-black bg-transparent px-3 py-2 cursor-pointer relative group"
          >
            <HiArrowLeft className="mr-2 text-2xl" />
            <span className="absolute bottom-full bg-opacity-80 left-12 transform -translate-x-1/2 bg-black/80 text-white text-sm rounded-lg px-4 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Go Back
            </span>
          </div>
        </div>
        <SignIn
          signInButtonText="Sign In"
          onSignInSuccess={handleSignInSuccess}
        />
      </div>
    </div>
  );
};

export default SignInPage;
