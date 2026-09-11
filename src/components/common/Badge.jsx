import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: "bg-white/[0.04] text-zinc-400 border-white/[0.07]",
    accent: "bg-accent-primary/10 text-accent-soft border-accent-primary/20",
    gold: "bg-highlight-gold/10 text-highlight-gold border-highlight-gold/20",
    muted: "bg-white/[0.02] text-zinc-500 border-white/[0.05]",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 text-[10.5px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md border select-none",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
