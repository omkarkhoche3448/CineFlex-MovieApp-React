import Groq from "groq-sdk";
import React, { useRef, useState } from "react";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { addGptMovies } from "../../slices/gptSlice";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_KEY,
  dangerouslyAllowBrowser: true,
});

const TMDB_API_KEY = import.meta.env.VITE_REACT_APP_TOKEN;
const TMDB_API_URL = "https://api.themoviedb.org/3";

const searchMoviesTMDB = async (movieTitle) => {
  try {
    const { data } = await axios.get(
      `/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        movieTitle
      )}`
    );
    return data.results[0] || {};
  } catch (error) {
    console.error("Error fetching movie from TMDB:", error);
    return {};
  }
};

function GptSearchBar() {
  const SearchText = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleGptSearch = async () => {
    if (!SearchText.current.value) {
      alert("Please enter a search query!");
      return;
    }

    setLoading(true);

    const gptQuery = `
      Act as a movie recommendation system. For the search query "${SearchText.current.value}", provide a list of 10 movie names separated by commas. For example: "Inception, The Matrix, Interstellar, The Dark Knight, Memento,...". Do not include any explanations or additional text. Just list the movie names separated by commas.
    `;

    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "llama3-8b-8192",
      });

      const gptMovies =
        response.choices[0]?.message?.content
          .split(",")
          .map((title) => title.trim()) || [];

      const movieDetailsPromises = gptMovies.map((title) =>
        searchMoviesTMDB(title)
      );
      const movieDetails = await Promise.all(movieDetailsPromises);

      dispatch(
        addGptMovies({ movieNames: gptMovies, movieResults: movieDetails })
      );
    } catch (error) {
      console.error("Error fetching Groq results:", error);
      alert("There was an error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" md:w-[80%] lg:w-[78%] px-4 py-2 rounded-md mt-[32%] md:mt-[12%] lg:mt-[9%] mx-auto">
      <form
        className="flex flex-row items-center w-full gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          ref={SearchText}
          id="search-input"
          type="text"
          placeholder="What would you like to do today?"
          className="bg-gray-900 py-2 px-3 md:py-3 md:px-4 rounded-md w-full text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          onClick={handleGptSearch}
          disabled={loading}
          className="text-white bg-red-700 py-3 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
