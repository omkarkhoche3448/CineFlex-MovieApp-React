import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "../components/common/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/common/Loader";
import DropDown from "../components/DropDown";
import { HiOutlineRefresh } from "react-icons/hi";

const API_KEY = import.meta.env.VITE_REACT_APP_TOKEN;

function Movie() {
  document.title = "MovieFlex | Movies";
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [category, setCategory] = useState("movie");
  const [resetKey, setResetKey] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, [category, resetKey]);

  useEffect(() => {
    fetchMovies();
  }, [page, selectedGenres, year, category]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`/discover/${category}`, {
        params: {
          api_key: API_KEY,
          page: page,
          sort_by: "popularity.desc",
          include_adult: false,
          include_video: false,
          language: "en-US",
          with_genres: selectedGenres.join(","),
          primary_release_year: year,
        },
      });

      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      setHasMore(response.data.page < response.data.total_pages);
      setLoading(false);

      console.log("fetchMovies", response.data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`/genre/${category}/list`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
        },
      });

      setGenres(response.data.genres);
    } catch (error) {
      console.error("Failed to fetch genres", error);
    }
  };

  const onGenresChange = (selectedGenreId) => {
    setSelectedGenres([selectedGenreId]);
    setMovies([]);
    setPage(1);
  };

  const onYearChange = (selectedYear) => {
    setYear(selectedYear);
    setMovies([]);
    setPage(1);
  };

  const onCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory.toLowerCase());
    setSelectedGenres([]);
    setMovies([]);
    setPage(1);
  };

  const handleReset = () => {
    setGenres([]);
    setSelectedGenres([]);
    setYear(new Date().getFullYear());
    setPage(1);
    setCategory("movie");
    setResetKey((prevKey) => prevKey + 1);
    setMovies([]);
  };

  const CURRENT_YEAR = new Date().getFullYear();
  const YEARS = Array.from(new Array(20), (val, index) => CURRENT_YEAR - index);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full mx-auto px-4 mt-32">
      <div className="max-w-full flex flex-col justify-center lg:flex-row lg:space-x-4 lg:space-y-0 space-y-4  overflow-x-hidden">
        <DropDown
          key={`category-${resetKey}`}
          title="Categories"
          options={[
            { id: "movie", name: "Movies" },
            { id: "tv", name: "TV Shows" },
          ]}
          func={onCategoryChange}
          defaultValue={{ id: "movie", name: "Movies" }}
          className="flex-shrink-0 w-full lg:w-auto"
        />
        <DropDown
          key={`genres-${resetKey}`}
          title="Genres"
          options={genres}
          func={onGenresChange}
          defaultValue="0"
          className="flex-shrink-0 w-full lg:w-auto"
        />
        <DropDown
          key={`year-${resetKey}`}
          title="Year"
          options={YEARS.map((year) => ({ id: year, name: year.toString() }))}
          func={onYearChange}
          defaultValue={new Date().getFullYear().toString()}
          className="flex-shrink-0 w-full lg:w-auto"
        />

        <button
          className="bg-red-400 text-white px-4 py-2 rounded flex-shrink-0 w-full lg:w-auto"
          onClick={handleReset}
        >
          <HiOutlineRefresh className="inline-block w-5 h-5 mr-2" />
          Reset
        </button>
      </div>

      <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={movies} title={"movie"} />
      </InfiniteScroll>
    </div>
  );
}

export default Movie;
