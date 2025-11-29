import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { emoji: '💖', size: 'text-4xl', delay: 0 },
    { emoji: '✨', size: 'text-3xl', delay: 0.5 },
    { emoji: '🌟', size: 'text-5xl', delay: 1 },
    { emoji: '💝', size: 'text-4xl', delay: 1.5 },
    { emoji: '🎀', size: 'text-3xl', delay: 2 },
    { emoji: '🦋', size: 'text-4xl', delay: 2.5 },
    { emoji: '🌺', size: 'text-3xl', delay: 3 },
    { emoji: '⭐', size: 'text-4xl', delay: 3.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size}`}
          style={{
            left: `${(index * 12 + 5) % 90}%`,
            top: `${(index * 15 + 10) % 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + index,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {element.emoji}
        </motion.div>
      ))}

      {/* Sparkle particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`sparkle-${index}`}
          className="absolute w-1 h-1 bg-gold rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
