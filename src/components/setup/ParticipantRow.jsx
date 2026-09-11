import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function ParticipantRow({ index, name, onRemove }) {
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex items-center justify-between min-h-[48px] h-12 sm:h-13 px-3.5 sm:px-4 rounded-xl bg-[#12121A] border border-white/[0.06] hover:border-white/[0.12] transition-colors touch-manipulation shadow-sm"
    >
      {/* Index & Name */}
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
        <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center font-mono text-[10.5px] font-semibold text-zinc-400 shrink-0 select-none">
          {formattedIndex}
        </div>
        <span 
          title={name}
          className="text-sm sm:text-base font-medium text-zinc-100 truncate max-w-[200px] xs:max-w-[240px] sm:max-w-md tracking-tight"
        >
          {name}
        </span>
      </div>

      {/* Remove Button (explicit 48px touch target for thumb ergonomics) */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        aria-label={`Remove ${name}`}
        className="w-12 h-12 min-w-[48px] min-h-[48px] -mr-2 flex items-center justify-center text-zinc-500 hover:text-rose-400 active:text-rose-500 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer select-none touch-manipulation"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.li>
  );
}
