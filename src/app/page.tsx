"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, MotionValue } from "framer-motion";

// --- COMPONENTS ---
import Hero from "@/components/Hero/Hero";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";
import Skills from "@/components/Skills/Skills";
import Timeline from "@/components/Journey/Timeline";
import TechnicalTraining from "@/components/Journey/TechnicalTraining";
import Dock from "@/components/Dock/Dock";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import About from "@/components/About/About";
import ZenithBot from "@/components/ZenithBot";

// --- 1. TYPES & INTERFACES ---
interface IndividualEyeProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  stiffness: number;
  damping: number;
}

interface LoadingScreenProps {
  onLoaded: () => void;
}

// --- 2. HYPER-SENSITIVE INDEPENDENT EYE COMPONENT ---
const IndividualEye = ({ mouseX, mouseY, stiffness, damping }: IndividualEyeProps) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });

  const x = useTransform(springX, [-800, 800], [-50, 50]);
  const y = useTransform(springY, [-400, 400], [-35, 35]);
  const scaleSpring = useSpring(1, { stiffness: 250, damping: 20 });

  useEffect(() => {
    const updateScale = () => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const dx = (mouseX.get() + window.innerWidth / 2) - (rect.left + rect.width / 2);
      const dy = (mouseY.get() + window.innerHeight / 2) - (rect.top + rect.height / 2);
      scaleSpring.set(Math.max(0.4, Math.min(1, Math.sqrt(dx * dx + dy * dy) / 250)));
    };
    const unsubX = mouseX.on("change", updateScale);
    const unsubY = mouseY.on("change", updateScale);
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, scaleSpring]);

  return (
    <motion.div
      ref={eyeRef}
      style={{ x, y, scale: scaleSpring }}
      className="w-32 h-24 md:w-64 md:h-48 bg-[#00f2ff] rounded-[3.5rem] 
                 shadow-[0_0_60px_#00f2ff,0_0_120px_rgba(0,242,255,0.4)]
                 border-4 border-cyan-100/20 relative flex items-center justify-center"
    >
      <motion.div 
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 0.2, repeat: Infinity }}
        className="w-1/2 h-1/2 bg-white/30 rounded-full blur-3xl"
      />
    </motion.div>
  );
};

// --- 3. LANDING BIG EYES SECTION ---
const RoboticEyesHero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [introText, setIntroText] = useState("");

  useEffect(() => {
    const t1 = setTimeout(() => setIntroText("Scanning your mouse movements... Nice precision!!!"), 500);
    const t2 = setTimeout(() => setIntroText("Oh, HI!, I will assist you to explore the portfolio! Let me show you what Adarsh has been building... scroll down to explore more!."), 2500);

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMove);
    return () => { window.removeEventListener("mousemove", handleMove); clearTimeout(t1); clearTimeout(t2); };
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      <div className="flex flex-col items-center gap-10">
        <div className="flex gap-10 md:gap-24">
          <IndividualEye mouseX={mouseX} mouseY={mouseY} stiffness={1000} damping={15} />
          <IndividualEye mouseX={mouseX} mouseY={mouseY} stiffness={700} damping={25} />
        </div>
        <svg width="150" height="50" viewBox="0 0 150 50" className="drop-shadow-[0_0_15px_#00f2ff]">
          <motion.path d="M 25 15 Q 75 45 125 15" stroke="#00f2ff" strokeWidth="6" strokeLinecap="round" fill="transparent" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 2.5 }} />
        </svg>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={introText} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center px-10 max-w-4xl mt-16">
          <p className="text-cyan-400 font-mono text-xl md:text-3xl leading-relaxed drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{introText}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- 4. MAIN PAGE ---
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState(0); 
  const [hoveredProject, setHoveredProject] = useState('');
  const [hoveredDockIcon, setHoveredDockIcon] = useState('');
  const [isProjectClicked, setIsProjectClicked] = useState(false);
  const [isCertificateClicked, setIsCertificateClicked] = useState(false);

  useEffect(() => {
    if (!isLoading) document.body.style.overflow = "auto";
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    const sections = [
      { id: 'hero', stage: 2 }, { id: 'about', stage: 3 }, 
      { id: 'projects', stage: 4 }, { id: 'contact', stage: 5 },
      { id: 'skills', stage: 6 }, { id: 'journey', stage: 7 }, 
      { id: 'education', stage: 8 }
    ];
    const observers = sections.map(sec => {
      const el = document.getElementById(sec.id);
      if (!el) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setStage(sec.stage);
        else if (window.scrollY < 400) setStage(0);
      }, { threshold: 0.3 });
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, [isLoading]);

  return (
    <div className="bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black">
            <p className="text-zinc-500 text-xs uppercase tracking-[0.5em] mb-4">Portfolio Loading</p>
            <h1 className="text-white text-4xl md:text-7xl font-bold mb-12 tracking-tighter">Adarsh Santhosh</h1>
            <div className="w-64 md:w-96 h-[1px] bg-zinc-800 overflow-hidden relative">
              <motion.div className="h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3.5, ease: "easeInOut" }} onAnimationComplete={() => setIsLoading(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ZenithBot 
        stage={stage} 
        hoveredProject={hoveredProject} 
        hoveredDockIcon={hoveredDockIcon} 
        isProjectClicked={isProjectClicked} 
        isCertificateClicked={isCertificateClicked} 
      />

      {!isLoading && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full">
          <div id="landing-eyes" className="w-full"><RoboticEyesHero /></div>
          <div id="hero" onClick={() => setIsProjectClicked(true)} className="w-full"><Hero /></div>
          <div id="about" className="mt-16 w-full"><About /></div>
          <div id="projects" className="mt-16 w-full" onClick={() => setIsProjectClicked(true)}><ProjectsGrid onProjectHover={setHoveredProject} /></div>
          <div id="skills" className="mt-16 w-full"><Skills /></div>
          <div id="journey" className="mt-16 w-full"><Timeline /></div>
          <div id="education" className="mt-16 w-full" onClick={() => setIsCertificateClicked(true)}><TechnicalTraining /></div>
          <div id="contact" className="mt-16 w-full"><Contact /></div>
          <div className="mt-16 pb-28 w-full"><Footer /></div>
          <Dock onHoverIcon={setHoveredDockIcon} />
        </motion.main>
      )}
    </div>
  );
}