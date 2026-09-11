import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Users, Layers } from 'lucide-react';
import { ParticipantRow } from './ParticipantRow';

export function ParticipantList({
  participants = [],
  onRemove,
  emptyTitle = "No items added yet",
  emptySubtitle = "Type an option above or use presets",
  listTitle = "Options on the table",
  itemUnit = ["item", "items"],
  isOptions = false,
}) {
  const EmptyIcon = isOptions ? Layers : Users;
  const count = participants.length;
  const unitLabel = count === 1 ? itemUnit[0] : itemUnit[1];

  if (count === 0) {
    return (
      <div className="py-7 px-4 text-center rounded-2xl border border-dashed border-white/[0.08] bg-[#0E0E14]/60 select-none">
        <EmptyIcon className="w-7 h-7 mx-auto text-zinc-600 mb-2" />
        <p className="text-sm text-zinc-300 font-medium">
          {emptyTitle}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5">
          {emptySubtitle}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          {listTitle}
        </span>
        <span className="text-[11px] font-mono font-semibold text-accent-soft bg-accent-primary/10 px-2 py-0.5 rounded-full border border-accent-primary/20">
          {count} {unitLabel}
        </span>
      </div>

      <ul className="space-y-1.5 sm:space-y-2" aria-label="List of options">
        <AnimatePresence initial={false}>
          {participants.map((person, index) => (
            <ParticipantRow
              key={`${person.id || person}-${index}`}
              index={index}
              name={person.name || person}
              onRemove={onRemove}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
