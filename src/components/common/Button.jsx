import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium select-none touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-45 disabled:pointer-events-none cursor-pointer rounded-xl transition-all duration-150";

  const variants = {
    primary: "bg-accent-primary text-brand-textPrimary hover:bg-accent-soft active:bg-violet-700 shadow-glow-accent shadow-bevel-btn border-t border-white/20 border-x border-violet-400/30 border-b border-black/40",
    secondary: "bg-surface-elevated text-brand-textPrimary hover:bg-surface-hover hover:border-white/20 active:bg-surface-active border border-white/[0.08] shadow-sm",
    ghost: "bg-transparent text-brand-textSecondary hover:text-brand-textPrimary hover:bg-white/[0.05] active:bg-white/[0.08]",
    gold: "bg-highlight-gold text-[#0B0B0F] font-semibold hover:bg-highlight-goldSoft active:bg-amber-400 shadow-glow-gold shadow-bevel-btn border-t border-amber-200/50 border-x border-amber-300/30 border-b border-black/30",
    outline: "bg-transparent border border-white/[0.09] text-brand-textPrimary hover:border-white/25 hover:bg-white/[0.03] active:bg-white/[0.06]",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-2 gap-1.5 min-h-[40px]",
    md: "text-sm px-5 py-2.5 gap-2 min-h-[48px]",
    lg: "text-base px-6 py-3.5 gap-2.5 min-h-[52px]",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.12 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </motion.button>
  );
});

Button.displayName = 'Button';
