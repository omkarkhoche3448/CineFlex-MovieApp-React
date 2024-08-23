import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.jpeg";
import playIcon from "../../assets/icon-play.png";
import { TbArrowBigUpLine } from "react-icons/tb";

const Cards = ({ data, title }) => {
  return (
    <div
      className="flex flex-wrap w-[90%] mx-auto h-full justify-center mt-10
         bg-black space-x-4 space-y-6"
    >
      <Link
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 flex justify-center items-center
                 z-30 w-[5vh] h-[5vh] bg-[#6556cd] rounded-md shadow-lg transition-transform transform hover:scale-110"
      >
        <TbArrowBigUpLine className="text-white text-lg md:text-xl lg:text-2xl" />
      </Link>

      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%] mb-4"
          key={i}
        >
          <div className="relative group h-0 pb-[150%] mb-2 transform transition-transform duration-300 hover:scale-105">
            <img
              className="absolute top-0 left-0 w-[90%] h-full object-cover rounded-md"
              src={
                c.poster_path || c.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${
                      c.poster_path || c.backdrop_path
                    }`
                  : noimage
              }
              alt=""
              loading="lazy"
            />
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 
                group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 bg-opacity-60"
            >
              <img
                src={playIcon}
                alt="Play Icon"
                className="h-10 w-10"
                loading="lazy"
              />
            </div>
          </div>

          <div className="text-white p-3 h-[30%] md:h-[25%] lg:h-[20%] flex items-center">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-snug whitespace-normal line-clamp-3">
              {c.name || c.title || c.original_name || c.original_title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
