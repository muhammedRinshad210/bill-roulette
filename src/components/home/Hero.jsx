import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export function Hero({ onStartDecision, onOpenHowItWorks }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative pt-5 pb-4 sm:pt-12 sm:pb-10 text-center">
      {/* Background ambient spotlight */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[460px] h-[180px] bg-accent-primary/[0.08] rounded-full blur-[70px] pointer-events-none -z-10" 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        {/* Eyebrow Micro-Badge */}
        <motion.div variants={itemVariants} className="mb-2.5 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-sm select-none">
            <Sparkles className="w-3 h-3 text-highlight-gold" />
            <span className="text-[10px] xs:text-[10.5px] font-semibold tracking-[0.2em] uppercase text-zinc-300">
              FRIENDS &bull; FOOD &bull; FATE
            </span>
          </div>
        </motion.div>

        {/* Main Heading with tight kerning and text-balance */}
        <motion.h1 
          variants={itemVariants} 
          className="text-[28px] xs:text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.035em] text-brand-textPrimary leading-[1.14] text-balance px-2"
        >
          Let the group <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-soft to-accent-primary">decide.</span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p 
          variants={itemVariants} 
          className="mt-2.5 sm:mt-4 text-xs xs:text-sm sm:text-base md:text-lg text-zinc-400 max-w-md leading-relaxed px-4 font-normal"
        >
          Stop arguing. Add your options and let fate pick one.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          variants={itemVariants} 
          className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-none justify-center"
        >
          <Button 
            variant="primary" 
            size="lg"
            onClick={onStartDecision}
            icon={ArrowRight}
            iconPosition="right"
            className="w-full sm:w-auto px-7 font-bold shadow-glow-accent min-h-[50px] sm:min-h-[52px]"
          >
            Start a decision
          </Button>

          <Button 
            variant="ghost" 
            size="md"
            onClick={onOpenHowItWorks}
            icon={HelpCircle}
            iconPosition="left"
            className="w-full sm:w-auto text-zinc-400 hover:text-white min-h-[44px]"
          >
            How it works
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
