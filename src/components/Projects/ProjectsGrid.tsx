"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ProjectModal from "./ProjectModal";
import { projects } from "./projects";

const ProjectsGrid = ({ onProjectHover }) => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <div className="py-24 px-4 bg-neutral-900" id="projects">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-white">
          <span className="text-blue-400">🚀</span> My Projects
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-[1px] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => onProjectHover(project.title)}
                onMouseLeave={() => onProjectHover('')}
              >
                {/* Hover Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative bg-neutral-800 rounded-xl p-6 border border-white/5 group-hover:border-transparent transition-colors h-full flex flex-col">
                  {project.mediaUrl && (
                    <img
                      src={project.mediaUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{project.title}</h3>
                  <p className="text-neutral-300 text-sm flex-grow">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default ProjectsGrid;
