import React, { useState, useRef, useEffect } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import useOnClickOutside from "../hooks/useOnClickOutside";

const DropDown = ({ title, options, func, defaultValue }) => {
  const defaultOption = { id: "0", name: title };
  const [selected, setSelected] = useState(defaultValue || defaultOption);

  console.log(defaultValue);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleSelect = (option) => {
    setSelected(option);
    func(option.id);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block w-full md:w-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-richblack-600 text-white border
                 border-gray-300 rounded-md flex justify-between items-center 
                    focus:outline-none focus:border-richblack-600"
      >
        <span className="capitalize">{selected.name || title}</span>
        <BiSolidChevronDown className="w-5 h-5 text-white" />
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-gray-900 border border-gray-300 rounded-md max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option.id}
              className={`px-4 py-3 cursor-pointer text-white hover:bg-gray-700 
                                ${
                                  option.id === selected.id
                                    ? "bg-gray-700 font-semibold"
                                    : ""
                                }`}
              onClick={() => handleSelect(option)}
            >
              {option.name || option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
