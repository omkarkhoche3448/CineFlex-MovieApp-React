import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removeTv } from "../services/tvActions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "../components/HorizontalCards";
import HighlightText from "../components/common/HighlightText";
import { FaPlay, FaStar } from "react-icons/fa";
import Cast from "../components/common/Cast";
import axios from "../utils/axios";

function Tvdetails() {
  document.title = "CineFlex | Tv Show Details";

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [id, dispatch]);

  const [titleImage, setTitleImage] = useState(null);
  useEffect(() => {
    const getTitleImage = async () => {
      try {
        const { data } = await axios.get(`/tv/${id}/images`);
        const images = data.logos || data.posters || data.backdrops;
        const titleImg =
          images.find((image) => image.iso_639_1 === "en") || images[0];
        setTitleImage(
          `https://image.tmdb.org/t/p/original${titleImg.file_path}`
        );
      } catch (error) {
        console.log("Error: ", error);
        setTitleImage(null);
      }
    };

    if (info && info.detail) {
      getTitleImage();
    }
  }, [id, info]);

  if (!info) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  const backgroundImage = `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`;

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=" relative max-w-full min-h-screen h-fit object-cover filter brightness-56 "
    >
      <div className="w-full h-screen lg:h-[90vh] mx-auto flex flex-col mt-32">
        <div className="w-[80%] mx-auto flex flex-col lg:flex-row justify-center mt-32 lg:space-y-0 lg:space-x-44 ">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] lg:h-[50vh] object-contain rounded-md static z-20 mb-5 lg:mb-0"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt={info.detail.title || "Tv Poster"}
            loading="lazy"
          />

          <div className="w-full lg:w-[40%] space-y-3 z-30">
            {titleImage ? (
              <img
                className="text-3xl lg:text-4xl font-black object-contain text-gray-200"
                loading="lazy"
                src={titleImage}
                alt={info.detail.title || "Movie Title Image"}
                style={{
                  maxWidth: "50%",
                  height: "auto",
                  display: "block",
                  marginLeft: "0",
                  marginRight: "0",
                }}
              />
            ) : (
              <h1 className="text-3xl lg:text-4xl font-black text-gray-200">
                {info.detail.name ||
                  info.detail.title ||
                  info.detail.original_name ||
                  info.detail.original_title}
              </h1>
            )}

            <div className=" flex flex-col lg:flex-row gap-x-3">
              <div className="flex items-center gap-x-2">
                <FaStar className="h-5 w-5 text-yellow-100" />
                <span className="rounded-full text-base font-semibold text-gray-200 w-12 h-12 flex justify-center items-center">
                  {info.detail.vote_average.toFixed(1)}
                </span>
                <small className="text-base lg:text-lg font-bold bg-opacity-50 text-gray-200">
                  {info.detail.first_air_date.split("-")[0]}
                </small>
              </div>

              <div className="flex items-center text-base lg:text-lg gap-y-2 gap-x-2 flex-wrap">
                {info.detail.genres.map((g, index) => (
                  <span
                    key={g.id}
                    className={`rounded-full font-semibold px-1 py-1 bg-yellow-500 bg-opacity-70 text-gray-900`}
                  >
                    {g.name}
                  </span>
                ))}

                <span className="rounded-full text-base lg:text-lg font-semibold px-1 py-1 bg-caribbeangreen-500 bg-opacity-70 text-gray-900">
                  {info.detail.episode_run_time[0]} min
                </span>
              </div>
            </div>

            <h1 className="text-xl lg:text-2xl font-semibold italic text-gray-200">
              {info.detail.tagline}
            </h1>

            <p className="text-base lg:text-lg text-gray-200">
              {info.detail.overview.length < 146
                ? info.detail.overview
                : info.detail.overview.slice(0, 146) + "."}
            </p>

            <div className="w-[80%] flex flex-wrap p-3">
              {info.watchproviders && info.watchproviders.flatrate && (
                <div className="flex space-x-4 items-center text-white">
                  {info.watchproviders.flatrate.map((w, i) => (
                    <img
                      key={i}
                      title={w.provider_name}
                      className="w-[6vh] h-[6vh] object-cover rounded-md"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt={w.provider_name}
                      loading="lazy"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              className="flex items-center text-black bg-white text-base lg:text-lg  font-bold  
                md:px-6 md:py-3 rounded-lg hover:bg-opacity-80 border-none transition duration-200 ease-in-out"
              onClick={() => navigate(`${pathname}/trailer`)}
            >
              <FaPlay className="mr-2 " />
              Play Trailer
            </button>
          </div>
        </div>

        <div className="relative w-full mt-9 md:mt-[70px] bg-black">
          <div
            className="absolute inset-x-0 lg:bottom-[90%] md:h-[40vh] lg:h-[75vh] lg:block md:block hidden
              bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none"
          ></div>

          <div
            className="absolute inset-x-0 -top-[30%] h-[33vh] lg:bottom-[90%] md:h-[40vh] lg:h-[75vh] lg:hidden md:hidden block
              bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"
          ></div>

          <div className="flex flex-col items-center space-y-4">
            {info.recommendations.length > 0 && (
              <div className="max-w-[80%] flex flex-col z-30 space-y-3 mt-10">
                <HighlightText
                  text={"Recommendations & Similar Stuff You May Like"}
                  customeClass={"ml-5 text-2xl lg:text-3xl"}
                />
                <HorizontalCards
                  title="tv"
                  data={
                    info.recommendations.length > 0
                      ? info.recommendations
                      : info.similar
                  }
                />
              </div>
            )}
          </div>

          <div className="relative max-w-maxContent mx-auto px-5 lg:px-0">
            <Cast cast={info.cast} createdBy={info.detail.created_by} />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Tvdetails;
