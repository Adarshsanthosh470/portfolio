"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const technicalTrainingData = [
  {
    date: "June 2025",
    title: "Retechnox Technologies | Flutter Development",
    description: "Completed intensive project-based training focused on mobile development workflows and UI design principles.",
    certificate: "/INTERNSHIP.png",
  },
  {
    date: "July 2025",
    title: "IIIT Kottayam | IOT & Blockchain Technologies",
    description: "Advanced training in Internet of Things and blockchain technology implementation.",
    certificate: "/iot & block chain.jpeg",
  },
  {
    date: "August 2024",
    title: "IIIT Kottayam | Digital Forensics and Security",
    description: "Engaged in specialized training focused on cyber forensics and advanced security testing methodologies.",
    certificate: "/iiit kottaya.pdf",
  },
  {
    date: "November 2023",
    title: "SRAI Smart Solutions Pvt. Ltd. | AI & Robotics",
    description: "Explored the fundamentals of AI integration and introductory robotics systems.",
    certificate: "/ADARSH AIROB.pdf",
  },
];



const TechnicalTraining = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  return (
    <div className="py-24 px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Technical Training</h2>
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-2 md:left-1/2 -translate-x-1/2 w-1 bg-neutral-700 h-full"></div>
        {technicalTrainingData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="mb-8 flex md:justify-between items-start w-full"
          >
            <div className="hidden md:block w-1/2"></div>
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-neutral-800"></div>
            <div className="w-full md:w-1/2 md:pl-8 md:text-left">
              <div className="md:hidden absolute w-4 h-4 bg-blue-500 rounded-full border-4 border-neutral-800" style={{ left: '0.1rem' }}></div>
              <div className="ml-10 md:ml-0">
                <p className="text-sm text-neutral-400">{item.date}</p>
                <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                <p className="text-neutral-300 text-sm mt-2">{item.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-blue-400 text-xs mt-2 font-semibold hover:text-blue-300 transition-colors"
                  onClick={() => setSelectedCertificate(item.certificate)}
                >
                  View Certificate
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedCertificate(null)}
        >
          <div className="relative bg-neutral-800 p-4 rounded-lg max-w-3xl w-full">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={selectedCertificate} alt="Certificate" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TechnicalTraining;