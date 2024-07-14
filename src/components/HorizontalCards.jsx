import React from "react";
import { Link } from "react-router-dom";
import playIcon from "../assets/icon-play.png";
import noimage from "../assets/noimage.jpeg";

const HorizontalCards = ({ data, title }) => {
  return (
    <div className="max-w-maxContent mx-auto flex overflow-x-auto overflow-y-hidden scrollbar-hide mb-5 p-5 space-x-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type || title}/details/${d.id}`}
            key={i}
            className="min-w-[60%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[20%] xl:min-w-[15.3%] h-[25vh] sm:h-[30vh] md:h-[35vh] lg:h-[40vh] xl:h-[45vh] mb-5"
          >
            <div className="relative group h-[70%] md:h-[75%] lg:h-[80%] mb-2 transform transition-transform duration-300 hover:scale-105">
              <img
                className="w-full h-full object-cover rounded-md"
                src={
                  d.backdrop_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path
                    }`
                    : noimage
                }
                alt=""
              />
              <div
                className="absolute inset-0 flex items-center justify-center 
                opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gray-900 bg-opacity-60"
              >
                <img src={playIcon} alt="Play Icon" className="h-10 w-10" />
              </div>
            </div>

            <div className="text-white p-3 h-full md:h-[25%] lg:h-[20%]">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
