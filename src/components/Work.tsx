'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Work = () => {
  const projects = [
    {
      title: 'Modern E-commerce',
      description: 'A sleek, responsive online store with seamless payment processing.',
      category: 'E-commerce',
      imagePath: '/images/placeholder-1.jpg',
    },
    {
      title: 'Business Portfolio',
      description: 'A professional company website that showcases services and builds credibility.',
      category: 'Business',
      imagePath: '/images/placeholder-2.jpg',
    },
    {
      title: 'Personal Blog',
      description: 'A minimalist blog design for sharing content with a growing audience.',
      category: 'Personal',
      imagePath: '/images/placeholder-3.jpg',
    },
  ];

  return (
    <section id="work" className="section bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Take a look at some examples of websites we've created.
            Each project is crafted with attention to detail and tailored to meet our clients' specific needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-xl bg-primary/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10" />
                <div className="w-full h-full bg-gradient-to-r from-secondary/30 to-accent/30 flex items-center justify-center text-white text-4xl font-bold">
                  {project.title.split(' ')[0]}
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs text-accent uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="#contact" className="btn btn-primary">
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Work; 