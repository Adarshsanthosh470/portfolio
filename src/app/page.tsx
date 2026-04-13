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
import RatingForm from "@/components/RatingForm/RatingForm";
import Footer from "@/components/Footer/Footer";
import About from "@/components/About/About";
import ZenithBot from "@/components/ZenithBot";
import TransformationalIntro from "@/components/IntroVideo/TransformationalIntro";

// --- MOUSE MOVING TRANSITION (Custom Magnetic Cursor) ---
const GlowingCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Detect if hover over a clickable element to morph cursor
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"], input, textarea, .magnetic-target'));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="hidden md:block">
      {/* Intense Center Core */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#00f2ff] rounded-full mix-blend-screen pointer-events-none z-[99999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />
      {/* Trailing Outer Magnetic Glow */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#00f2ff]/60 bg-[#00f2ff]/10 rounded-full blur-[1px] pointer-events-none z-[99998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? "rgba(0, 242, 255, 0.2)" : "rgba(0, 242, 255, 0.05)"
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
      />
    </div>
  );
};

// --- SCROLLING TRANSITION WRAPPER ---
const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)", scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.4, 0.25, 1] }} // Heavy elastic easing
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// --- MAIN PAGE ---
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
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
    <div className="bg-[#050505] min-h-screen text-white/90 selection:bg-[#00f2ff]/30 selection:text-white cursor-none">
      {/* Activate the Mouse Magnetic Glow globally */}
      <GlowingCursor />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black">
            <p className="text-zinc-500 text-xs uppercase tracking-[0.5em] mb-4">Portfolio Loading</p>
            <h1 className="text-white text-4xl md:text-7xl font-bold mb-12 tracking-tighter">Adarsh Santhosh</h1>
            <div className="w-64 md:w-96 h-[1px] bg-zinc-800 overflow-hidden relative">
              <motion.div className="h-full bg-[#00f2ff] shadow-[0_0_15px_#00f2ff]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3.5, ease: "easeInOut" }} onAnimationComplete={() => setIsLoading(false)} />
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

      {(!isLoading && !isIntroComplete) && (
        <TransformationalIntro onComplete={() => setIsIntroComplete(true)} />
      )}

      {(!isLoading && isIntroComplete) && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full">
          <div id="hero" onClick={() => setIsProjectClicked(true)} className="w-full">
             <ScrollReveal delay={0.2}><Hero /></ScrollReveal>
          </div>
          <div id="about" className="mt-16 w-full">
             <ScrollReveal><About /></ScrollReveal>
          </div>
          <div id="projects" className="mt-16 w-full" onClick={() => setIsProjectClicked(true)}>
             <ScrollReveal><ProjectsGrid onProjectHover={setHoveredProject} /></ScrollReveal>
          </div>
          <div id="skills" className="mt-16 w-full">
             <ScrollReveal><Skills /></ScrollReveal>
          </div>
          <div id="journey" className="mt-16 w-full">
             <ScrollReveal><Timeline /></ScrollReveal>
          </div>
          <div id="education" className="mt-16 w-full" onClick={() => setIsCertificateClicked(true)}>
             <ScrollReveal><TechnicalTraining /></ScrollReveal>
          </div>
          <div id="contact" className="mt-16 w-full mb-16">
             <ScrollReveal><Contact /></ScrollReveal>
          </div>
          <div id="rating" className="mt-28 w-full">
             <ScrollReveal><RatingForm /></ScrollReveal>
          </div>
          <div className="mt-16 pb-28 w-full"><Footer /></div>
          
          <Dock onHoverIcon={setHoveredDockIcon} />
        </motion.main>
      )}
    </div>
  );
}