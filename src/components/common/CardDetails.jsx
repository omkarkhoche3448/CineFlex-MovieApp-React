import React, { useState, useEffect } from "react";
import { FaStar, FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../slices/wishlistSlice";

function CardDetails({ info, titleImage, navigate, pathname }) {
  const { isSignedIn } = useUser();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (info?.detail) {
      setAddedToWishlist(wishlist.some((item) => item.id === info.detail.id));
    }
  }, [wishlist, info]);

  if (!info?.detail) {
    return null;
  }

  const isMovie = info.detail.release_date !== undefined;
  const isTVShow = info.detail.first_air_date !== undefined;

  const title =
    info.detail.name ||
    info.detail.title ||
    info.detail.original_name ||
    info.detail.original_title;

  const handleWishlistToggle = () => {
    if (!isSignedIn) {
      navigate("/sign-in?redirectUrl=/wishlist");
    } else {
      if (addedToWishlist) {
        dispatch(removeFromWishlist(info.detail.id));
      } else {
        dispatch(addToWishlist(info.detail));
      }
    }
  };

  return (
    <div className="w-full lg:w-[40%] space-y-3 z-30">
      {titleImage ? (
        <img
          className="object-contain"
          loading="lazy"
          src={titleImage}
          alt={title}
          style={{
            maxWidth: "50%",
            height: "auto",
            display: "block",
          }}
        />
      ) : (
        <h1 className="text-3xl lg:text-4xl font-black text-gray-200">
          {title}
        </h1>
      )}

      <div className="flex flex-col lg:flex-row gap-x-3">
        <div className="flex items-center gap-x-2">
          <FaStar className="h-5 w-5 text-yellow-100" />
          <span className="rounded-full text-base font-semibold text-gray-200 w-12 h-12 flex justify-center items-center">
            {info.detail.vote_average.toFixed(1)}
          </span>
          <small className="text-base lg:text-lg font-bold bg-opacity-50 text-gray-200">
            {isMovie && info.detail.release_date
              ? info.detail.release_date.split("-")[0]
              : isTVShow && info.detail.first_air_date
              ? info.detail.first_air_date.split("-")[0]
              : "N/A"}
          </small>
        </div>

        <div className="flex items-center text-base lg:text-lg gap-y-2 gap-x-2 flex-wrap">
          {info.detail.genres &&
            info.detail.genres.map((g) => (
              <span
                key={g.id}
                className="rounded-full font-semibold px-1 py-1 bg-yellow-500 bg-opacity-70 text-gray-900"
              >
                {g.name}
              </span>
            ))}
        </div>
      </div>

      <h1 className="text-xl lg:text-2xl font-semibold italic text-gray-200">
        {info.detail.tagline}
      </h1>

      <p className="text-base lg:text-lg text-gray-200">
        {info.detail.overview.length < 146
          ? info.detail.overview
          : info.detail.overview.slice(0, 146) + "..."}
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
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 ">
        <button
          className="flex items-center justify-center text-black bg-white text-base lg:text-lg font-bold px-6 py-3 rounded-lg hover:bg-opacity-80 border-none transition duration-200 ease-in-out"
          onClick={() => navigate(`${pathname}/trailer`)}
        >
          <FaPlay className="mr-2" />
          Play Trailer
        </button>

        <div className="relative">
          <button
            className={`flex items-center justify-center w-full text-white ${
              addedToWishlist
                ? "bg-green-600 hover:bg-green-500"
                : "bg-red-600 hover:bg-red-500"
            } text-base lg:text-lg font-bold px-4 py-3 rounded-lg transition duration-200 ease-in-out`}
            onClick={handleWishlistToggle}
            onMouseEnter={() => !isSignedIn && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {addedToWishlist ? (
              <>
                <FaCheck className="mr-2" />
                Remove from Wishlist
              </>
            ) : (
              <>
                <FaPlus className="mr-2" />
                Add to Wishlist
              </>
            )}
          </button>
          {!isSignedIn && showTooltip && (
            <div
              className="absolute bg-gray-800 bg-opacity-50 text-white text-sm md:text-base p-3 rounded-lg shadow-lg 
            bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap "
            >
              <p className="text-center">
                Log in to manage your ❤️ wishlist. Click to sign in.{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
