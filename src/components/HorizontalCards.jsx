import React from "react";
import { Link } from "react-router-dom";
import playIcon from "../assets/icon-play.png";
import noimage from "../assets/noimage.jpeg";

const HorizontalCards = ({ data, title }) => {
  return (
    <div className="flex justify-start overflow-x-auto overflow-y-hidden scrollbar-hide p-5 space-x-3">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type || title}/details/${d.id}`}
            key={i}
            className="min-w-[75%] h-[50vh] sm:min-w-[60%] md:min-w-[30%] lg:min-w-[15%] lg:h-[45vh]"
          >
            <div className="relative group h-[70%] md:h-[75%] lg:h-[80%] mb-2 transform transition-transform duration-300 hover:scale-105">
              <img
                className="w-full h-full object-cover rounded-md"
                src={
                  d.poster_path || d.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${
                        d.poster_path || d.backdrop_path
                      }`
                    : noimage
                }
                alt={d.name || d.title || d.original_name || d.original_title}
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 
              group-hover:opacity-100 transition-opacity duration-400 bg-gray-900 bg-opacity-60"
              >
                <img src={playIcon} alt="Play Icon" className="h-10 w-10" />
              </div>
            </div>

            <div className="text-white p-3 h-[30%] md:h-[25%] lg:h-[20%] flex items-center">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-snug whitespace-normal line-clamp-3">
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
