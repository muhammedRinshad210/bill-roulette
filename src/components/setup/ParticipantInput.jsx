import React, { useState, useRef, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ParticipantInput({
  onAddParticipant,
  existingNames = [],
  placeholder = "Enter a name",
  ariaLabel = "Participant name",
  emptyErrorMessage = "Please enter an option",
}) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Auto-focus on mount for rapid entry
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError(emptyErrorMessage);
      inputRef.current?.focus();
      return;
    }

    // Check duplicate (case-insensitive)
    const isDuplicate = existingNames.some(
      (n) => n.toLowerCase() === trimmed.toLowerCase()
    );

    if (isDuplicate) {
      setError(`"${trimmed}" is already added`);
      inputRef.current?.focus();
      return;
    }

    setError('');
    onAddParticipant(trimmed);
    setName('');
    // Keep input focused for rapid multi-name entry
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={30}
          className="w-full h-13 sm:h-14 pl-4 pr-16 text-base bg-[#0E0E14] text-white placeholder:text-zinc-500 rounded-2xl border border-white/[0.09] focus:border-accent-primary/80 focus:bg-[#12121C] focus:ring-2 focus:ring-accent-primary/20 focus:outline-none transition-all shadow-inner"
          aria-label={ariaLabel}
        />

        {/* Large + Add button (guaranteed 48px touch target for one-thumb mobile entry) */}
        <button
          type="submit"
          aria-label="Add participant"
          className="absolute right-1 w-11 h-11 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl bg-accent-primary text-white hover:bg-accent-soft active:scale-95 transition-all shadow-sm shadow-glow-accent cursor-pointer touch-manipulation"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </form>

      {/* Inline subtle validation error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 pl-1"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
