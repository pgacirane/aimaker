import React from 'react';
import { Zap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

function Hero({ id }) {
  // Provided Text Content
  const heroData = {
    tagline: "Communication in Excellence, Unlock African Markets with Regulatory Confidence",
    intro: "Expanding into Africa markets requires navigating complex regulatory environments and local compliance requirements. Qomexis Ltd simplify this process by providing end-to-end regulatory support and in-country representation."
  };

  // Grid/Circuit dynamic particles for high-tech effect
  const particles = Array.from({ length: 40 });

  return (
    <section id={id} className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Futuristic Background */}
      <div className="absolute inset-0 z-0 bg-futuristic-grid opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background"></div>
      </div>
      
      {/* Dynamic light particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 w-0.5 rounded-full bg-primary"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight, 
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, Math.random() * 0.7, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 5, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{
            boxShadow: `0 0 10px 1px rgba(6, 182, 212, ${Math.random() * 0.5 + 0.2})`
          }}
        />
      ))}

      {/* Subtle glowing circuit lines - purely cosmetic generated in code */}
      <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 0 30 Q 30 10 50 40 T 100 20" fill="none" stroke="#06b6d4" strokeWidth="0.1"/>
        <path d="M 100 70 Q 70 90 50 60 T 0 80" fill="none" stroke="#06b6d4" strokeWidth="0.1"/>
      </svg>

      <div className="container relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Company Name and Glowing Border */}
        <div className="inline-block relative mb-8 rounded-full border border-primary/20 bg-panel/30 px-6 py-2">
            <span className="font-heading text-lg font-bold text-white">Qomexis <span className="text-primaryAccent">Ltd</span></span>
            <div className="absolute -inset-1 rounded-full bg-primary/10 blur-sm"></div>
        </div>
        
        {/* Animated Headline/Tagline */}
        <motion.h1 
          className="mb-10 font-heading text-4xl font-bold leading-tight md:text-6xl text-gradient"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroData.tagline}
        </motion.h1>

        {/* Intro Text */}
        <motion.div 
          className="mx-auto max-w-3xl rounded-xl border border-primary/10 bg-panel/30 p-8 shadow-2xl backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-lg leading-relaxed text-textDim">{heroData.intro}</p>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;