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

const Home = () => {
  document.title = "MovieApp | Home";

  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWallpaper, setCurrentWallpaper] = useState(0);
  const [titleImage, setTitleImage] = useState(null);
  const [trending, setTrending] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
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
      const titleImg = images.find(image => image.iso_639_1 === 'en') || images[0];
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

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          modules={[Autoplay]}
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
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-x-0 lg:bottom-[67%] h-[33vh] lg:h-[33vh] 
        bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"
      >
      </div>

      {/* Movie Details */}
      <div className="absolute inset-0 flex justify-end pb-20 md:pb-10 lg:pb-20">
        <div className="w-full lg:w-[32%] h-fit absolute top-[48vh] lg:top-[30vh] md:top-[40vh] sm:top-[40vh] lg:left-[25vh] z-20 space-y-6 px-5 md:px-0">
          {titleImage ? (
            <img
              src={titleImage}
              loading="lazy"
              className="w-auto h-auto md:h-24 lg:h-32"
            />
          ) : (
            <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold mb-8">
              {wallpapers[currentWallpaper]?.title}
            </h1>
          )}
          <p className="text-gray-200 text-sm md:text-base lg:text-base">
            {wallpapers[currentWallpaper]?.overview.slice(0, 300)}
          </p>
          <div className="flex gap-4">
            <button
              className="flex text-black bg-white text-base lg:text-lg font-bold px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-80 border-none transition duration-200 ease-in-out"
              onClick={() =>
                navigate(`movie/details/${wallpapers[currentWallpaper].id}/trailer`)
              }
            >
              <FaPlay className="mr-2 mt-1" />
              Play
            </button>
            <Link
              to={`movie/details/${wallpapers[currentWallpaper].id}`}
              className="flex items-center text-gray-200 bg-transparent border border-white text-base lg:text-lg font-bold hover:bg-white hover:text-black hover:bg-opacity-20 px-4 py-2 md:px-6 md:py-3 rounded-lg transition duration-200 ease-in-out"
            >
              <AiOutlineInfoCircle className="mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <div className="relative min-h-screen z-30 mt-[70px] lg:-mt-[50px] ">
        <div className="max-w-maxContent mx-auto px-5 lg:px-0">
          <HighlightText
            text={"What's Trending Today"}
            customeClass={"ml-5 text-2xl lg:text-3xl"}
          />
          <HorizontalCards data={trending} title={"movie"} />

          <HighlightText
            text={"Top Rated Movies"}
            customeClass={"ml-5 text-2xl lg:text-3xl"}
          />
          <HorizontalCards data={topRated} title={"movie"} />

          <HighlightText
            text={"Upcoming Movies"}
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
