import React from "react";

const HighlightText = ({ text, customeClass }) => {
  return (
    <span
      className={`bg-gradient-to-b from-[#e0d073] via-[#e39953] to-[#d66854] 
        text-transparent bg-clip-text font-bold ${customeClass} `}
    >
      {" "}
      {text}
    </span>
  );
};

export default HighlightText;
