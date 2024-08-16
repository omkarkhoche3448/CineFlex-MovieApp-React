import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import HorizontalCards from "../components/HorizontalCards";
import HighlightText from "../components/common/HighlightText";
import Footer from "../components/common/Footer";

const Home = () => {
  document.title = "MovieApp | Home";

  const [wallpapers, setWallpapers] = useState(null);
  const [trending, setTrending] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");


  const navigate = useNavigate();

  const getWallpapers = async () => {
    try {
      const { data } = await axios.get(`/trending/movie/day`);
      const randomData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpapers(randomData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (!wallpapers) {
      getWallpapers();
    }
  }, [wallpapers, category]);

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  const getUpcoming = async () => {
    try {
      const { data } = await axios.get("/movie/upcoming");
      setUpcoming(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getTopRated = async () => {
    try {
      const { data } = await axios.get(`/movie/top_rated`);
      setTopRated(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getTrending();
    getUpcoming();
    getTopRated();
  }, [category]);


  return !loading && wallpapers && trending ? (
    <div className="relative min-h-screen">

      <div className="relative">
        {wallpapers && (
          <div
            className="w-full h-screen lg:h-[100vh] object-cover filter brightness-56 z-0 box-sizing: border-box transition-all duration-500"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${wallpapers.backdrop_path})`,
              backgroundPosition: "center top 10%",
              backgroundSize: "cover",
            }}
          />
        )}
        <div className=" inset-0 flex justify-end pb-20 md:pb-10 lg:pb-20  box-sizing:border-box">
          <div className="w-full lg:w-[32%] h-fit absolute top-[50vh] lg:top-[30vh] md:top-[40vh] sm:top-[40vh] lg:left-[25vh] z-10 space-y-6 px-5 md:px-0">
            <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold mb-8">
              {wallpapers?.title}
            </h1>
            <p className="text-white text-sm md:text-base lg:text-base">
              {wallpapers?.overview}
            </p>
            <div className="flex gap-4 ">
              <button
                className="flex text-black bg-white text-base lg:text-lg font-bold px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-80 border-none transition duration-200 ease-in-out"
                onClick={() => navigate(`movie/details/${wallpapers.id}/trailer`)}
              >
                <FaPlay className="mr-2 mt-1" />
                Play
              </button>
              <Link
                to={`movie/details/${wallpapers.id}`}
                className="flex items-center text-white bg-transparent border border-white text-base lg:text-lg font-bold hover:bg-white hover:text-black hover:bg-opacity-20 px-4 py-2 md:px-6 md:py-3 rounded-lg transition duration-200 ease-in-out"
              >
                <AiOutlineInfoCircle className="mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trending section */}
      <div className="relative min-h-screen ">
        <div
          className="w-full h-[33vh] lg:h-screen bg-gradient-to-t from-black to-black/500 
          p-4 text-center text-xl font-bold absolute bottom-[90%] lg:bottom-[84%] left-0 right-0"
        > </div>

        <div className="relative z-20 max-w-maxContent mx-auto md:mt-32 lg:-mt-[170px] px-5 lg:px-0">
          <HighlightText
            text={"What's Trending Today"}
            customeClass={"ml-5 text-2xl lg:text-3xl"}
          />
          <HorizontalCards data={trending} title={"movie"} />

          <HighlightText
            text={"Top Rated Movies "}
            customeClass={"ml-5 text-2xl lg:text-3xl"}
          />
          <HorizontalCards data={topRated} title={"movie"} />

          <HighlightText
            text={"Upcoming Movies "}
            customeClass={"ml-5 text-2xl lg:text-3xl"}
          />
          <HorizontalCards data={upcoming} title={"movie"} />
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader" />
    </div>
  );
};

export default Home;
