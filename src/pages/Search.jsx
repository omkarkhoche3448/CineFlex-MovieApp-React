import React, { useState, useEffect } from "react";
import DropDown from "../components/DropDown";
import SearchBar from "../components/common/SearchBar";
import Cards from "../components/common/Card";
import axios from "../utils/axios";
import Loader from "../components/common/Loader";

const Search = () => {
  document.title = "CineFlex | Search ";
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "All" },
    { id: "movie", name: "Movies" },
    { id: "tv", name: "TV Shows" },
  ];

  const getTrending = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/trending/all/day");
      setSearchResults(data.results);
    } catch (error) {
      console.log("Error fetching trending data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchResults = async () => {
    if (query.trim() === "") {
      getTrending();
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`/search/${category}?query=${query}`);
      setSearchResults(data.results);
    } catch (error) {
      console.log("Error fetching search results: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, category]);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 ">
      <div className="w-full flex flex-col lg:flex-row md:w-[70%] lg:w-[80%] xl:w-[60%] lg:p-4 space-y-5 lg:space-y-0 lg:space-x-5 mx-auto mt-28">
        <DropDown
          title="Category"
          options={categories}
          func={setCategory}
          defaultValue={category}
          className="w-full lg:w-auto"
        />

        <SearchBar
          query={query}
          setQuery={setQuery}
          setSearchResults={setSearchResults}
          className="w-full lg:w-auto"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="w-full mt-8">
          {searchResults.length > 0 ? (
            <Cards data={searchResults} title={`${category}`} />
          ) : (
            <div className="text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
