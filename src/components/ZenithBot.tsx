"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

// Image path references from the public folder
const EyeOpenImage = "/spidey-open.png";   
const EyeClosedImage = "/spidey-closed.png"; 

interface SpideyHangingProps {
  stage: number;
  hoveredProject?: string;
  isProjectClicked?: boolean;
  isCertificateClicked?: boolean;
  hoveredDockIcon?: string;
}

// ---------------- RIGID ROPE ATTACHED TO MIDDLE OF SPIDEY ----------------
const SpideyHanging = ({ stage, isProjectClicked, isCertificateClicked }: SpideyHangingProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [lastMove, setLastMove] = useState(Date.now());
  const [isIdle, setIsIdle] = useState(false);
  const [isTickled, setIsTickled] = useState(false);

  // Scroll tracking to extend the rope length down safely within viewport bounds
  const { scrollYProgress } = useScroll();
  const webHeight = useTransform(scrollYProgress, [0, 1], [140, 380]);
  const smoothWebHeight = useSpring(webHeight, { stiffness: 120, damping: 25 });

  // State to control eye image (Open/Closed)
  const [currentEyeImage, setCurrentEyeImage] = useState(EyeOpenImage);

  // Smooth Eye Springs for looking around at the mouse cursor
  const eyeX = useSpring(useTransform(mouseX, [-800, 800], [-8, 8]), { stiffness: 1000, damping: 30 });
  const eyeY = useSpring(useTransform(mouseY, [-400, 400], [-6, 6]), { stiffness: 1000, damping: 30 });

  useEffect(() => {
    const handleMove = (e: any) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      mouseX.set(x - window.innerWidth / 2);
      mouseY.set(y - window.innerHeight / 2);
      setLastMove(Date.now());
      setIsIdle(false);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const idleCheck = setInterval(() => { if (Date.now() - lastMove > 8000) setIsIdle(true); }, 1000);
    return () => clearInterval(idleCheck);
  }, [lastMove]);

  // Eye Blink Logic
  useEffect(() => {
    let blinkInterval: NodeJS.Timeout | undefined = undefined;

    const performBlink = () => {
      setCurrentEyeImage(EyeClosedImage);
      setTimeout(() => {
        setCurrentEyeImage(EyeOpenImage);
      }, 150); 
    };

    const startBlinking = () => {
      performBlink();
      blinkInterval = setInterval(performBlink, Math.random() * 4000 + 2000); 
    };

    if (isIdle) {
       if (blinkInterval) clearInterval(blinkInterval);
       setCurrentEyeImage(EyeClosedImage); 
    } else if (isTickled) {
       if (blinkInterval) clearInterval(blinkInterval);
       blinkInterval = setInterval(performBlink, 300);
    } else {
       startBlinking();
    }

    return () => {
      if (blinkInterval) clearInterval(blinkInterval);
    };
  }, [isIdle, isTickled]);

  const handleRobotClick = () => {
    setIsTickled(true);
    const timer = setTimeout(() => { setIsTickled(false); }, 3000);
    return () => clearTimeout(timer);
  };

  if (stage === 0) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotate: isTickled ? [-12, 12, -12, 12, 0] : [-9, 9, -9] 
        }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ 
          rotate: {
            duration: isTickled ? 0.3 : 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }
        }}
        style={{ originX: 0.5, originY: 0 }}
        className="fixed z-[60] top-0 right-10 pointer-events-auto flex flex-col items-center"
      >
        {/* STRAIGHT ROPE LINE */}
        <motion.div 
          style={{ height: smoothWebHeight }}
          className="w-0.5 bg-cyan-400 shadow-[0_0_12px_#00f2ff]" 
        />

        {/* SPIDEY CONTAINER */}
        <div 
          className="relative cursor-pointer hover:scale-105 transition-transform flex flex-col items-center group -mt-20 md:-mt-24 z-10"
          onClick={handleRobotClick}
        >
          {/* EXCITEMENT SPARKLES */}
          {(isProjectClicked || isCertificateClicked) && (
            <div className="absolute -inset-16 flex items-center justify-center pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 0], 
                    opacity: [0, 1, 0], 
                    x: (Math.random() - 0.5) * 90, 
                    y: (Math.random() - 0.5) * 70,
                    rotate: [0, 180] 
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "easeOut" 
                  }}
                  className="absolute text-cyan-400 filter drop-shadow-[0_0_5px_#00f2ff]"
                >
                  <Sparkles size={Math.random() * 8 + 8} fill="currentColor" />
                </motion.div>
              ))}
            </div>
          )}

          {/* SPIDEY FACE / BODY IMAGE CONTAINER */}
          <div className="relative w-48 h-38 md:w-56 md:h-44 flex items-center justify-center">
            <motion.img 
              src={currentEyeImage} 
              alt="Spidey Eyes"
              style={{ x: eyeX, y: eyeY }} 
              className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(0,242,255,0.5)]"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpideyHanging;