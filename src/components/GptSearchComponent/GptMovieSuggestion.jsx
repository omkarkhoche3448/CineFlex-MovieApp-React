import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "./MovieCard";
import { Navigation, Pagination } from "swiper/modules";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function GptMovieSuggestion() {
  const { movieNames, movieResults } = useSelector(
    (store) => store.gpt.gptMovies || {}
  );

  if (!movieResults || movieResults.length === 0) return null;

  return (
    <div className="w-[78%] text-white p-4 rounded-lg shadow-lg relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {movieResults
          .filter(
            (movie) =>
              movie.poster_path &&
              (movie.title ||
                movie.name ||
                movie.original_title ||
                movie.original_name)
          )
          .map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div
        className="custom-prev absolute top-1/2 left-[-30px] transform -translate-y-1/2 z-10 cursor-pointer"
        style={{
          width: "44px",
          height: "44px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SlArrowLeft />
      </div>
      <div
        className="custom-next absolute top-1/2 right-[-30px] transform -translate-y-1/2 z-10 cursor-pointer"
        style={{
          width: "44px",
          height: "44px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SlArrowRight />
      </div>
    </div>
  );
}

export default GptMovieSuggestion;
