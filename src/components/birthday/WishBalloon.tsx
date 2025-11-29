import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const WishBalloon = () => {
  const [released, setReleased] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -500], [1, 0]);

  const handleDragEnd = () => {
    setReleased(true);
  };

  return (
    <section className="py-20 px-4 relative min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 md:mb-8 text-gradient px-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Send Your Wish! 🎈
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="hidden sm:inline">Drag the balloon and release it to send your wishes to the sky!</span>
          <span className="sm:hidden">Tap and drag the balloon upward!</span>
        </motion.p>

        <div className="relative h-96">
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
            animate={
              released
                ? {
                    y: -1000,
                    opacity: 0,
                    transition: {
                      duration: 3,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                  }
                : {}
            }
            style={{ y, opacity }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative inline-block">
              {/* Balloon */}
              <svg
                width="120"
                height="150"
                viewBox="0 0 150 180"
                className="drop-shadow-2xl sm:w-[150px] sm:h-[180px]"
              >
                <defs>
                  <linearGradient id="balloonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF69B4" />
                    <stop offset="50%" stopColor="#FFB6C1" />
                    <stop offset="100%" stopColor="#FFC0CB" />
                  </linearGradient>
                </defs>
                
                {/* Balloon shape */}
                <ellipse
                  cx="75"
                  cy="70"
                  rx="60"
                  ry="70"
                  fill="url(#balloonGradient)"
                  stroke="#FF1493"
                  strokeWidth="2"
                />
                
                {/* Balloon knot */}
                <path
                  d="M 75 140 Q 75 145 70 150"
                  stroke="#FF1493"
                  strokeWidth="2"
                  fill="none"
                />
                
                {/* String */}
                <motion.path
                  d="M 70 150 Q 65 170 75 200 Q 85 230 75 260"
                  stroke="#888"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{
                    d: [
                      'M 70 150 Q 65 170 75 200 Q 85 230 75 260',
                      'M 70 150 Q 75 170 65 200 Q 55 230 65 260',
                      'M 70 150 Q 65 170 75 200 Q 85 230 75 260',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </svg>

              {/* Shreyashi's name on balloon */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="font-handwriting text-2xl text-white font-bold text-center whitespace-nowrap">
                  Shreyashi
                </p>
              </div>

              {/* Sparkles around balloon */}
              {!released && (
                <>
                  <motion.div
                    className="absolute top-0 left-0 text-2xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    className="absolute top-10 right-0 text-2xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                  >
                    ✨
                  </motion.div>
                  <motion.div
                    className="absolute bottom-20 left-2 text-2xl"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1,
                    }}
                  >
                    ✨
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>

          {/* Sparkle trail when released */}
          {released && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 text-2xl"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    y: -1000,
                    x: (Math.random() - 0.5) * 100,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {released && (
          <motion.p
            className="text-xl sm:text-2xl font-handwriting text-primary mt-6 md:mt-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Your wishes are flying high! 🌟
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default WishBalloon;
