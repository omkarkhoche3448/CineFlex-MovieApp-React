import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

function GptMovieSuggestion() {
  const { movieNames, movieResults } = useSelector(
    (store) => store.gpt.gptMovies || {}
  );

  console.log("MovieResults", movieResults);

  if (!movieResults || movieResults.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4  text-white p-4 rounded-lg shadow-lg">
      {movieResults.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
}

export default GptMovieSuggestion;
