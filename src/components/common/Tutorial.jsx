import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import handImage from "../../assets/tap.png";

const Tutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowTutorial(true);

      setTimeout(() => {
        setShowTutorial(false);
      }, 4000);
    }, 2500);
  }, []);

  return (
    showTutorial && (
      <div className="fixed pointer-events-none top-0 left-0 w-full h-full flex justify-center items-center z-50">
        <motion.div
          className="absolute"
          initial={{ x: 0 }}
          animate={{ x: [0, 300, 0] }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            bottom: "25%",
            right: "30%",
            transform: "translateX(50%)",
          }}
        >
          <img
            src={handImage}
            alt="Slide Animation"
            className="w-16 h-16"
            loading="lazy"
          />
        </motion.div>

        <div
          className="absolute bottom-0 md:bottom-10 lg:bottom-20 right-8 bg-gray-800 bg-opacity-50 text-white text-sm md:text-base p-4 
        rounded-lg shadow-lg max-w-xs flex items-center space-x-2"
        >
          <span>👋</span>
          <p className="font-semibold">Slide the images to explore!</p>
        </div>
      </div>
    )
  );
};

export default Tutorial;
