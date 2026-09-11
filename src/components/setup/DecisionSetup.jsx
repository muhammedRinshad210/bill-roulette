import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Dices, Sparkles, ArrowRight, AlertCircle, CheckCircle2, CreditCard } from 'lucide-react';
import { Container } from '../layout/Container';
import { Button } from '../common/Button';
import { ParticipantInput } from './ParticipantInput';
import { ParticipantList } from './ParticipantList';
import { QuickAdd } from './QuickAdd';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { cn } from '../../lib/utils';

export function DecisionSetup({ category, initialParticipants = [], onBack, onContinue }) {
  const [participants, setParticipants] = useState(initialParticipants);
  const [isReadyToSpin, setIsReadyToSpin] = useState(false);

  // Configuration from category
  const setupConfig = category?.setup || {};
  const isOptions = category?.type === 'options';
  const CategoryIcon = category?.icon || CreditCard;

  const title = setupConfig.title || category?.title || "Decision Setup";
  const subtitle = setupConfig.subtitle || "Add your options. Fate will handle the rest.";
  const inputPlaceholder = setupConfig.inputPlaceholder || (isOptions ? "Add an option" : "Enter a name");
  const inputLabel = setupConfig.inputLabel || (isOptions ? "Option" : "Participant name");
  const ctaText = setupConfig.ctaText || (isOptions ? "Let fate decide" : "Continue to wheel");
  const helperText = setupConfig.helperText || (isOptions ? "Add at least 2 options to start." : "Add at least 2 friends to start.");
  const storageKey = setupConfig.storageKey || (isOptions ? "bill_roulette_recent_food" : "bill_roulette_recent_group");
  const presetsConfig = setupConfig.presets;

  // Persist recent items cleanly partitioned by category storage key
  const [recentItems, setRecentItems] = useLocalStorage(storageKey, []);

  // Add item
  const handleAddItem = (name) => {
    setParticipants((prev) => [...prev, name]);
  };

  // Remove item
  const handleRemoveItem = (indexToRemove) => {
    setParticipants((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Quick preset counts: Player 1, Player 2, ...
  const handleQuickCount = (count) => {
    const players = Array.from({ length: count }, (_, i) => `Player ${i + 1}`);
    setParticipants(players);
  };

  // Quick preset chip (e.g. food emoji)
  const handleAddChip = (chip) => {
    const isAlreadyAdded = participants.some(
      (p) => p.toLowerCase() === chip.toLowerCase()
    );
    if (!isAlreadyAdded) {
      setParticipants((prev) => [...prev, chip]);
    }
  };

  // Use recent group or food picks
  const handleUseRecent = (savedList) => {
    if (savedList && savedList.length > 0) {
      setParticipants([...savedList]);
    }
  };

  // Validation
  const isValid = participants.length >= 2;

  // Handle Continue
  const handleContinue = () => {
    if (!isValid) return;

    // Save to localStorage for future rapid reuse
    setRecentItems(participants);

    // Call continue prop
    if (onContinue) {
      onContinue(participants);
    } else {
      setIsReadyToSpin(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex flex-col bg-bg-primary text-brand-textPrimary"
    >
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 w-full bg-bg-primary/90 backdrop-blur-xl border-b border-white/[0.07]">
        <Container className="h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to home"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white py-2 px-2.5 -ml-2.5 rounded-xl hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors cursor-pointer select-none min-h-[48px] touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400" />
            <span>Back</span>
          </button>

          {/* Small Bill Roulette Branding */}
          <div className="flex items-center gap-2 select-none">
            <div className="w-7 h-7 rounded-lg bg-surface-elevated border border-white/10 flex items-center justify-center text-accent-soft shadow-inner">
              <Dices className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">
              Bill Roulette
            </span>
          </div>

          <div className="w-12" aria-hidden="true" />
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-32 sm:pb-36 pt-5 sm:pt-7">
        <Container className="max-w-xl">
          {/* Dilemma Header */}
          <div className="mb-5 sm:mb-6">
            <div className={cn(
              "inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] px-2.5 py-1 rounded-md border mb-2.5 select-none transition-colors",
              category?.theme?.badgeClass || "text-zinc-300 bg-white/[0.04] border-white/[0.08]"
            )}>
              <CategoryIcon className={cn("w-3.5 h-3.5", category?.theme?.accentText || "text-accent-soft")} />
              <span>{setupConfig.badge || (isOptions ? 'Options Setup' : 'Dilemma Setup')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form & List Section */}
          <div className="space-y-5 sm:space-y-6">
            {/* Input Component */}
            <ParticipantInput
              onAddParticipant={handleAddItem}
              existingNames={participants}
              placeholder={inputPlaceholder}
              ariaLabel={inputLabel}
              emptyErrorMessage={`Please enter an ${isOptions ? 'option' : 'name'}`}
            />

            {/* Quick Add Presets (chips or counts) */}
            <QuickAdd
              presetsConfig={presetsConfig}
              onSelectCount={handleQuickCount}
              onAddChip={handleAddChip}
              onUseRecent={handleUseRecent}
              recentItems={recentItems}
              existingItems={participants}
            />

            {/* Participant / Options List */}
            <div className="pt-1 sm:pt-2">
              <ParticipantList
                participants={participants}
                onRemove={handleRemoveItem}
                emptyTitle={setupConfig.emptyTitle}
                emptySubtitle={setupConfig.emptySubtitle}
                listTitle={setupConfig.listTitle}
                itemUnit={setupConfig.itemUnit}
                isOptions={isOptions}
              />
            </div>
          </div>
        </Container>
      </main>

      {/* Sticky Bottom Action Area */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-bg-primary/92 backdrop-blur-xl border-t border-white/[0.08] py-3 px-4 pb-[calc(0.85rem+env(safe-area-inset-bottom,0px))]">
        <Container className="max-w-xl flex flex-col items-center">
          {/* Validation Helper Message */}
          <div className="h-5 flex items-center justify-center mb-1">
            {!isValid && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-xs text-zinc-500"
              >
                <AlertCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span>
                  {participants.length === 0
                    ? helperText
                    : `Add 1 more ${isOptions ? 'option' : 'friend'} to unlock the wheel.`}
                </span>
              </motion.div>
            )}
            {isValid && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-xs text-accent-soft font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-highlight-gold" />
                <span>Ready for fate to choose</span>
              </motion.div>
            )}
          </div>

          {/* Main Dominant CTA Button */}
          <Button
            variant="primary"
            size="lg"
            disabled={!isValid}
            onClick={handleContinue}
            icon={ArrowRight}
            iconPosition="right"
            className="w-full font-bold shadow-glow-accent disabled:shadow-none min-h-[50px] sm:min-h-[52px]"
          >
            {ctaText}
          </Button>
        </Container>
      </footer>

      {/* Fallback Dialog if standalone */}
      <AnimatePresence>
        {isReadyToSpin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-surface-elevated border border-white/10 rounded-2xl p-6 shadow-2xl text-center space-y-4"
            >
              <div className="w-11 h-11 rounded-2xl bg-accent-primary/20 border border-accent-primary/40 flex items-center justify-center mx-auto text-accent-soft">
                <CheckCircle2 className="w-5 h-5 text-accent-soft" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Options Locked
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-white">{participants.length} choices</strong> ready for <strong className="text-white">{title}</strong>.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsReadyToSpin(false)}
                className="w-full mt-2"
              >
                Back to Edit
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
