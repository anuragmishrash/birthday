import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/birthday/HeroSection';
import SurpriseSection from '@/components/birthday/SurpriseSection';
import WhySpecialSection from '@/components/birthday/WhySpecialSection';
import CakeSection from '@/components/birthday/CakeSection';
import GiftBoxSection from '@/components/birthday/GiftBoxSection';
import WishBalloon from '@/components/birthday/WishBalloon';
import HeartfeltMessage from '@/components/birthday/HeartfeltMessage';
import FloatingElements from '@/components/birthday/FloatingElements';
import SecretEasterEgg from '@/components/birthday/SecretEasterEgg';
import MusicPlayer from '@/components/birthday/MusicPlayer';

const Index = () => {
  const [surpriseVisible, setSurpriseVisible] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [startMusic, setStartMusic] = useState(false);

  // Lock scroll until button is clicked
  useEffect(() => {
    if (!scrollEnabled) {
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
  }, [scrollEnabled]);

  // Sparkle cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.7) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-cursor';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSurprise = () => {
    setSurpriseVisible(true);
    setScrollEnabled(true);
    setStartMusic(true);
    
    // Scroll to the photos section after a short delay
    setTimeout(() => {
      const photosSection = document.querySelector('section');
      if (photosSection) {
        const heroHeight = window.innerHeight;
        window.scrollTo({
          top: heroHeight,
          behavior: 'smooth'
        });
      }
    }, 500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FloatingElements />
      <SecretEasterEgg />
      <MusicPlayer autoPlay={startMusic} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection onSurprise={handleSurprise} />
        
        {surpriseVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SurpriseSection />
          </motion.div>
        )}
        
        <WhySpecialSection />
        <CakeSection />
        <GiftBoxSection />
        <WishBalloon />
        <HeartfeltMessage />
        
        <footer className="py-8 text-center">
          <motion.p
            className="text-lg font-handwriting text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Made with ❤️ for my bestie, Shreyashi Pandey.
          </motion.p>
        </footer>
      </motion.div>
    </div>
  );
};

export default Index;
