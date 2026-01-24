"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const skillCategories = [
  {
    title: "Development", // Added missing title
    skills: [
      "Kotlin", 
      "Jetpack Compose", 
      "Flutter", 
      "Dart", 
      "React Native",
      "HTML", 
      "CSS", 
      "JavaScript", 
      "Java",
      "TypeScript", // Corrected casing
      "Supabase",   // Consistent casing
      "Firebase"
    ],
  }, // Added missing comma
  {
    title: "Tools",
    skills: [
      "Cursor", 
       
      "Bolt", 
      "GitHub",
      "AI-assisted development tools", 
      
      "Android Studio",
      "VS Code",
      "Google Colab"
    ],
  },
];

const Skills = () => {
  return (
    <div className="py-24 px-4 bg-neutral-900" id="skills">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-white">
        <Zap className="w-10 h-10 text-yellow-400 fill-yellow-400" /> My Technical Skills
      </h2>
      <div className="max-w-6xl mx-auto">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-16">
            <h3 className="text-2xl font-bold text-blue-400 mb-8 px-2">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative p-[1px] rounded-xl overflow-hidden"
                >
                  {/* Hover Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative bg-neutral-800 rounded-xl p-4 h-full flex items-center justify-center border border-white/5 group-hover:border-transparent transition-colors">
                    <p className="text-center text-sm md:text-base font-medium text-neutral-300 group-hover:text-white transition-colors">
                      {skill}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;