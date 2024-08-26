import React from "react";

function GptSearchBar() {
  return (
    <div className=" w-[78%] px-4 py-2 rounded-md mt-[9%]  mx-auto">
      <form className="flex flex-row items-center w-full gap-4">
        <label htmlFor="search-input" className="sr-only">
          Search
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="What would you like to do today?"
          className="bg-gray-900 py-3 px-4 rounded-md w-full text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="text-white bg-red-700 py-3 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
