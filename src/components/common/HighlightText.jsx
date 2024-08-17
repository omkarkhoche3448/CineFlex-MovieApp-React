import React from "react";

const HighlightText = ({ text, customeClass }) => {
  return (
    <span
      className={`
        bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#EF4444]
        text-transparent bg-clip-text font-bold ${customeClass} `}
    >
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
