"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

interface ZenithBotProps {
  stage: number;
  hoveredProject?: string;
  isProjectClicked?: boolean;
  isCertificateClicked?: boolean;
  hoveredDockIcon?: string;
}

// ---------------- DYNAMIC MOUTH (Cute, Proud, Excited) ----------------
const CuteMouth = ({ stage, isIdle, inspecting, isTickled }: { stage: number; isIdle: boolean, inspecting: boolean, isTickled: boolean }) => {
  const getMouthPath = () => {
    if (isTickled) return "M 8 8 Q 20 24 32 8"; // Extra wide happy smile when tickled
    if (isIdle) return "M 10 10 L 30 10"; // Standby line
    if (inspecting) return "M 15 10 A 5 5 0 1 1 25 10 A 5 5 0 1 1 15 10"; // O-mouth
    
    switch (stage) {
      case 2: return "M 15 10 A 5 5 0 1 1 25 10 A 5 5 0 1 1 15 10"; 
      case 3: return "M 12 12 Q 20 16 28 12"; // CUTE: Gentle curve
      case 4: 
      case 6: return "M 10 12 Q 20 18 30 12"; // PROUD: Deep confident curve
      case 7: 
      case 8: 
      case 5: return "M 8 10 Q 20 22 32 10"; // EXCITED: Wide joyful curve
      default: return "M 12 12 Q 20 16 28 12"; 
    }
  };

  return (
    <svg width="40" height="20" viewBox="0 0 40 20" className="drop-shadow-[0_0_5px_#00f2ff]">
      <motion.path
        d={getMouthPath()}
        stroke="#00f2ff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="transparent"
        animate={{ d: getMouthPath() }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </svg>
  );
};

// ---------------- MAIN BOT ----------------
const ZenithBot = ({ stage, hoveredProject, isProjectClicked, isCertificateClicked, hoveredDockIcon }: ZenithBotProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [lastMove, setLastMove] = useState(Date.now());
  const [isIdle, setIsIdle] = useState(false);
  const [inspecting, setInspecting] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showInteractionBadge, setShowInteractionBadge] = useState(false);
  const [isTickled, setIsTickled] = useState(false);

  // Smooth Eye Springs
  const eyeX = useSpring(useTransform(mouseX, [-800, 800], [-6, 6]), { stiffness: 1000, damping: 30 });
  const eyeY = useSpring(useTransform(mouseY, [-400, 400], [-4, 4]), { stiffness: 1000, damping: 30 });

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

  // Handle Inspection/Verification Logic
  useEffect(() => {
    if (stage === 7 || stage === 8) {
      setVerified(false);
      setInspecting(true);
      const timer = setTimeout(() => { setInspecting(false); setVerified(true); }, 2000);
      return () => clearTimeout(timer);
    } else {
      setInspecting(false);
      setVerified(false);
    }
  }, [stage]);

  useEffect(() => {
    if (isProjectClicked || isCertificateClicked) {
      setShowInteractionBadge(true);
      const timer = setTimeout(() => setShowInteractionBadge(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isProjectClicked, isCertificateClicked]);

  // Handle Robot Tickle Interaction
  const handleRobotClick = () => {
    setIsTickled(true);
    
    // Play sound effects using Web Audio API
    playTickleSound();
    playLaughSound();
    
    // Reset after 3 seconds
    const timer = setTimeout(() => {
      setIsTickled(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  };

  // Create and play "don't tickle me" sound using Web Audio API
  const playTickleSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Create oscillator for a fun voice-like sound
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    // Simulate speech pattern with frequency changes
    gain.gain.setValueAtTime(0.3, now);
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.setValueAtTime(450, now + 0.1);
    osc.frequency.setValueAtTime(380, now + 0.2);
    osc.frequency.setValueAtTime(420, now + 0.3);
    gain.gain.setValueAtTime(0, now + 0.5);
    
    osc.start(now);
    osc.stop(now + 0.5);
  };

  // Create and play laugh sound using Web Audio API
  const playLaughSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Create multiple oscillators for a fun laughing sound
    for (let i = 0; i < 3; i++) {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      const startTime = now + i * 0.35;
      gain.gain.setValueAtTime(0.2, startTime);
      osc.frequency.setValueAtTime(300 + i * 100, startTime);
      osc.frequency.setValueAtTime(400 + i * 100, startTime + 0.2);
      gain.gain.setValueAtTime(0, startTime + 0.3);
      
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    }
  };

  const getDialogue = () => {
    if (isTickled) return "Don't tickle me! 😂";
    if (hoveredDockIcon) return `GOTO: ${hoveredDockIcon.toUpperCase()}!`;
    if (isIdle) return "Zzz... counting code-sheep...";
    if (inspecting) return "Inspecting Credentials... 🔍";
    if (verified || showInteractionBadge) return "Verified! 100% Legit! ✅";
    
    switch (stage) {
      case 2: return "Scanning Portfolio... 🤖";
      case 3: return "Software Engineer Grad (2026)! ✨";
      case 4: return hoveredProject ? `Ooh! ${hoveredProject} looks cool!` : "Look at these amazing builds!";
      case 5: return "Hire Adarsh? Let's chat! 💌";
      case 6: return "Wow! Look at all these skills!";
      default: return "Hii! I'm Zenith!";
    }
  };

  if (stage === 0) return null;

  const isInContact = stage === 5 || stage === 8;
  const showBadge = (verified || showInteractionBadge) && !inspecting;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed z-[60] bottom-10 right-10 pointer-events-auto flex flex-col items-center gap-2"
      >
        {/* Dialogue Bubble */}
        <motion.div className="relative">
            <motion.div className="bg-white border-2 border-cyan-400 text-zinc-800 px-4 py-2 rounded-2xl rounded-br-none text-[11px] font-bold shadow-xl mb-1 min-w-[140px] text-center">
            {getDialogue()}
            </motion.div>
            {showBadge && (
                <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -right-4 -top-2 text-cyan-500 bg-white rounded-full p-0.5 shadow-lg border border-cyan-100"
                >
                    <CheckCircle2 size={22} fill="currentColor" className="text-white" />
                    <div className="absolute inset-0 text-cyan-500"><CheckCircle2 size={22} /></div>
                </motion.div>
            )}
        </motion.div>

        {/* CUTE ROBOT BODY */}
        <motion.div
          animate={{ 
            y: isTickled ? [0, -5, 0, -5, 0] : isIdle ? [0, -5, 0] : [0, -12, 0],
            x: isTickled ? [0, -3, 3, -3, 0] : 0 // Shake when tickled
          }}
          transition={{ 
            duration: isTickled ? 0.5 : 3, 
            repeat: isTickled ? Infinity : Infinity, 
            ease: "easeInOut" 
          }}
          className="relative cursor-pointer hover:scale-105 transition-transform"
          onClick={handleRobotClick}
        >
          {/* EXCITEMENT GLITTER (Intensified for Contact Section) */}
          {(isInContact || verified) && (
            <div className="absolute -inset-16 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 0], 
                    opacity: [0, 1, 0], 
                    x: (Math.random() - 0.5) * 100, 
                    y: (Math.random() - 0.8) * 80,
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
                  <Sparkles size={Math.random() * 10 + 10} fill="currentColor" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Capsule Body */}
          <div className="w-20 h-24 md:w-24 md:h-28 bg-white rounded-[3rem] shadow-2xl border-2 border-zinc-100 flex flex-col items-center pt-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-zinc-50 to-transparent opacity-80" />

            {/* Face Screen */}
            <div className="relative z-10 w-[82%] h-[42%] bg-zinc-900 rounded-2xl flex flex-col items-center justify-center">
                <div className="flex gap-4 mb-1">
                {/* DOUBLE BLINK SYSTEM: Continuous rapid blink when tickled */}
                <motion.div 
                  style={{ x: eyeX, y: eyeY }} 
                  animate={{ scaleY: isTickled ? [1, 0.1, 1, 0.1, 1, 0.1, 1] : [1, 1, 0.1, 1, 0.1, 1, 1] }}
                  transition={{ 
                    duration: isTickled ? 0.6 : 2.5,
                    repeat: isTickled ? Infinity : Infinity,
                    times: isTickled ? [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] : [0, 0.7, 0.75, 0.8, 0.85, 0.9, 1]
                  }}
                  className="w-4 h-6 bg-cyan-400 rounded-full shadow-[0_0_12px_#00f2ff]" 
                />
                <motion.div 
                  style={{ x: eyeX, y: eyeY }} 
                  animate={{ scaleY: isTickled ? [1, 0.1, 1, 0.1, 1, 0.1, 1] : [1, 1, 0.1, 1, 0.1, 1, 1] }}
                  transition={{ 
                    duration: isTickled ? 0.6 : 2.5,
                    repeat: isTickled ? Infinity : Infinity,
                    times: isTickled ? [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] : [0, 0.7, 0.75, 0.8, 0.85, 0.9, 1]
                  }}
                  className="w-4 h-6 bg-cyan-400 rounded-full shadow-[0_0_12px_#00f2ff]" 
                />
                </div>
                <CuteMouth stage={stage} isIdle={isIdle} inspecting={inspecting} isTickled={isTickled} />
            </div>

            {/* Power Meter */}
            <div className="mt-4 w-8 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
               <motion.div 
                animate={{ x: ["-100%", "100%"] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-cyan-400 shadow-[0_0_8px_#00f2ff]" 
               />
            </div>
          </div>

          <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -left-3 top-12 w-3 h-8 bg-zinc-100 rounded-full border border-zinc-200 shadow-sm" />
          <motion.div animate={{ rotate: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -right-3 top-12 w-3 h-8 bg-zinc-100 rounded-full border border-zinc-200 shadow-sm" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ZenithBot;