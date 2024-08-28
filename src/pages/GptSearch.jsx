import React from "react";
import GptSearchBar from "../components/GptSearchComponent/GptSearchBar";
import GptMovieSuggestion from "../components/GptSearchComponent/GptMovieSuggestion";
import BackgroundImage from "../assets/SignInBG.jpeg";

function GptSearch() {
  return (
    <div
      className="flex flex-col items-center w-full min-h-screen gap-y-10 bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`,
      }}
    >
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
}

export default GptSearch;
