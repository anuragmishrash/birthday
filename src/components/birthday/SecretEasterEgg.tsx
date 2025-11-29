import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SecretEasterEgg = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    setShowMessage(true);
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (showMessage) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [showMessage]);

  return (
    <>
      <motion.div
        className="fixed bottom-8 right-8 cursor-pointer z-50"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onClick={handleClick}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          className="text-4xl drop-shadow-lg"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          💝
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              className="glass-card max-w-lg p-8 text-center relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sparkle burst effect */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      background: `hsl(${Math.random() * 360}, 100%, 60%)`,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                ))}
              </div>

              <motion.div
                className="text-6xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                🎉
              </motion.div>

              <h3 className="text-3xl font-display font-bold mb-4 text-gradient">
                You Found It! 🎊
              </h3>

              <motion.p
                className="text-xl font-handwriting text-foreground leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p>
  Ab kya chahiye <br />
  Ab tumhari baari hai party dene ki, to chup chap party de dena
</p>
              </motion.p>

              <motion.p
                className="text-lg text-muted-foreground mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                
              </motion.p>

              <motion.button
                className="magic-button"
                onClick={() => setShowMessage(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close 💖
              </motion.button>

              {/* Floating hearts */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  💖
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SecretEasterEgg;
