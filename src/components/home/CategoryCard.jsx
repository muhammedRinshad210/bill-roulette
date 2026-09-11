import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function CategoryCard({ category, onClick, index = 0 }) {
  const { title, description, tag, icon: Icon, theme } = category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(category)}
      aria-label={`Select ${title}: ${description}`}
      className={cn(
        "group relative flex flex-col justify-between p-4.5 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 touch-manipulation",
        "bg-[#12121A] border border-white/[0.07] hover:border-white/[0.18] active:border-accent-primary/40",
        "hover:bg-[#161622] hover:shadow-card-hover active:bg-[#181826]",
        theme?.glow
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(category);
        }
      }}
    >
      {/* Top row: Category Personality Icon Well & Tag */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-inner border",
            theme?.accentBg || "bg-surface-elevated",
            theme?.accentText || "text-accent-soft",
            theme?.accentBorder || "border-white/[0.1]"
          )}>
            <Icon className="w-4.5 h-4.5 transition-transform duration-200 group-hover:scale-105" />
          </div>

          <span className={cn(
            "inline-flex items-center text-[10.5px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border select-none transition-colors",
            theme?.badgeClass || "bg-white/[0.04] text-zinc-400 border-white/[0.07]"
          )}>
            {tag}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-base sm:text-[17px] font-bold text-white tracking-tight group-hover:text-accent-soft transition-colors">
          {title}
        </h3>
        <p className="mt-1.5 text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Bottom subtle action disc with category micro-tagline */}
      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
        <span className="text-[11px] font-medium tracking-wide uppercase text-zinc-500 group-hover:text-zinc-400">
          {theme?.tagline || "Select dilemma"}
        </span>
        <div className={cn(
          "w-6 h-6 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center transition-all duration-200",
          theme?.discColor || "group-hover:bg-accent-primary group-hover:border-accent-primary group-hover:text-white"
        )}>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}
