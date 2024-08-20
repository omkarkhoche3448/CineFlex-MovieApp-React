import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import HorizontalCards from "../components/HorizontalCards";
import HighlightText from "../components/common/HighlightText";
import Footer from "../components/common/Footer";
import Tutorial from "../components/common/Tutorial";

const Home = () => {
  document.title = "CineFlex | Home";

  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [titleImage, setTitleImage] = useState(null);
  const [trending, setTrending] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getNowPlayingWallpapers = async () => {
    try {
      const { data } = await axios.get(`/movie/now_playing`);
      setWallpapers(data.results);
      const firstTitleImg = await getTitleImage(data.results[0].id);
      setTitleImage(firstTitleImg);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getTitleImage = async (movieId) => {
    try {
      const { data } = await axios.get(`/movie/${movieId}/images`);
      const images = data.logos || data.posters || data.backdrops;
      const titleImg =
        images.find((image) => image.iso_639_1 === "en") || images[0];
      return `https://image.tmdb.org/t/p/original${titleImg.file_path}`;
    } catch (error) {
      console.log("Error: ", error);
      return null;
    }
  };

  useEffect(() => {
    if (wallpapers.length === 0) {
      getNowPlayingWallpapers();
    }
  }, []);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const { data } = await axios.get(`/trending/movie/day`);
        setTrending(data.results);
      } catch (error) {
        console.log("Error: ", error);
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

    getTrending();
    getUpcoming();
    getTopRated();
    setLoading(false);
  }, []);

  const handleSlideChange = async (swiper) => {
    setCurrentWallpaper(swiper.realIndex);
    const newTitleImage = await getTitleImage(wallpapers[swiper.realIndex].id);
    setTitleImage(newTitleImage);
  };

  return !loading && wallpapers.length > 0 && trending ? (
    <div className="relative min-h-screen">
      {error && <p className="text-red-500">{error}</p>}
      <Tutorial />

      {/* Swiper Container */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 8000,
          disableOnInteraction: true,
        }}
        loop
        onSlideChange={handleSlideChange}
        speed={300}
        className="swiper-container"
      >
        {wallpapers.map((wallpaper, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide w-full h-screen lg:h-[90vh] relative">
              <div
                className="w-full h-full object-cover filter brightness-56"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${wallpaper.backdrop_path})`,
                  backgroundPosition: "center top 10%",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="absolute inset-x-0 lg:bottom-[65%] md:h-[40vh] lg:h-[75vh] 
      bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none 
      "
      ></div>

      <div
        className="absolute lg:top-[8%] md:top-[7%] w-full lg:w-[22%] h-[40vh] top-[40vh] 
          sm:top-[40vh] lg:left-[25vh] z-10 px-4 lg:px-0 pointer-events-none"
      >
        <div className=" items-center h-full flex flex-col justify-center space-y-4 md:justify-between lg:justify-between lg:mb-4">
          {titleImage ? (
            <img
              src={titleImage}
              loading="lazy"
              className="w-full pointer-events-none md:pointer-events-auto lg:pointer-events-auto h-[60%] md:h-[60%] lg:h-[60%] mb-2 object-contain scale-100 transition-all duration-300 hover:scale-105"
            />
          ) : (
            <h1 className="text-white tracking-widest font-extrabold text-5xl md:text-4xl lg:text-5xl transition-all duration-300 hover:scale-105 ">
              {wallpapers[currentWallpaper]?.title}
            </h1>
          )}

          <div className="flex flex-col gap-4 ">
            <p className="text-gray-200 text-sm font-medium md:text-base lg:text-base mb-2">
              {wallpapers[currentWallpaper]?.overview.slice(0, 150)}
            </p>
          </div>
        </div>

        <div className="w-full flex items-center md:mt-[10%] gap-4">
          <button
            className="flex pointer-events-auto text-black bg-white text-base lg:text-lg font-bold px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-80 border-none transition duration-200 ease-in-out"
            onClick={() =>
              navigate(
                `movie/details/${wallpapers[currentWallpaper].id}/trailer`
              )
            }
          >
            <FaPlay className="mr-2 mt-1" />
            Play
          </button>
          <Link
            to={`movie/details/${wallpapers[currentWallpaper].id}`}
            className="flex pointer-events-auto items-center text-gray-200 bg-transparent border border-white
             text-base lg:text-lg font-bold hover:bg-white hover:text-white hover:bg-opacity-20 px-4 py-2 md:px-6 md:py-3 rounded-lg transition duration-200 ease-in-out whitespace-nowrap"
          >
            <AiOutlineInfoCircle className="mr-2" />
            More Info
          </Link>
        </div>
      </div>

      <div className="relative w-full z-30 mt-9 md:mt-[70px] lg:-mt-[55px] ">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-[80%] flex flex-col">
            <HighlightText
              text={"What's Trending Today"}
              customeClass={"ml-3 text-2xl lg:text-3xl"}
            />
            <HorizontalCards data={trending} title={"movie"} />
          </div>

          <div className="w-[80%] flex flex-col">
            <HighlightText
              text={"Top Rated Movies"}
              customeClass={"ml-3 text-2xl lg:text-3xl"}
            />
            <HorizontalCards data={topRated} title={"movie"} />
          </div>

          <div className="w-[80%] flex flex-col">
            <HighlightText
              text={"Upcoming Movies"}
              customeClass={"ml-3 text-2xl lg:text-3xl"}
            />
            <HorizontalCards data={upcoming} title={"movie"} />
          </div>
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
