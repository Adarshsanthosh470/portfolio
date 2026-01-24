"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

// --- 1. INTERFACES ---
interface RobotMouthProps {
  stage: number;
  isIdle: boolean;
  isScanning: boolean;
  isHoveringProject: boolean;
  hoveredDockIcon: boolean;
}

interface IndividualEyeProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  stiffness: number;
  damping: number;
  isIdle: boolean;
  isBlinking: boolean;
  isScanning: boolean;
}

interface ZenithBotProps {
  stage: number;
  hoveredProject?: string;
  isProjectClicked?: boolean;
  isCertificateClicked?: boolean;
  hoveredDockIcon?: string;
}

// --- 2. ROBOT MOUTH COMPONENT ---
const RobotMouth = ({ stage, isIdle, isScanning, isHoveringProject, hoveredDockIcon }: RobotMouthProps) => {
  const getMouthPath = () => {
    if (isIdle) return "M 5 10 L 45 10"; 
    
    if (isScanning || stage === 4 || isHoveringProject || hoveredDockIcon) {
      return "M 20 10 A 5 5 0 1 1 30 10 A 5 5 0 1 1 20 10"; 
    }

    if (stage === 3 || stage === 5 || stage === 8) {
      return "M 10 5 Q 25 15 40 5"; 
    }

    return "M 10 10 L 40 10"; 
  };

  return (
    <div className="flex justify-center mt-1 w-full h-4">
      <svg width="50" height="20" viewBox="0 0 50 20" className="drop-shadow-[0_0_8px_#00f2ff]">
        <motion.path
          d={getMouthPath()}
          stroke="#00f2ff"
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
          animate={{ d: getMouthPath(), opacity: isIdle ? 0.3 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </div>
  );
};

// --- 3. INDEPENDENT EYE COMPONENT ---
const IndividualEye = ({ mouseX, mouseY, stiffness, damping, isIdle, isBlinking, isScanning }: IndividualEyeProps) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });
  const x = useTransform(springX, [-800, 800], [-35, 35]);
  const y = useTransform(springY, [-400, 400], [-25, 25]);
  const scaleSpring = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const updateScale = () => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const dx = (mouseX.get() + window.innerWidth / 2) - (rect.left + rect.width / 2);
      const dy = (mouseY.get() + window.innerHeight / 2) - (rect.top + rect.height / 2);
      scaleSpring.set(Math.max(0.4, Math.min(1, Math.sqrt(dx * dx + dy * dy) / 300)));
    };
    return mouseX.on("change", updateScale);
  }, [mouseX, scaleSpring]);

  return (
    <motion.div
      ref={eyeRef}
      style={{ x, y, scale: isBlinking ? 0.1 : scaleSpring }}
      className={`w-6 h-4 md:w-12 md:h-8 bg-[#00f2ff] rounded-[0.5rem] shadow-[0_0_40px_#00f2ff] border-2 border-cyan-100/20 relative flex items-center justify-center transition-opacity duration-500 overflow-hidden ${isIdle ? 'opacity-30' : 'opacity-100'}`}
    >
      <motion.div 
        animate={isScanning ? { y: ["-100%", "100%"] } : { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
        transition={{ duration: isScanning ? 0.5 : 0.15, repeat: Infinity, ease: "linear" }} 
        className={isScanning ? "absolute inset-0 w-full bg-cyan-400/30" : "w-1/2 h-1/2 bg-white/40 rounded-full blur-xl"} 
      />
    </motion.div>
  );
};

// --- 4. MAIN ZENITH-BOT COMPONENT ---
const ZenithBot = ({ stage, hoveredProject, isProjectClicked, isCertificateClicked, hoveredDockIcon }: ZenithBotProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isIdle, setIsIdle] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [inspecting, setInspecting] = useState(false);
  const [verified, setVerified] = useState(false);
  const [clickShowVerified, setClickShowVerified] = useState(false);
  const [lastMove, setLastMove] = useState(Date.now());

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
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const idleCheck = setInterval(() => { if (Date.now() - lastMove > 10000) setIsIdle(true); }, 1000);
    const blinkCheck = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => { clearInterval(idleCheck); clearInterval(blinkCheck); };
  }, [lastMove]);

  useEffect(() => {
    if (isProjectClicked || isCertificateClicked) {
      setClickShowVerified(true);
      const timer = setTimeout(() => setClickShowVerified(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isProjectClicked, isCertificateClicked]);

  useEffect(() => {
    if (stage === 7 || stage === 8) {
      setVerified(false);
      setInspecting(true);
      const timer = setTimeout(() => {
        setInspecting(false);
        setVerified(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setVerified(false);
      setInspecting(false);
    }
  }, [stage]);

  const getDialogue = () => {
    if (hoveredDockIcon) return hoveredDockIcon.toUpperCase(); 
    if (clickShowVerified) return "Verified";
    if (isIdle) return "Zzz... System on standby...";

    switch (stage) {
      case 2: return "Scanning Adarsh's portfolio..";
      case 3: return "Computer Engineering student graduate at 2026.";
      case 4: 
        if (hoveredProject?.match(/Task Hero|My Garage/i)) return "Detected:High protected Android Project.";
        if (hoveredProject?.match(/Codeless|Draw Buddy|Voting|AI Platform/i)) return "Detected: responsive web application";
        return "exploring projects..";
      case 5: return "Ready to start a project? Send Adarsh a message!";
      case 6: return "Exploring skills";
      case 7: 
      case 8: return inspecting ? "inspecting.." : "Verified";
      default: return "";
    }
  };

  if (stage === 0) return null;

  const isExcited = (stage === 5 && !isIdle);
  const showBadge = (verified || clickShowVerified) && !inspecting;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage + (hoveredProject || "") + (hoveredDockIcon || "")}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="fixed z-[60] bottom-24 right-8 pointer-events-none flex flex-col items-center gap-4"
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <motion.div className="bg-zinc-900/90 border border-cyan-500/30 backdrop-blur-md text-white px-4 py-2 rounded-2xl text-xs md:text-sm shadow-2xl mb-1 min-w-[150px] text-center">
            {getDialogue()}
          </motion.div>
          {showBadge && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-6 top-0 text-cyan-400 drop-shadow-[0_0_8px_#00f2ff]">
              <CheckCircle2 size={24} />
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          animate={{ 
            y: isExcited ? [0, -10, 0, -10, 0] : [0, -15, 0],
            rotate: isExcited ? [0, 2, -2, 0] : 0 
          }}
          transition={{ 
            y: { duration: isExcited ? 0.4 : 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.1, repeat: Infinity }
          }}
          className="flex flex-col items-center bg-zinc-900/60 p-4 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-xl"
        >
          <div className="flex gap-2 mb-1">
            <IndividualEye mouseX={mouseX} mouseY={mouseY} stiffness={1200} damping={15} isIdle={isIdle} isBlinking={isBlinking} isScanning={stage === 2} />
            <IndividualEye mouseX={mouseX} mouseY={mouseY} stiffness={800} damping={25} isIdle={isIdle} isBlinking={isBlinking} isScanning={stage === 2} />
          </div>
          <RobotMouth stage={stage} isIdle={isIdle} isScanning={stage === 2} isHoveringProject={!!hoveredProject} hoveredDockIcon={!!hoveredDockIcon} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ZenithBot;