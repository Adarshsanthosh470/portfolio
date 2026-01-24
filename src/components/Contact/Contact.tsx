"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

const contactDetails = [
  {
    title: "Contact Information",
    contacts: [
      { name: "Email", value: "adarshsanthosh470@gmail.com", icon: <Mail />, link: "mailto:adarshsanthosh470@gmail.com" },
      { name: "Phone", value: "+919744054978", icon: <Phone />, link: "tel:+919744054978" },
      { name: "LinkedIn", value: "adarshsanthoshonline", icon: <Linkedin />, link: "https://www.linkedin.com/in/adarshsanthoshonline/" },
      { name: "GitHub", value: "Adarshsanthosh470", icon: <Github />, link: "https://github.com/Adarshsanthosh470" },
    ],
  },
];

const Contact = () => {
  return (
    <div className="py-24 px-4 bg-neutral-900" id="contact">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-white">
        <Mail className="w-10 h-10 text-blue-400" /> Contact Me
      </h2>
      <div className="max-w-6xl mx-auto">
        {contactDetails.map((category, catIndex) => (
          <div key={catIndex} className="mb-16">
            <h3 className="text-2xl font-bold text-blue-400 mb-8 px-2">
              {category.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {category.contacts.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.link}
                  target={contact.link.startsWith('http') ? "_blank" : undefined}
                  rel={contact.link.startsWith('http') ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative p-[1px] rounded-xl overflow-hidden block"
                >
                  {/* Hover Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative bg-neutral-800 rounded-xl p-4 h-full flex flex-col items-center justify-center border border-white/5 group-hover:border-transparent transition-colors">
                    <div className="text-blue-400 mb-2">
                      {contact.icon}
                    </div>
                    <p className="text-center text-sm font-medium text-neutral-300 group-hover:text-white transition-colors mb-1">
                      {contact.name}
                    </p>
                    <p className="text-center text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
