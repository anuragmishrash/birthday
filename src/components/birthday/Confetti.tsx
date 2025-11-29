import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Confetti = () => {
  const confettiColors = ['#FFD700', '#FF69B4', '#87CEEB', '#DDA0DD', '#FFB6C1'];
  const confettiCount = 50;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: confettiCount }).map((_, index) => {
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 3;
        const randomDuration = 3 + Math.random() * 2;
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        return (
          <motion.div
            key={index}
            className="absolute w-3 h-3 opacity-70"
            style={{
              left: `${randomX}%`,
              top: '-10%',
              backgroundColor: randomColor,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{
              y: window.innerHeight + 100,
              rotate: 360,
              opacity: 0,
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: 'linear',
              repeat: Infinity,
            }}
          />
        );
      })}
    </div>
  );
};

export default Confetti;
