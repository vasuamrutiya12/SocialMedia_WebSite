import React from "react";
import { motion } from "framer-motion";

const StoryCircle = ({ username, avatarUrl, seen = false, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer flex-shrink-0 p-2"
    >
      <div
        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full p-0.5 ${
          seen
            ? "bg-gray-500/50"
            : "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"
        } flex items-center justify-center transition-all duration-300 hover:scale-105`}
      >
        <div className="w-full h-full bg-black rounded-full p-0.5">
          <img
            src={avatarUrl || `https://ui-avatars.com/api/?name=${username}&background=random`}
            alt={username}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs lg:text-sm text-gray-300 mt-1 text-center max-w-[70px] truncate">
        {username}
      </span>
    </motion.div>
  );
};

export default StoryCircle;