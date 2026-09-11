import React from 'react';
import { motion } from 'framer-motion';
import { Dices, HelpCircle } from 'lucide-react';
import { Container } from './Container';

export function Header({ onOpenHowItWorks }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-bg-primary/90 backdrop-blur-xl border-b border-white/[0.07] transition-all">
      <Container className="h-14 sm:h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <motion.div 
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-surface-elevated border border-white/[0.12] flex items-center justify-center text-accent-soft group-hover:border-accent-primary/50 group-hover:shadow-glow-accent transition-all duration-300">
            <Dices className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent-soft group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base tracking-tight text-brand-textPrimary group-hover:text-white transition-colors">
              Bill Roulette
            </span>
          </div>
        </motion.div>

        {/* Navigation / Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={onOpenHowItWorks}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-brand-textSecondary hover:text-brand-textPrimary px-3 py-2 rounded-xl hover:bg-white/[0.04] active:bg-white/[0.08] transition-colors cursor-pointer min-h-[44px] touch-manipulation"
            aria-label="How it works"
          >
            <HelpCircle className="w-4 h-4 text-brand-textMuted" />
            <span>How it works</span>
          </button>
        </motion.div>
      </Container>
    </header>
  );
}
