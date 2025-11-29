import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    id: 1,
    year: 'The Beginning',
    title: 'When We First Met',
    description: 'The start of an amazing friendship that changed everything.',
    emoji: '🌟',
  },
  {
    id: 2,
    year: 'The Adventures',
    title: 'Unforgettable Moments',
    description: 'So many laughs, adventures, and memories we created together.',
    emoji: '🎉',
  },
  {
    id: 3,
    year: 'The Support',
    title: 'Always There',
    description: 'Through ups and downs, we always had each other\'s backs.',
    emoji: '💪',
  },
  {
    id: 4,
    year: 'The Growth',
    title: 'Growing Together',
    description: 'Watching each other grow and achieve amazing things.',
    emoji: '🌱',
  },
  {
    id: 5,
    year: 'Today',
    title: 'Your Special Day',
    description: 'Celebrating you and all the joy you bring to my life!',
    emoji: '🎂',
  },
  {
    id: 6,
    year: 'Forever',
    title: 'Many More To Come',
    description: 'Here\'s to countless more memories and adventures ahead!',
    emoji: '✨',
  },
];

const FriendshipTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const container = containerRef.current;

    if (!timeline || !container) return;

    // Create horizontal scroll animation
    const scrollTween = gsap.to(timeline, {
      x: () => -(timeline.scrollWidth - container.offsetWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${timeline.scrollWidth - container.offsetWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate individual cards
    const cards = timeline.querySelectorAll('.timeline-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          scale: 0.8,
          opacity: 0.5,
        },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: 'left 80%',
            end: 'left 20%',
            scrub: true,
            containerAnimation: scrollTween,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden h-screen">
      <motion.h2
        className="text-5xl md:text-6xl font-display font-bold text-center mb-12 text-gradient sticky top-8 z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Our Friendship Journey 🌈
      </motion.h2>

      <div ref={timelineRef} className="flex gap-8 px-8 py-12">
        {timelineEvents.map((event, index) => (
          <div
            key={event.id}
            className="timeline-card flex-shrink-0 w-80 glass-card relative"
          >
            {/* Timeline connector */}
            {index < timelineEvents.length - 1 && (
              <div className="absolute top-1/2 -right-8 w-8 h-1 bg-gradient-to-r from-primary to-accent" />
            )}

            <motion.div
              className="text-6xl mb-4 text-center"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {event.emoji}
            </motion.div>

            <div
              className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(${330 + index * 20}, 80%, 80%), 
                  hsl(${270 + index * 20}, 70%, 85%))`,
              }}
            >
              {event.year}
            </div>

            <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
              {event.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              {event.description}
            </p>

            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 text-xl opacity-50">✨</div>
            <div className="absolute bottom-4 left-4 text-xl opacity-50">💖</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FriendshipTimeline;
