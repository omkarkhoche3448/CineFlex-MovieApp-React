import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadtv, removeTv } from "../services/tvActions";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "../components/HorizontalCards";
import HighlightText from '../components/common/HighlightText';
import { FaPlay, FaStar } from 'react-icons/fa';
import Cast from '../components/common/Cast';

function Tvdetails() {
    document.title = "MoviFlex | Tv Show Details";

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
    }, [id]);


    const [showFullOverview, setShowFullOverview] = useState(false);
    const [showFullTranslations, setShowFullTranslations] = useState(false);

    console.log("Info", info)


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
            className="w-full min-h-screen lg:h-[100vh] object-cover filter brightness-56 z-0"
        >
            <div className='w-full relative mx-auto flex flex-col mt-32'>


                <div className="w-[80%] mx-auto flex flex-col lg:flex-row justify-center mt-36 space-y-10 lg:space-y-0 lg:space-x-44">
                    <img
                        className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] lg:h-[70vh] object-cover rounded-md static z-20"
                        src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
                        alt={info.detail.title || "Tv Poster"}
                    />

                    <div className="w-full lg:w-[40%] text-white z-10">
                        <h1 className="text-4xl lg:text-5xl font-black">
                            {info.detail.name || info.detail.title || info.detail.original_name || info.detail.original_title}
                        </h1>

                        <div className="mt-3 mb-5 flex items-center gap-x-3 ">
                            <FaStar className='h-5 w-5 text-yellow-100' />
                            <span className="rounded-full text-base lg:text-lg font-semibold text-white w-12 h-12 flex justify-center items-center">
                                {(info.detail.vote_average).toFixed(1)}
                            </span>

                            <small className="text-base lg:text-lg font-bold text-white">
                                {info.detail.first_air_date.split("-")[0]}
                            </small>

                            <div className="text-base lg:text-lg gap-y-2 flex flex-wrap gap-x-2">
                                {info.detail.genres.map((g, index) => (
                                    <span
                                        key={g.id}
                                        className={`rounded-full font-bold px-2 py-1 bg-yellow-500 text-gray-900`}
                                    >
                                        {g.name}
                                    </span>
                                ))}


                                <span className="rounded-full text-base lg:text-lg font-bold px-2 py-1 bg-caribbeangreen-500 text-gray-900">{info.detail.type} </span>
                                <span className="rounded-full text-base lg:text-lg font-bold px-2 py-1 bg-caribbeangreen-500 text-gray-900">{info.detail.runtime} min</span>
                            </div>
                        </div>


                        <h1 className="text-xl lg:text-2xl font-semibold italic text-zinc-200">
                            {info?.detail?.tagline}
                        </h1>

                        <br />

                        {showFullOverview ? info?.detail?.overview : info?.detail?.overview?.slice(0, 180)}
                        {info?.detail?.overview?.length > 180 && (
                            <span
                                onClick={() => setShowFullOverview(!showFullOverview)}
                                className="text-blue-100 cursor-pointer ml-2"

                            >
                                {showFullOverview ? "show less" : "...more"}
                            </span>
                        )
                        }


                        <br />
                        <br />

                        {showFullTranslations ? info?.translations?.join(", ") : info?.translations?.slice(0, 15)?.join(", ") + '...'}
                        {info?.translations?.length > 10 && (
                            <span
                                onClick={() => setShowFullTranslations(!showFullTranslations)}
                                className="text-blue-100 cursor-pointer ml-2"

                            >
                                {showFullTranslations ? "show less" : "more"}
                            </span>
                        )}


                        <div className="w-[80%] flex flex-wrap gap-y-5 mt-12 ">
                            {info?.watchproviders?.ads?.map((w, i) => (
                                <img
                                    key={i}
                                    title={w.provider_name}
                                    className="w-[5vh] h-[5vh] object-cover rounded-md"
                                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                                    alt=""
                                />
                            ))}
                        </div>

                        <button
                            className="flex items-center text-black bg-white text-base lg:text-lg font-bold px-4 py-2 mt-5 md:px-6 md:py-3 rounded-lg hover:bg-opacity-80 border-none transition duration-200 ease-in-out"
                            onClick={() => navigate(`${pathname}/trailer`)}
                        >
                            <FaPlay className="mr-2 mt-1" />
                            Play Trailer
                        </button>
                    </div>
                </div>

                <div
                    className="w-full h-[33vh] lg:h-screen bg-gradient-to-t from-black to-black/500
                         p-4 text-center text-xl font-bold absolute bottom-[30%]  "
                ></div>

                <div className='w-full mx-auto relative mt-32 z-0 bg-black'>
                    <div
                        className="w-full h-[33vh] lg:h-screen bg-gradient-to-t from-black to-black/500
                         p-4 text-center text-xl font-bold absolute bottom-[80%]  "
                    ></div>


                    <div className="relative z-20 max-w-maxContent mx-auto -mt-16  px-5 lg:px-0">

                        <HighlightText
                            text={" Recommendations & Similar stuff You May Like"}
                            customeClass={"ml-5 text-2xl lg:text-3xl"}
                        />
                        <HorizontalCards
                            title="movie"
                            data={info.recommendations.length > 0 ? info.recommendations : info.similar}
                        />
                    </div>

                    <div className='relative z-20 max-w-maxContent mx-auto px-5 lg:px-0 '>
                        <Cast cast={info.cast} createdBy={info.detail.created_by} />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default Tvdetails;
