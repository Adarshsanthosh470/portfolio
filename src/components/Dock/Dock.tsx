"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Home, Briefcase, GitMerge, Mail } from "lucide-react";
import { useRef } from "react";

// --- 1. DEFINE TYPES --- 
interface DockProps {
  onHoverIcon?: (name: string) => void;
}

interface DockIconProps {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement>;
  action?: string;
  target?: string;
  name: string; // Added to identify the icon
  onHover?: (name: string) => void; // Callback for ZenithBot
}

const icons = [
  { name: "Home", icon: <Home />, action: "scroll", target: "#hero" },
  { name: "Projects", icon: <Briefcase />, action: "scroll", target: "#projects" },
  { name: "Education", icon: <GitMerge />, action: "scroll", target: "#education" },
  { name: "Contact", icon: <Mail />, action: "scroll", target: "#contact" },
];

const Dock = ({ onHoverIcon }: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        onHoverIcon?.(""); // Clear ZenithBot dialogue when mouse leaves the dock
      }}
      className="w-full md:w-auto md:fixed bottom-4 left-1/2 md:-translate-x-1/2 flex h-16 items-center justify-center md:gap-4 rounded-none md:rounded-2xl bg-neutral-800/70 md:backdrop-blur-md px-4 z-[100]"
    >
      {icons.map((item, index) => (
        <DockIcon 
          key={index} 
          name={item.name}
          mouseX={mouseX} 
          containerRef={containerRef} 
          action={item.action} 
          target={item.target}
          onHover={onHoverIcon}
        >
          {item.icon}
        </DockIcon>
      ))}
    </div>
  );
};

const DockIcon = ({ children, mouseX, containerRef, action, target, name, onHover }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = () => {
    if (action === "scroll" && target) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={handleClick}
      onMouseEnter={() => onHover?.(name)} // Trigger ZenithBot dialogue
      className="aspect-square flex items-center justify-center rounded-full bg-neutral-700 text-white cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default Dock;