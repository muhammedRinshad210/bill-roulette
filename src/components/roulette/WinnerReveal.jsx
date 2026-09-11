import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CreditCard } from 'lucide-react';
import { cn } from '../../lib/utils';

export function WinnerReveal({
  winnerName = '',
  quote,
  eyebrow = "THE WALLET HAS SPOKEN",
  subtitle = "You're paying tonight.",
  icon: Icon = CreditCard,
  categoryTheme,
}) {
  const isVeryLong = winnerName.length > 18;
  const isLong = winnerName.length > 12;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -6 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
      className="relative w-full max-w-sm mx-auto my-2 sm:my-3.5 p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#13131C] border border-highlight-gold/30 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.85),0_0_24px_rgba(245,199,107,0.12)] text-center overflow-hidden"
    >
      {/* Ambient background champagne glow */}
      <div 
        aria-hidden="true" 
        className="absolute -top-10 -left-10 w-32 h-32 bg-highlight-gold/[0.08] rounded-full blur-2xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-primary/[0.12] rounded-full blur-2xl pointer-events-none" 
      />

      {/* Celebratory restrained micro-eyebrow */}
      <div className="flex items-center justify-center gap-1.5 mb-2">
        <Sparkles className="w-3.5 h-3.5 text-highlight-gold" />
        <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-highlight-gold select-none">
          {eyebrow}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-highlight-gold" />
      </div>

      {/* Winner Name Banner with multi-tier responsive typography */}
      <motion.div
        initial={{ scale: 0.94 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.05, type: 'spring', bounce: 0.2 }}
        className="my-2 py-2 px-3 sm:px-4 rounded-xl bg-[#0B0B0F]/90 border border-white/[0.08] shadow-inner"
      >
        <h2 className={`font-black tracking-tight text-white uppercase break-words leading-tight ${
          isVeryLong
            ? 'text-base xs:text-lg sm:text-xl'
            : isLong
            ? 'text-lg xs:text-xl sm:text-2xl'
            : 'text-2xl sm:text-3xl'
        }`}>
          {winnerName}
        </h2>
      </motion.div>

      {/* Primary Verdict */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <Icon className={cn("w-4 h-4 shrink-0", categoryTheme?.accentText || "text-highlight-gold")} />
        <p className="text-sm sm:text-base font-semibold text-zinc-100">
          {subtitle}
        </p>
      </div>

      {/* Randomized Witty Quote */}
      {quote && (
        <p className="mt-2 text-xs sm:text-[13px] text-zinc-400 italic leading-relaxed px-1">
          &ldquo;{quote}&rdquo;
        </p>
      )}
    </motion.div>
  );
}
