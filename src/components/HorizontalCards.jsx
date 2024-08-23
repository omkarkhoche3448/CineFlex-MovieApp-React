import React, { useRef } from "react";
import { Link } from "react-router-dom";
import playIcon from "../assets/icon-play.png";
import noimage from "../assets/noimage.jpeg";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const HorizontalCards = ({ data, title }) => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -1000 : 1000,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative flex items-center">
        <div
          className="absolute left-1 top-0 bottom-0 flex items-center justify-center w-12 cursor-pointer hover:bg-black hover:bg-opacity-20 z-10"
          onClick={() => handleScroll("left")}
        >
          <SlArrowLeft size={30} />
        </div>

        <div
          className="flex justify-start overflow-x-auto overflow-y-hidden scrollbar-hide p-5 space-x-3"
          ref={scrollRef}
        >
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
                    loading="lazy"
                    src={
                      d.poster_path || d.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${
                            d.poster_path || d.backdrop_path
                          }`
                        : noimage
                    }
                    alt={
                      d.name || d.title || d.original_name || d.original_title
                    }
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 
                    group-hover:opacity-100 transition-opacity duration-400 bg-gray-900 bg-opacity-60"
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
                  <p className="font-semibold leading-tight text-sm lg:text-xs truncate">
                    {d.name || d.title || d.original_name || d.original_title}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white p-3">
              {`No ${title.charAt(0).toUpperCase() + title.slice(1)} Found.`}
            </p>
          )}
        </div>

        <div
          className="absolute right-1 top-0 bottom-0 flex items-center justify-center w-12 cursor-pointer hover:bg-black hover:bg-opacity-20 z-10"
          onClick={() => handleScroll("right")}
        >
          <SlArrowRight size={30} />
        </div>
      </div>
    </div>
  );
};

export default HorizontalCards;
