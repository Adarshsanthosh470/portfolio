import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CUSTOM 8K AI GENERATED REALISTIC CINEMATIC RESOURCES ---
const scenes = [
  {
    id: "catering",
    url: "/images/intro/catering.png",
    subtitle: "Long days serving others......"
  },
  {
    id: "driver",
    url: "/images/intro/driver.png",
    subtitle: "...Miles taught me direction..."
  },
  {
    id: "delivery",
    url: "/images/intro/delivery.png",
    subtitle: "...Every order meant something."
  },
  {
    id: "engineer",
    url: "/images/intro/engineer.png",
    subtitle: "Now building something bigger."
  }
];

// --- MATCH-CUT CINEMATIC CAMERA VARIANTS ---
// These ensure the static images feel like a continuous video by aggressively tracking/panning (x: ["0%", "-5%"])
// and cross-fading using depth-of-field blur pulls to mask any misalignments in the match-cut body.
const matchCutVariants = {
  enter: { opacity: 0, scale: 1.1, filter: "blur(20px)", saturate: 1.5 },
  active: {
    opacity: 1,
    scale: 1.05,
    x: ["0%", "-5%"], // The continuous drone-camera pan creating the video tracking shot illusion
    filter: "blur(0px)",
    saturate: 1,
    transition: {
      // Crossfade blur timing
      opacity: { duration: 1.5, ease: "easeOut" },
      filter: { duration: 1.5, ease: "easeOut" },
      saturate: { duration: 1.5, ease: "easeOut" },
      // Constant linear camera pan across the whole phase
      x: { duration: 6, ease: "linear" }
    }
  },
  exit: {
    opacity: 0,
    scale: 1.2,
    filter: "blur(30px)",
    transition: { duration: 1.5, ease: "easeInOut" }
  }
};

export default function TransformationalIntro({ onComplete }: { onComplete: () => void }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Stretched Cinematic Sequence Timing for a full ~20s emotional impact
    const timings = [
      { delay: 4500, index: 1 },  // To Driver at 4.5s
      { delay: 9000, index: 2 },  // To Delivery at 9.0s
      { delay: 13500, index: 3 }, // To Engineer at 13.5s
      { delay: 20000, index: 4 }  // Finish at 20.0s
    ];

    const timeouts = timings.map(t =>
      setTimeout(() => {
        if (t.index === 4) {
          setIsCompleted(true);
          onComplete();
        } else {
          setCurrentSceneIndex(t.index);
        }
      }, t.delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[99999] bg-black overflow-hidden flex items-center justify-center pointer-events-auto select-none"
        >
          {/* THE MATCH-CUT CAMERA SEQUENCE */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSceneIndex}
              className="absolute inset-[-5%] w-[110%] h-[110%] origin-center" // Oversized to allow panning without showing edges
              variants={matchCutVariants}
              initial="enter"
              animate="active"
              exit="exit"
            >
              {/* Photorealistic AI Frame */}
              <div
                className="absolute inset-0 bg-cover bg-center brightness-[0.8] contrast-125"
                style={{ backgroundImage: `url(${scenes[currentSceneIndex].url})` }}
              />

              {/* Dynamic Relighting Overlay (Color grades the sequence) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Global Cinematic Vignette overlay (remains static over the pan) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] z-20 pointer-events-none" />

          {/* STORY NARRATIVE SUBTITLES */}
          <div className="absolute bottom-[5%] md:bottom-[10%] w-full flex justify-center z-40 pointer-events-none">
            <AnimatePresence mode="wait">
              {currentSceneIndex < 3 && (
                <motion.p
                  key={currentSceneIndex}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 1.5 }}
                  className="text-white/95 text-xl md:text-3xl lg:text-4xl font-light tracking-wide text-center px-4 md:px-12 italic drop-shadow-[0_4px_25px_rgba(0,0,0,1)] shadow-black"
                >
                  {scenes[currentSceneIndex].subtitle}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* FINAL RESOLUTION TITLE CARD */}
          <AnimatePresence>
            {currentSceneIndex === 3 && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1, duration: 2.5 }}
                className="absolute inset-0 flex flex-col justify-center items-center z-50 pointer-events-none bg-black/60 backdrop-blur-sm"
              >
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1.5 }}
                  className="text-[#00f2ff] text-xl md:text-3xl font-light tracking-widest mb-6 italic drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]"
                >
                  {scenes[3].subtitle}
                </motion.p>
                <motion.h2
                  className="text-white text-5xl md:text-8xl font-black italic tracking-tighter drop-shadow-[0_0_40px_rgba(0,242,255,0.8)]"
                >
                  ADARSH SANTHOSH
                </motion.h2>
                <motion.p
                  className="text-cyan-400 text-lg md:text-2xl font-light tracking-widest mt-6 uppercase text-center"
                >
                  A Story of Resilience <span className="text-white/30 mx-3">|</span> Software Engineer
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle High-End Film Grain Post-Processing simulating vintage film / camera transmission noise */}
          <div className="absolute inset-0 z-50 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />

        </motion.div>
      )}
    </AnimatePresence>
  );
}