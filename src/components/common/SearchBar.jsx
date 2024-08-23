import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.jpeg";
import axios from "../../utils/axios";

const SearchBar = ({ query, setQuery, setSearchResults }) => {
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    if (query.trim() === "") {
      setSearches([]);
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
      setSearchResults(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearches();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full lg:max-w-2xl mx-auto">
      <div className="relative">
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search Anything"
          className="w-full p-3 text-xl outline-none border border-gray-600 rounded-md bg-gray-800 text-white transition-all duration-300"
        />
        {query.length > 0 && (
          <IoIosClose
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 cursor-pointer"
          />
        )}
      </div>

      {searches.length > 0 && (
        <div className="absolute w-full max-h-60 mt-2 overflow-auto top-full bg-gray-900 rounded-md shadow-lg z-10 border border-gray-600">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="flex items-center p-2 hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setQuery("")}
            >
              <img
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt={s.name || s.title || s.original_name || s.original_title}
                className="h-16 w-16 object-cover rounded-sm mr-3"
                loading="lazy"
              />
              <span className="text-white">
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
