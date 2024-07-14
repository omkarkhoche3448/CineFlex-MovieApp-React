import React from "react";
import { Link } from "react-router-dom";
import noimage from "../../assets/noimage.jpeg";
import playIcon from "../../assets/icon-play.png";
import { TbArrowBigUpLine } from "react-icons/tb";

const Cards = ({ data, title }) => {
    console.log("data of cards ", data)
    console.log("Title of cards ", title)

    return (
        <div className="flex flex-wrap w-[90%] mx-auto h-full justify-center mt-10
         bg-black space-x-4 space-y-6">
            <Link
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });

                }}
                className="fixed bottom-[5%] right-[3%] flex justify-center items-center 
                w-[5vh] h-[5vh] bg-[#6556cd] rounded-lg"
            >
                <TbArrowBigUpLine className="text-white text-xl" />
            </Link>

            {data.map((c, i) => (
                <Link
                    to={`/${c.media_type || title}/details/${c.id}`}

                    className="relative w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%] mb-4"
                    key={i}
                >
                    <div className="relative group h-0 pb-[150%] mb-2 transform transition-transform 
                    duration-300 hover:scale-105">
                        <img
                            className="absolute top-0 left-0 w-[90%] h-full object-cover rounded-md"
                            src={
                                c.backdrop_path || c.poster_path
                                    ? `https://image.tmdb.org/t/p/original${c.backdrop_path || c.poster_path}`
                                    : noimage
                            }
                            alt=""
                            loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 bg-opacity-60">
                            <img src={playIcon} alt="Play Icon" className="h-10 w-10" loading="lazy" />
                        </div>
                    </div>

                    <div className="text-white p-2">
                        <h1 className="text-sm sm:text-base md:text-lg lg:text-lg tracking-tighter font-semibold group-hover:text-red-500 transition-colors duration-300">
                            {(c.name || c.title || c.original_name || c.original_title).slice(0, 39)}
                            {(c.name || c.title || c.original_name || c.original_title).length > 30 ? '...' : ''}
                        </h1>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Cards;
