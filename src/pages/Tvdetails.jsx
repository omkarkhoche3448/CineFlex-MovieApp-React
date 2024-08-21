import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removeTv } from "../services/tvActions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "../components/HorizontalCards";
import HighlightText from "../components/common/HighlightText";
import { FaPlay, FaStar } from "react-icons/fa";
import Cast from "../components/common/Cast";
import axios from "../utils/axios";
import CardDetails from "../components/common/CardDetails";

function Tvdetails() {
  document.title = "CineFlex | Tv Details ";

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
      className="relative max-w-full min-h-screen h-fit object-cover filter brightness-56"
    >
      <div className="w-full h-screen lg:h-[90vh] mx-auto flex flex-col mt-32">
        <div className="w-[80%] mx-auto flex flex-col lg:flex-row justify-center mt-32 lg:space-y-0 lg:space-x-44">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] lg:h-[50vh] object-contain rounded-md static z-20 mb-5 lg:mb-0"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.poster_path || info.detail.backdrop_path
            }`}
            alt={info.detail.title || "Tv Poster"}
            loading="lazy"
          />

          <CardDetails
            info={info}
            titleImage={titleImage}
            pathname={pathname}
            navigate={navigate}
          />
        </div>

        <div className="relative w-full mt-9 md:mt-[70px] bg-black">
          <div
            className="absolute inset-x-0 lg:bottom-[90%] md:h-[40vh] lg:h-[75vh] lg:block md:block hidden
              bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-none"
          ></div>

          <div
            className="absolute inset-x-0 -top-[24%] h-[50vh] lg:bottom-[90%] md:h-[40vh] lg:h-[75vh] lg:hidden md:hidden block
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
