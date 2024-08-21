import React from "react";
import { MdDelete } from "react-icons/md";

function WishListCard({ item, handleRemove }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex items-center">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title}
        className="w-24 h-36 object-cover rounded-md mr-4"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-400">{item.overview}</p>
      </div>
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-400 transition duration-200"
      >
        <MdDelete size={24} />
      </button>
    </div>
  );
}

export default WishListCard;
