import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const memories = [
  {
    id: 1,
    image: '/1615341426938.jpg',
  },
  {
    id: 2,
    image: '/IMG_20250330_005322.jpg',
  },
  {
    id: 3,
    image: '/IMG_20250330_005847.jpg',
  },
  {
    id: 4,
    image: '/Screenshot_2023-02-15-19-16-20-930-edit_com.instagram.android.jpg',
  },
];

const SurpriseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.memory-card');
    
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 100, rotateY: 45 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <motion.h2
        className="text-5xl md:text-6xl font-display font-bold text-center mb-16 text-gradient"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Some of your Chudail type Photos ✨
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {memories.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="memory-card glass-card group cursor-pointer perspective-1000"
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              rotateX: 5,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div
              className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4"
            >
              <img 
                src={memory.image} 
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gold glow on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SurpriseSection;
