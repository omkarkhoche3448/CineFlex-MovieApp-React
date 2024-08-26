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
import HomeCardDetails from "../components/common/HomeCardDetails";
import { getTitleImage } from "../utils/imageHelpers";

const Home = () => {
  document.title = "CineFlex | Home";

  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);
  const [titleImage, setTitleImage] = useState(null);
  const [trending, setTrending] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getNowPlayingWallpapers = async () => {
    try {
      const { data } = await axios.get(`/trending/all/week`);
      setWallpapers(data.results);
      if (data.results.length > 0) {
        const firstTitleImg = await getTitleImage(
          data.results[0].id,
          data.results[0].media_type
        );
        setTitleImage(firstTitleImg);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (wallpapers.length === 0) {
      getNowPlayingWallpapers();
    }
  }, [wallpapers]);

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
    const newIndex = swiper.realIndex;
    setCurrentWallpaperIndex(newIndex);

    const newWallpaper = wallpapers[newIndex];
    const newTitleImage = await getTitleImage(
      newWallpaper.id,
      newWallpaper.media_type
    );
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
                  backgroundPosition: "center top 30%",
                  backgroundSize: "cover",
                  opacity: "75%",
                }}
              ></div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.2) 80%)",
                }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="absolute inset-x-0 lg:bottom-[65%] md:h-[40vh] lg:h-[75vh] 
      bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none 
      "
      ></div>
      <HomeCardDetails
        titleImage={titleImage}
        currentWallpaper={wallpapers[currentWallpaperIndex]}
        navigate={navigate}
      />

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
