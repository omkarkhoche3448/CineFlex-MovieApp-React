// NotFound.jsx
import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Animation - 1718171085008.json";

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <Lottie options={defaultOptions} />
      </div>
      <h1 className="text-4xl font-bold mt-8">Page Not Found</h1>
      <p className="text-lg mt-4">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFound;
