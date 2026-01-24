"use client";

import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative h-screen bg-dark flex items-center justify-center overflow-hidden">
      <motion.div className="relative z-10 flex flex-col items-center">
        <motion.img
          src="/IMG_20250417_180630_018.png"
          alt="Adarsh Santhosh"
          className="w-64 h-64 rounded-full object-cover border-8 border-neutral-700 mb-8"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Adarsh Santhosh
        </motion.h1>
        <motion.p
          className="text-xl md:text-3xl text-neutral-300 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          B.Tech Computer Science Student & Aspiring Software Developer
        </motion.p>
      </motion.div>
      {/* Ambient Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl filter"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        style={{ x: "-50%", y: "-50%" }}
      />
       <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl filter"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  );
};

export default HeroSection;
