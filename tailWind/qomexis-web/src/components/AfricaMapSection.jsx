import React from 'react';
import { Network, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

function AfricaMapSection({ id }) {
  // Provided Content evoking Africa and ICT/IoT
  const africaMapText = {
    title: "Connecting Africa, Simplifying Compliance",
    description: "Built on regional insight and local expertise, we provide the regulatory interface and scalable solutions essential for entering complex African markets."
  };

  // We are creating a wrapper around the provided PNG map asset to guarantee the aspect ratio.
  return (
    <section id={id} className="bg-panel px-6 py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-16 md:flex-row">
          
          {/* Map Image and Constraints */}
          <div className="relative flex w-full flex-col items-center justify-center md:w-1/2">
            {/* The provided map asset (filename image_0.png) is interconnected african cities */}
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl border-2 border-primary/30 p-2 shadow-2xl shadow-primary/10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{
                // Guarantee the aspect ratio to prevent distortion. We will rely on aspect-ratio: contain in CSS
                aspectRatio: '16/10' // This matches the 16:10 format of the provided input image.
              }}
            >
              {/* Asset required in /public/assets/africa-map.png */}
              <img 
                src="/assets/africa-map.png" // This matches filename image_0.png
                alt="Map of Africa showing interconnected African cities (ICT, IoT, Telecom networks)" 
                className="h-full w-full rounded-xl object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-panel opacity-50"></div>
            </motion.div>
            
            {/* Visual indicators highlighting regions and connection */}
            <div className="absolute top-2 left-2 flex items-center gap-2 rounded-full bg-background/80 px-4 py-1.5 border border-primaryAccent text-xs text-primary font-medium backdrop-blur-sm">
                <Network className="h-3.5 w-3.5" /> Interconnected Africa
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-background/80 px-4 py-1.5 border border-primaryAccent text-xs text-primaryAccent font-medium backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5" /> Market Access
            </div>
          </div>

          {/* Text and Icon Elements */}
          <div className="w-full space-y-8 md:w-1/2">
            <h2 className="text- gradient text-4xl leading-tight font-bold">{africaMapText.title}</h2>
            
            <motion.div 
              className="glow-card flex items-start gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <Network className="mt-1 h-12 w-12 text-primary flex-shrink-0" strokeWidth={1} />
              <p className="text-lg leading-relaxed text-textDim">{africaMapText.description}</p>
            </motion.div>
            
            {/* Visual icons of technology */}
            <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-background/40 p-4 rounded-lg border border-primary/20 text-center font-medium text-textMain">Telecom Infrastructure</div>
                <div className="bg-background/40 p-4 rounded-lg border border-primary/20 text-center font-medium text-textMain">IoT & Smart Devices</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AfricaMapSection;