"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onLoaded }: { onLoaded: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 4000; 
    const intervalTime = 50;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((old) => (old >= 100 ? 100 : old + increment));
    }, intervalTime);

    const endTimer = setTimeout(() => {
      onLoaded();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(endTimer);
    };
  }, [onLoaded]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black select-none"
    >
      <div className="flex flex-col items-center text-center px-6">
        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-[0.4em] mb-4">
          Loading Portfolio
        </p>
        <h1 className="text-white text-3xl md:text-6xl font-bold mb-10 tracking-tight">
          Adarsh Santhosh
        </h1>
        <div className="w-64 md:w-80 h-[2px] bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-zinc-600 text-[10px] mt-4 font-mono uppercase tracking-widest">
          Initializing... {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;