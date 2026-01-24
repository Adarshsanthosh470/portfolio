"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Briefcase, GitMerge, Mail } from "lucide-react";
import { useRef } from "react";

const icons = [
  { name: "Home", icon: <Home />, action: "scroll", target: "#about" },
  { name: "Projects", icon: <Briefcase />, action: "scroll", target: "#projects" },
  { name: "Journey", icon: <GitMerge />, action: "scroll", target: "#journey" },
  { name: "Contact", icon: <Mail />, action: "scroll", target: "#contact" },
  
];

const Dock = () => {
  const mouseX = useMotionValue(Infinity);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="w-full md:w-auto md:fixed bottom-4 left-1/2 md:-translate-x-1/2 flex h-16 items-center justify-center md:gap-4 rounded-none md:rounded-2xl bg-neutral-800/70 md:backdrop-blur-md px-4"
    >
      {icons.map((item, index) => (
        <DockIcon key={index} mouseX={mouseX} containerRef={containerRef} action={item.action} target={item.target}>
          {item.icon}
        </DockIcon>
      ))}
    </div>
  );
};

const DockIcon = ({ children, mouseX, containerRef, action, target }: { children: React.ReactNode, mouseX: any, containerRef: React.RefObject<HTMLDivElement>, action?: string, target?: string }) => {
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
      className="aspect-square w-10 flex items-center justify-center rounded-full bg-neutral-700 text-white cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default Dock;