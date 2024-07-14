import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import { RiCloseFill } from "react-icons/ri";

const Trailer = () => {
    document.title = " MovieFlex | Trailer"
    
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideo = useSelector((state) => state[category].info.videos);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                navigate(-1);
            }
        };
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [navigate]);

    useEffect(() => {
        if (ytvideo && ytvideo.name) {
            document.title = "MovieFlex | " + ytvideo.name;
        }
    }, [ytvideo]);

    return (
        <div className="bg-[rgba(0,0,0,.9)] fixed z-[100] top-0 left-0 w-screen h-screen flex 
        items-center justify-center">
            <Link
                onClick={() => navigate(-1)}
                className="absolute hover:text-[#6556CD] text-3xl text-white right-[5%] top-[5%]"
            >
                <RiCloseFill />
            </Link>

            {loading && (
                <div className="absolute z-50 flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            )}

            {ytvideo && ytvideo.key && !error ? (
                <ReactPlayer
                    controls
                    url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
                    onReady={() => setLoading(false)}
                    onError={() => {
                        setLoading(false);
                        setError(true);
                    }}
                    width="100%"
                    height="100%"
                    className="react-player"
                />
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default Trailer;
