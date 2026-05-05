import React from 'react';
import { motion } from 'framer-motion';

function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`px-6 py-24 ${className}`}>
      <div className="container mx-auto max-w-7xl">
        {title && (
          <motion.h2 
            className="mb-16 text-center font-heading text-5xl font-bold leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-150px' }}
          >
            {title}
            <div className="mx-auto h-1 w-20 rounded-full bg-primary mt-4"></div>
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;