import React from "react";
import { FaYoutube, FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full p-6 bg-black flex flex-col md:flex-row justify-between items-center text-white space-y-6 md:space-y-0">
      <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
        <h2 className="text-xl font-bold">👋 Welcome to CineFlex</h2>
        <p className="text-sm leading-relaxed">
          This site does not store any files on our server; we only link to
          media hosted on 3rd party services.
          <br />
          Copyright © CineFlex 2024
        </p>
      </div>
      <div className="flex items-center space-x-6 mt-4 md:mt-0">
        <a href="#" className="text-sm hover:underline">
          DMCA
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube className="h-8 w-8 text-red-500 hover:text-red-400 transition duration-300" />
        </a>
        <a
          href="https://www.discord.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord className="h-8 w-8 text-indigo-600 hover:text-indigo-400 transition duration-300" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
