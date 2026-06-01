import React from 'react';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

interface iPhoneProps {
  position: 'left' | 'right';
  delay?: number;
}

export default function iPhone({ position, delay = 0 }: iPhoneProps) {
  const isLeft = position === 'left';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute ${isLeft ? '-left-32' : '-right-32'} top-1/2 -translate-y-1/2 
        hidden lg:block pointer-events-none`}
    >
      <Tilt
        options={{
          max: 15,
          scale: 1,
          speed: 1000,
          glare: true,
          'max-glare': 0.5,
        }}
      >
        <div className={`relative w-96 h-[600px] ${isLeft ? 'rotate-12' : '-rotate-12'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 
            rounded-[60px] shadow-2xl overflow-hidden border-8 border-gray-800">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-800 
              rounded-b-3xl" />
            <div className="h-full w-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 
              backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80"
                alt="Interface de trading crypto Alyah Knowledge avec graphiques et analyses en temps réel"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 
                to-black" />
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}