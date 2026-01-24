"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    longDescription?: string;
    techStack?: string[];
    repo?: string;
    demo?: string;
    demoText?: string;
    mediaUrl?: string;
  };
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    /* FIX: Changed the outer 'div' to 'motion.div' to support the animation props */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-neutral-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start sticky top-0 bg-neutral-800 pb-4 mb-4">
          <h2 className="text-3xl font-bold">{project.title}</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-white flex-shrink-0 ml-4">
            <X />
          </button>
        </div>
        
        {project.mediaUrl && (
          <img src={project.mediaUrl} alt={project.title} className="rounded-lg w-full h-auto mb-4" />
        )}
        
        <p className="text-neutral-300 mb-4 whitespace-pre-wrap">
          {project.longDescription || project.description}
        </p>
        
        {project.techStack && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, index) => (
              <span key={index} className="bg-neutral-700 text-sm px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex gap-4 sticky bottom-0 bg-neutral-800 pt-4">
          {project.repo && project.repo !== "#" && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Code
            </a>
          )}
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {project.demoText || "Live Demo"}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;