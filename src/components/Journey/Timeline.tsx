"use client";

import { motion } from "framer-motion";

const timelineData = [
  {
    date: "2022 - 2026",
    title: "B.Tech in Computer Science Engineering",
    institution: "VISAT Engineering College, Ernakulam | KTU University",
  },
  {
    date: "2022",
    title: "Higher Secondary in Computer Science",
    institution: "NSS HSS Karukachal, Kottayam",
  },
  {
    date: "2020",
    title: "Matriculation (10th)",
    institution: "SVRV NSS HSS Vazhoor, Kottayam",
  },
];

const Timeline = () => {
  return (
    <div className="py-24 px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Education</h2>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-2 md:left-1/2 -translate-x-1/2 w-1 bg-neutral-700 h-full"></div>
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-8 flex md:justify-between items-start w-full"
          >
            <div className="md:w-1/2 md:pr-8 md:text-right">
              <div className="md:hidden absolute w-4 h-4 bg-blue-500 rounded-full border-4 border-neutral-800" style={{left: '0.1rem'}}></div>
              <div className="ml-10 md:ml-0">
                <p className="text-sm text-neutral-400">{item.date}</p>
                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                <p className="text-neutral-300">{item.institution}</p>
              </div>
            </div>
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-neutral-800"></div>
            <div className="hidden md:block w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;