import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const blockVariants = {
    start: {
      y: "0px",
    },
    end: {
      y: "-25px",
    },
  };

  const blockTransition = {
    duration: 0.45,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  };

  const blocks = [
    { letter: "T", color: "bg-toy-primary" },
    { letter: "O", color: "bg-toy-secondary" },
    { letter: "Y", color: "bg-toy-yellow" },
  ];

  return (
    <div className="flex flex-col gap-2 justify-center items-center py-20 min-h-[60vh] w-full">
      <motion.div
        className="flex gap-4 h-16 items-center justify-center"
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {blocks.map((b, i) => (
          <motion.div
            key={i}
            className={`w-14 h-14 ${b.color} rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg border-2 border-white/20 select-none`}
            variants={blockVariants}
            transition={blockTransition}
          >
            {b.letter}
          </motion.div>
        ))}
      </motion.div>
      <p className="text-gray-400 text-xs font-bold tracking-wider animate-pulse mt-6 uppercase">
        Preparing Playtime...
      </p>
    </div>
  );
};

export default Loading;