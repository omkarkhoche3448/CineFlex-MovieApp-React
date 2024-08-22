import React from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function WishListCard({ item, handleRemove }) {
  const detailsLink = `/${item.media_type || "movie"}/details/${item.id}`;

  return (
    <div className="relative group bg-gray-900 text-white p-4 rounded-lg shadow-lg transition-shadow duration-300 flex flex-col max-w-xs mx-auto">
      <Link to={detailsLink} className="block">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title}
          className="w-full h-48 object-contain rounded-lg mb-4"
        />
      </Link>
      <div className="flex-1">
        <Link
          to={detailsLink}
          className="text-lg font-semibold mb-2 block hover:underline"
        >
          {item.title}
        </Link>
        <p className="text-sm text-gray-400 line-clamp-4 mb-4">
          {item.overview}
        </p>
      </div>
      <div
        onClick={handleRemove}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity duration-300 cursor-pointer"
      >
        <MdDelete size={24} />
      </div>
    </div>
  );
}

export default WishListCard;
