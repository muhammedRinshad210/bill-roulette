import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Dices, Sparkles, Play, Utensils, CreditCard, Volume2, VolumeX, Compass } from 'lucide-react';
import { Container } from '../layout/Container';
import { Button } from '../common/Button';
import { RouletteWheel } from './RouletteWheel';
import { WinnerReveal } from './WinnerReveal';
import { ResultActions } from './ResultActions';
import { getRandomQuote } from '../../data/wittyQuotes';
import { soundManager } from '../../utils/audio';
import { cn } from '../../lib/utils';

export function RouletteScreen({ category, items = [], participants, onBack, onNewDecision }) {
  const [rouletteState, setRouletteState] = useState('idle'); // 'idle' | 'spinning' | 'revealed'
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);
  const [wittyQuote, setWittyQuote] = useState('');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Stop spin sound on unmount
  useEffect(() => {
    return () => {
      soundManager.stopSpinSequence();
    };
  }, []);

  const itemList = items.length > 0 ? items : (participants || []);
  const count = itemList.length;
  const isOptions = category?.type === 'options';
  const CategoryIcon = category?.icon || (category?.id === 'place' ? Compass : isOptions ? Utensils : CreditCard);

  const title = category?.title || (isOptions ? "What should we eat?" : "Who's paying?");
  const resultConfig = category?.result || {};

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      soundManager.setMuted(!next);
      return next;
    });
  };

  const handleSpin = () => {
    if (rouletteState === 'spinning' || count < 2) return;

    setRouletteState('spinning');
    setWinner(null);

    // 1. Fair uniform random selection of winner index
    const winnerIndex = Math.floor(Math.random() * count);
    const selected = itemList[winnerIndex];
    const winnerName = typeof selected === 'string' ? selected : selected.name;

    // 2. Play synchronized decelerating audio ticks
    soundManager.playSpinSequence(4000);

    // 3. Exact mathematical landing calculation
    const step = 360 / count;
    const sliceCenterAngle = winnerIndex * step + step / 2;

    // Gentle organic jitter safely inside slice boundary
    const maxJitter = (step / 2) * 0.35;
    const jitter = (Math.random() - 0.5) * 2 * maxJitter;
    const landingAngle = sliceCenterAngle + jitter;

    // Normalize target rotation so landingAngle arrives at 12 o'clock (0 degrees)
    let targetNormalized = (360 - (landingAngle % 360)) % 360;
    if (targetNormalized < 0) targetNormalized += 360;

    const currentNormalized = ((rotation % 360) + 360) % 360;
    let delta = targetNormalized - currentNormalized;
    if (delta <= 0) delta += 360;

    // Spin 5 to 6 complete revolutions forward
    const fullSpins = 5 + Math.floor(Math.random() * 2);
    const nextRotation = rotation + fullSpins * 360 + delta;

    setRotation(nextRotation);

    // 4. Reveal winner after 4.0s spin + 350ms dramatic pause
    setTimeout(() => {
      setWinner(winnerName);
      setWittyQuote(getRandomQuote(resultConfig.quotesCategory || (isOptions ? 'food' : 'paying')));
      setRouletteState('revealed');
    }, 4350);
  };

  const handleSpinAgain = () => {
    handleSpin();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex flex-col bg-bg-primary text-brand-textPrimary overflow-x-hidden"
    >
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 w-full bg-bg-primary/90 backdrop-blur-xl border-b border-white/[0.07]">
        <Container className="h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={rouletteState === 'spinning'}
            aria-label={isOptions ? "Back to options" : "Back to participants"}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white py-2 px-2.5 -ml-2.5 rounded-xl hover:bg-white/[0.04] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer select-none min-h-[48px] touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
            <span>Edit</span>
          </button>

          {/* Minimal Branding */}
          <div className="flex items-center gap-2 select-none">
            <div className="w-7 h-7 rounded-lg bg-surface-elevated border border-white/10 flex items-center justify-center text-accent-soft shadow-inner">
              <Dices className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">
              Bill Roulette
            </span>
          </div>

          {/* Sound Toggle (min 48px touch target) */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isSoundEnabled ? "Mute roulette sound" : "Enable roulette sound"}
            title={isSoundEnabled ? "Mute sound" : "Enable sound"}
            className="w-12 h-12 flex items-center justify-center rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] active:scale-95 transition-all cursor-pointer select-none touch-manipulation"
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4.5 h-4.5 text-accent-soft" />
            ) : (
              <VolumeX className="w-4.5 h-4.5 text-zinc-600" />
            )}
          </button>
        </Container>
      </header>

      {/* Main Wheel View */}
      <main className="flex-1 w-full py-4 sm:py-6 flex flex-col items-center justify-between">
        <Container className="max-w-md flex-1 flex flex-col items-center justify-between">
          {/* Header */}
          <div className="text-center mb-3 sm:mb-5">
            <div className={cn(
              "inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] px-2.5 py-0.5 rounded-full border mb-2 select-none transition-colors",
              category?.theme?.badgeClass || "text-accent-soft bg-accent-primary/10 border-accent-primary/20"
            )}>
              <CategoryIcon className={cn("w-3 h-3", category?.theme?.accentText || "text-accent-soft")} />
              <span>{count} {isOptions ? 'Options in the running' : 'Friends in the running'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              {category?.id === 'task'
                ? "Nobody volunteered. Fate will pick the candidate."
                : category?.id === 'music'
                ? "The aux cord is on the line. Let fate crown the DJ."
                : category?.id === 'place'
                ? "The destination is in fate's hands. Let's roll."
                : category?.id === 'watch'
                ? "Stop scrolling through menus. Let fate pick the watch."
                : isOptions
                ? "The table has spoken. Let fate pick dinner."
                : "The table has spoken. Let fate choose."}
            </p>
          </div>

          {/* Wheel Graphic */}
          <div className="w-full my-auto py-1">
            <RouletteWheel
              items={itemList}
              rotation={rotation}
              isSpinning={rouletteState === 'spinning'}
              onSpin={handleSpin}
              spinDisabled={rouletteState === 'spinning'}
            />
          </div>

          {/* Dynamic Content Area: Spin CTA or Winner Reveal + Result Actions */}
          <div className="w-full mt-4 sm:mt-5">
            <AnimatePresence mode="wait">
              {rouletteState !== 'revealed' ? (
                <motion.div
                  key="spin-prompt"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5 text-center"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={rouletteState === 'spinning'}
                    onClick={handleSpin}
                    icon={rouletteState === 'spinning' ? Sparkles : Play}
                    iconPosition="right"
                    className="w-full font-bold shadow-glow-accent min-h-[50px] sm:min-h-[52px]"
                  >
                    {rouletteState === 'spinning' ? 'Deciding Fate...' : 'Spin The Wheel'}
                  </Button>

                  <p className="text-xs text-zinc-500 select-none">
                    {rouletteState === 'spinning'
                      ? 'No take-backs. The decision will be final.'
                      : 'Tap "Spin" or tap the wheel hub to begin.'}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-3.5"
                >
                  <WinnerReveal
                    winnerName={winner}
                    quote={wittyQuote}
                    eyebrow={resultConfig.eyebrow || (category?.id === 'music' ? "THE AUX HAS A NEW OWNER" : category?.id === 'watch' ? "TONIGHT'S WATCH IS SET" : category?.id === 'place' ? "THE DESTINATION IS SET" : isOptions ? "DINNER HAS BEEN DECIDED" : "THE WALLET HAS SPOKEN")}
                    subtitle={typeof resultConfig.subtitle === 'function' ? resultConfig.subtitle(winner) : (resultConfig.subtitle || (category?.id === 'place' ? "That's where the group is heading." : isOptions ? "That's what you're having tonight." : "You're paying tonight."))}
                    icon={CategoryIcon}
                    categoryTheme={category?.theme}
                  />
                  <ResultActions
                    winnerName={winner}
                    shareText={resultConfig.shareTemplate ? resultConfig.shareTemplate(winner) : undefined}
                    onSpinAgain={handleSpinAgain}
                    onEditOptions={onBack}
                    onNewDecision={onNewDecision}
                    isOptions={isOptions}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </main>
    </motion.div>
  );
}
