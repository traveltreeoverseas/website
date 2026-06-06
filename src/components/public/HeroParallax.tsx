'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';

interface HeroParallaxProps {
  content: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
}

export default function HeroParallax({ content }: HeroParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Parallax Background */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.backgroundImage})` }}
        />
        {/* Gradients Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/40 to-navy-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/40 to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center md:text-left w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ opacity }}
          className="max-w-3xl"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-teal-600/20 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            Welcome to Travel Tree Overseas
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-tight mb-6">
            {content.title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-teal-400" : ""}>{word} </span>
            ))}
          </h1>
          
          <p className="text-lg md:text-xl text-navy-200 mb-10 leading-relaxed max-w-2xl font-light">
            {content.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href={content.ctaLink}>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-teal-600/30 group transition-all duration-300">
                {content.ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl group">
              <PlayCircle className="mr-2 w-6 h-6 text-teal-400" />
              Watch Our Story
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
