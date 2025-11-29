import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  autoPlay?: boolean;
}

const MusicPlayer = ({ autoPlay = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      // Cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Auto-play when autoPlay prop becomes true
  useEffect(() => {
    if (autoPlay && audioRef.current && !isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log('Audio autoplay failed:', error);
      });
      setIsPlaying(true);
    }
  }, [autoPlay]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log('Audio playback failed:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <motion.button
        className="glass-card p-4 rounded-full relative overflow-hidden group"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
          animate={{
            rotate: isPlaying ? 360 : 0,
          }}
          transition={{
            duration: 3,
            repeat: isPlaying ? Infinity : 0,
            ease: 'linear',
          }}
        />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Volume2 className="w-6 h-6 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VolumeX className="w-6 h-6 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pulse effect when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Music note animations */}
        {isPlaying && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute text-xl"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  y: [-40, -80],
                  x: [(i - 1) * 20, (i - 1) * 30],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              >
                🎵
              </motion.span>
            ))}
          </>
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ delay: 3 }}
          >
            <div className="glass-card px-4 py-2 text-sm text-foreground">
              Click for music 🎵
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MusicPlayer;
