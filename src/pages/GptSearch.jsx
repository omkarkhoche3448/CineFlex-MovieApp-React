import React from "react";
import GptSearchBar from "../components/GptSearchComponent/GptSearchBar";
import GptMovieSuggestion from "../components/GptSearchComponent/GptMovieSuggestion";
import BackgroundImage from "../assets/SignInBG.jpeg";

function GptSearch() {
  return (
    <div
      className="flex flex-col items-center w-full h-screen gap-y-10"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
}

export default GptSearch;
