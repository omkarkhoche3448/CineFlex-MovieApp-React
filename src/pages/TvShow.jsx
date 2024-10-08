import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "../components/common/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/common/Loader";
import DropDown from "../components/DropDown";
import { HiOutlineRefresh } from "react-icons/hi";

const API_KEY = import.meta.env.VITE_REACT_APP_TOKEN;

function TvShow() {
  document.title = "CineFlex | TV Shows";

  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [category, setCategory] = useState("tv");
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    fetchGenres();
  }, [category, resetKey]);

  useEffect(() => {
    fetchTvShows();
  }, [page, selectedGenres, year, category]);

  const fetchTvShows = async () => {
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
          first_air_date_year: year,
        },
      });

      setShows((prevShows) => [...prevShows, ...response.data.results]);
      setHasMore(response.data.page < response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch TV shows", error);
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
    setShows([]);
    setPage(1);
  };

  const onYearChange = (selectedYear) => {
    setYear(selectedYear);
    setShows([]);
    setPage(1);
  };

  const onCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory.toLowerCase());
    setSelectedGenres([]);
    setShows([]);
    setPage(1);
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleReset = () => {
    setGenres([]);
    setSelectedGenres([]);
    setYear(new Date().getFullYear());
    setPage(1);
    setCategory("tv");
    setResetKey((prevKey) => prevKey + 1);
    setShows([]);
  };

  const CURRENT_YEAR = new Date().getFullYear();
  const YEARS = Array.from(new Array(20), (val, index) => CURRENT_YEAR - index);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  ) : (
    <div className="w-full max-w-screen-xl mx-auto  px-4">
      <div className="w-full flex flex-col lg:flex-row md:w-[70%] lg:w-[80%] xl:w-[60%] lg:p-4 space-y-5 lg:space-y-0 lg:space-x-5 mx-auto mt-32">
        <DropDown
          key={`category-${resetKey}`}
          title="Categories"
          options={[
            { id: "movie", name: "Movies" },
            { id: "tv", name: "TV Shows" },
          ]}
          func={onCategoryChange}
          defaultValue={{ id: "tv", name: "TV Shows" }}
        />
        <DropDown
          key={`genres-${resetKey}`}
          title="Genres"
          options={genres}
          func={onGenresChange}
          defaultValue="0"
        />
        <DropDown
          key={`year-${resetKey}`}
          title="Year"
          options={YEARS.map((year) => ({ id: year, name: year.toString() }))}
          func={onYearChange}
          defaultValue={new Date().getFullYear().toString()}
        />
        <button
          className="bg-red-400 text-white px-4 py-2 rounded mt-5 lg:mt-0 flex items-center"
          onClick={handleReset}
        >
          <HiOutlineRefresh className="inline-block w-5 h-5 mr-2" />
          Reset
        </button>
      </div>

      <InfiniteScroll
        dataLength={shows.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Cards data={shows} title={"tv"} />
      </InfiniteScroll>
    </div>
  );
}

export default TvShow;
