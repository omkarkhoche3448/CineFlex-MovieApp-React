import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  console.log(movie);
  const detailsLink = `/${movie.media_type || "movie"}/details/${movie.id}`;
  const title =
    movie.name || movie.title || movie.original_name || movie.original_title;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg transition-shadow duration-300 flex flex-col w-full h-[360px] ">
      <Link to={detailsLink} className="block">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
          className="w-full h-48 object-contain rounded-lg mb-4"
        />
      </Link>
      <div className="flex-1">
        <Link
          to={detailsLink}
          className="text-lg font-semibold mb-2 block hover:underline"
        >
          {title}
        </Link>
        <p className="text-sm text-gray-400 line-clamp-4 mb-4">
          {movie.overview}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
