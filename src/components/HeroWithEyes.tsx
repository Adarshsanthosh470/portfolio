"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HeroWithEyes = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / 15,
        y: (e.clientY - window.innerHeight / 2) / 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black pt-20">
      {/* PERSISTENT ROBOTIC EYES */}
      <div className="flex gap-10 md:gap-24 mb-12">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="w-32 h-24 md:w-60 md:h-44 bg-[#00f2ff] rounded-[3.5rem] 
                       shadow-[0_0_60px_#00f2ff,0_0_120px_rgba(0,242,255,0.4)]
                       border-4 border-cyan-100/20"
          />
        ))}
      </div>

      <div className="text-center px-6 max-w-4xl">
        <h1 className="text-white text-2xl md:text-4xl font-light leading-relaxed">
          HI I am <span className="font-bold text-cyan-400">Adarsh Santhosh</span>, <br />
          <span className="opacity-80">B.Tech Computer Science Student & Aspiring Software Developer.</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroWithEyes;