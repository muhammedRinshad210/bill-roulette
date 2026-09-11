import React, { useState } from 'react';
import { RotateCw, Share2, Home, Check, Edit3 } from 'lucide-react';
import { Button } from '../common/Button';

export function ResultActions({
  winnerName,
  shareText: customShareText,
  onSpinAgain,
  onEditOptions,
  onNewDecision,
  isOptions = false,
}) {
  const [copied, setCopied] = useState(false);

  const defaultShareText = isOptions
    ? `🍔 Bill Roulette decided dinner.\n\n🌯 We're having ${winnerName}.\n\nThe group has spoken.`
    : `🎰 Bill Roulette decided it.\n\n💸 ${winnerName.toUpperCase()} is paying tonight.\n\nThe wallet has spoken.`;

  const finalShareText = customShareText || defaultShareText;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bill Roulette Verdict',
          text: finalShareText,
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(finalShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-2.5">
      {/* Primary Action: Spin Again */}
      <Button
        variant="primary"
        size="lg"
        onClick={onSpinAgain}
        icon={RotateCw}
        iconPosition="left"
        className="w-full font-bold shadow-glow-accent min-h-[50px] sm:min-h-[52px]"
      >
        Spin Again
      </Button>

      {/* Secondary Actions in 2-column layout */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        <Button
          variant="secondary"
          size="md"
          onClick={handleShare}
          icon={copied ? Check : Share2}
          iconPosition="left"
          className={`min-h-[48px] text-xs sm:text-sm font-medium ${
            copied ? 'text-emerald-400 border-emerald-500/30' : ''
          }`}
        >
          {copied ? 'Copied!' : 'Share Result'}
        </Button>

        {onEditOptions ? (
          <Button
            variant="outline"
            size="md"
            onClick={onEditOptions}
            icon={Edit3}
            iconPosition="left"
            className="min-h-[48px] text-xs sm:text-sm font-medium text-zinc-300 hover:text-white"
          >
            {isOptions ? 'Edit Options' : 'Edit Group'}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="md"
            onClick={onNewDecision}
            icon={Home}
            iconPosition="left"
            className="min-h-[48px] text-xs sm:text-sm font-medium text-zinc-300 hover:text-white"
          >
            New Decision
          </Button>
        )}
      </div>

      {/* If Edit Options is shown, provide clean subtle New Decision link below */}
      {onEditOptions && (
        <button
          type="button"
          onClick={onNewDecision}
          className="w-full py-2 flex items-center justify-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer touch-manipulation min-h-[36px]"
        >
          <Home className="w-3.5 h-3.5 text-zinc-500" />
          <span>Return to Home for a new decision</span>
        </button>
      )}
    </div>
  );
}
