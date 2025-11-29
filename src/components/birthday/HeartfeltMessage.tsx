import { motion } from 'framer-motion';

const heartfeltText = [
  'Dear Pandey Ji,',
  '',
  'On this special day, I want you to know how incredibly grateful I am to have you in my life.',
  'You are not just my best friend, you are my partner in crime, and my constant source of joy.',
  '',
  'Thank you for every laugh, every adventure, every moment we\'ve shared.',
  'Thank you for being exactly who you are - because that\'s absolutely perfect.',
  '',
  'I hope this year brings you all the happiness you deserve,',
  'all the success you dream of, and all the love your heart can hold.',
  '',
  'Happy Birthday,once again! 💕',
  '',
  'Bs ab jyada udne mt lago,',
  'Awkaat pe wapas aa jao 😂 ',
  'Aur haan kone mai ek heart dikh raha hai usko click karo 👉'
];

const HeartfeltMessage = () => {
  return (
    <section className="py-20 px-4 relative">
      <motion.div
        className="max-w-3xl mx-auto glass-card p-8 md:p-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <span className="text-6xl">💌</span>
        </motion.div>

        <div className="space-y-4 font-handwriting text-xl md:text-2xl text-foreground leading-relaxed">
          {heartfeltText.map((line, index) => (
            <motion.p
              key={index}
              className={line === '' ? 'h-4' : ''}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Decorative hearts */}
        <div className="mt-12 flex justify-center gap-4">
          {['💖', '✨', '🌟', '✨', '💖'].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-3xl"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeartfeltMessage;
