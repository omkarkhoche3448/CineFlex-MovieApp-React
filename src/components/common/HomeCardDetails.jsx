import React from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const HomeCardDetails = ({ titleImage, currentWallpaper, navigate }) => {
  const overview =
    currentWallpaper?.overview?.slice(0, 150) || "No overview available.";

  return (
    <div
      className="absolute lg:top-[8%] md:top-[7%] w-full lg:w-[22%] h-[40vh] top-[40vh] 
      sm:top-[40vh] lg:left-[25vh] z-10 px-4 lg:px-0 pointer-events-none"
    >
      <div className="items-center h-full flex flex-col justify-center space-y-4 md:justify-between lg:justify-between lg:mb-4">
        {titleImage ? (
          <img
            src={titleImage}
            loading="lazy"
            className="w-full pointer-events-none md:pointer-events-auto lg:pointer-events-auto h-[60%] md:h-[60%] lg:h-[60%] object-contain scale-100 transition-all duration-300 hover:scale-105"
          />
        ) : (
          <h1 className="text-white tracking-widest font-extrabold text-5xl md:text-4xl lg:text-5xl transition-all duration-300 hover:scale-105 ">
            {currentWallpaper?.title ||
              currentWallpaper?.name ||
              "No title available"}
          </h1>
        )}

        <div className="flex flex-col gap-4">
          <p className="text-gray-200 text-sm font-medium md:text-base lg:text-base mb-2">
            {overview.slice(0, 144) + "."}
          </p>
        </div>
      </div>

      <div className="w-full flex items-center mt-[5%]  lg:mt-0 md:mt-[10%] gap-4">
        <button
          className="flex pointer-events-auto text-black bg-white text-base lg:text-lg font-bold px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-opacity-80 border-none transition duration-200 ease-in-out"
          onClick={() =>
            navigate(`movie/details/${currentWallpaper?.id}/trailer`)
          }
        >
          <FaPlay className="mr-2 mt-1" />
          Play
        </button>
        <Link
          to={`/${currentWallpaper?.media_type}/details/${currentWallpaper?.id}`}
          className="flex pointer-events-auto items-center text-gray-200 bg-transparent border border-white 
  text-base lg:text-lg font-bold hover:bg-white hover:text-white hover:bg-opacity-20 px-4 py-2 md:px-6 md:py-3 rounded-lg 
  transition duration-200 ease-in-out whitespace-nowrap"
        >
          <AiOutlineInfoCircle className="mr-2" />
          More Info
        </Link>
      </div>
    </div>
  );
};

export default HomeCardDetails;
