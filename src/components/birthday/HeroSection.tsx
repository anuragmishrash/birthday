import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Confetti from './Confetti';

interface HeroSectionProps {
  onSurprise: () => void;
}

const HeroSection = ({ onSurprise }: HeroSectionProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'Shreyashi Pandey';
  
  useEffect(() => {
    setShowConfetti(true);
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 150);
    
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {showConfetti && <Confetti />}
      
      <motion.div
        className="text-center z-10 space-y-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-display font-bold gold-glow mb-4"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-shift 3s ease infinite',
          }}
        >
          Happy Birthday,
        </motion.h1>
        
        <motion.h2
          className="text-5xl md:text-7xl font-display font-bold text-primary min-h-[4rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {text}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </motion.h2>

        {/* Floating decorative elements */}
        <motion.div
          className="relative h-32 flex items-center justify-center gap-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {['✨', '💖', '🌟', '💝', '✨'].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-5xl"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <motion.button
          className="magic-button text-xl mt-8 relative"
          onClick={onSurprise}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 opacity-0"
            whileHover={{ opacity: 0.3 }}
          />
          Tap for a Magical Surprise ✨
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
