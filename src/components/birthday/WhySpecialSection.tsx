import { motion } from 'framer-motion';

const reasons = [
  {
    id: 1,
    emoji: '🌟',
    title: 'Your Amazing Smile',
    description: 'Your smile lights up every room and makes everyone around you happy.',
  },
  {
    id: 2,
    emoji: '💝',
    title: 'Your Kind Heart',
    description: 'You always know how to make others feel special and loved.',
  },
  {
    id: 3,
    emoji: '✨',
    title: 'Your Positive Energy',
    description: 'Your enthusiasm and positivity are truly contagious and inspiring.',
  },
  {
    id: 4,
    emoji: '🎨',
    title: 'Your Creativity',
    description: 'Your unique perspective and creative spirit make the world brighter.',
  },
  {
    id: 5,
    emoji: '🌺',
    title: 'Your Beautiful Soul',
    description: 'You are genuine, caring, and one of the most wonderful people I know.',
  },
  {
    id: 6,
    emoji: '🦋',
    title: 'Your Strength',
    description: 'You face every challenge with grace and courage that amazes me.',
  },
];

const WhySpecialSection = () => {
  return (
    <section className="py-20 px-4 relative">
      <motion.h2
        className="text-5xl md:text-6xl font-display font-bold text-center mb-16 text-gradient"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Why You're So Special 💖
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.id}
            className="glass-card group relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
          >
            {/* Heartbeat glow on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative z-10">
              <motion.div
                className="text-6xl mb-4 text-center"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {reason.emoji}
              </motion.div>

              <h3 className="text-2xl font-display font-semibold text-center mb-3 text-foreground">
                {reason.title}
              </h3>

              <p className="text-center text-muted-foreground">
                {reason.description}
              </p>
            </div>

            {/* Sparkle effect */}
            <motion.div
              className="absolute top-4 right-4 text-2xl"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhySpecialSection;
