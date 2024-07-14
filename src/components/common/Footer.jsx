import React from "react";
import { FaYoutube, FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full bottom-0 mt-5 p-5 bg-black flex flex-col md:flex-row justify-between items-center text-white">
      <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
        <h2 className="text-lg font-semibold">👋 Welcome to MovieFlex</h2>
        <p className="text-sm">
          This site does not store any files on our server, we only link to
          media hosted on 3rd party services.
          <br />
          Copyright © MovieFlex 2024
        </p>
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <a href="#" className="text-white hover:underline">
          DMCA
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="h-7 w-7 text-red-500 hover:text-red-300 transition duration-300" />
        </a>
        <a href="https://www.discord.com" target="_blank" rel="noopener noreferrer">
          <FaDiscord className="h-7 w-7 text-violet-800 hover:text-violet-600 transition duration-300" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
