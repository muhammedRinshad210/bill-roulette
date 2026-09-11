import React from 'react';
import { History, Zap, Sparkles } from 'lucide-react';

export function QuickAdd({
  presetsConfig,
  onSelectCount,
  onAddChip,
  onUseRecent,
  recentItems = [],
  existingItems = [],
}) {
  if (!presetsConfig) return null;

  const isChips = presetsConfig.type === 'chips';
  const label = presetsConfig.label || (isChips ? 'Quick options' : 'Quick crew count');
  const recentLabel = presetsConfig.recentLabel || (isChips ? 'Use recent' : 'Use recent crew');

  return (
    <div className="w-full space-y-2.5 pt-1">
      {/* Label and optional recent group/picks shortcut */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400">
          {isChips ? (
            <Sparkles className="w-3.5 h-3.5 text-highlight-gold" />
          ) : (
            <Zap className="w-3.5 h-3.5 text-accent-soft" />
          )}
          <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400">{label}</span>
        </div>

        {recentItems && recentItems.length >= 2 && (
          <button
            type="button"
            onClick={() => onUseRecent(recentItems)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-soft hover:text-white px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] transition-all cursor-pointer select-none touch-manipulation min-h-[44px]"
          >
            <History className="w-3.5 h-3.5 text-accent-soft" />
            <span>{recentLabel}</span>
            <span className="text-[10px] font-mono font-semibold text-zinc-400 bg-white/[0.06] px-1.5 py-0.2 rounded">
              {recentItems.length}
            </span>
          </button>
        )}
      </div>

      {/* Preset Buttons */}
      {isChips ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2">
          {presetsConfig.values.map((item) => {
            const isAlreadyAdded = existingItems.some(
              (ex) => ex.toLowerCase() === item.toLowerCase()
            );

            return (
              <button
                key={item}
                type="button"
                onClick={() => onAddChip(item)}
                disabled={isAlreadyAdded}
                className={`h-12 min-h-[48px] px-2.5 flex items-center justify-center font-medium text-xs sm:text-sm rounded-xl border transition-all cursor-pointer select-none touch-manipulation ${
                  isAlreadyAdded
                    ? 'bg-surface-secondary/40 text-zinc-600 border-white/[0.03] opacity-40 cursor-not-allowed'
                    : 'bg-[#12121A] text-zinc-200 border-white/[0.07] hover:border-accent-primary/40 hover:bg-[#161622] hover:text-white active:scale-95 active:bg-accent-primary/10 shadow-sm'
                }`}
                aria-label={`Add ${item}`}
              >
                <span className="truncate">{item}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {presetsConfig.values.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => onSelectCount(count)}
              className="h-12 min-h-[48px] flex flex-col items-center justify-center bg-[#12121A] text-zinc-200 rounded-xl border border-white/[0.08] hover:border-accent-primary/40 hover:bg-[#161622] hover:text-white active:bg-accent-primary/20 active:scale-95 transition-all cursor-pointer select-none touch-manipulation shadow-sm"
              aria-label={`Add ${count} players`}
            >
              <span className="font-mono font-bold text-sm leading-none">{count}</span>
              <span className="text-[8.5px] xs:text-[9px] font-medium uppercase tracking-normal xs:tracking-wider text-zinc-500 mt-1 leading-none">friends</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
