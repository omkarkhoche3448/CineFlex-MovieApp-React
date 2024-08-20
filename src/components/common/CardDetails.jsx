import React, { useState } from "react";
import { FaStar, FaPlay, FaPlus, FaCheck } from "react-icons/fa";
import { useUser } from "@clerk/clerk-react";

function CardDetails({ info, titleImage, navigate, pathname }) {
  const { isSignedIn } = useUser();
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  if (!info || !info.detail) {
    return null;
  }

  const isMovie = info.detail.release_date !== undefined;
  const isTVShow = info.detail.first_air_date !== undefined;

  const title =
    info.detail.name ||
    info.detail.title ||
    info.detail.original_name ||
    info.detail.original_title;

  const handleAddToWishlist = () => {
    if (!isSignedIn) {
      navigate("/sign-in");
    } else {
      setAddedToWishlist(true);
    }
  };

  return (
    <div className="w-full lg:w-[40%] space-y-3 z-30">
      {titleImage ? (
        <img
          className="text-3xl lg:text-4xl font-black object-contain text-gray-200"
          loading="lazy"
          src={titleImage}
          alt={title}
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
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
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
            onClick={handleAddToWishlist}
            onMouseEnter={() => !isSignedIn && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            disabled={addedToWishlist}
          >
            {addedToWishlist ? (
              <>
                <FaCheck className="mr-2" />
                Remove from Wishlist
              </>
            ) : (
              <>
                <FaPlus className="mr-2" />
                Add to Wish List
              </>
            )}
          </button>
          {/* {!isSignedIn && showTooltip && (
            <div
              className="absolute  bg-gray-800 text-white p-3 rounded-lg shadow-lg bottom-14 left-[100%] transform -translate-x-1/2 mb-2 whitespace-nowrap text-sm 
             sm:max-w-xs md:max-w-md max-w-xs lg:max-w-lg"
            >
              <p className="text-center">
                You need to log in to add items to your wishlist. Click to sign
                in.
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default CardDetails;
