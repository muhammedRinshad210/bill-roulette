import React from 'react';
import { CategoryCard } from './CategoryCard';

export function CategoryGrid({ categories, onSelectCategory }) {
  return (
    <section className="mt-3 sm:mt-6 pb-8">
      {/* Section Subtitle / Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 pb-3 border-b border-white/[0.06] gap-1.5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Pick your scenario
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Select a classic dilemma or spin for a custom decision.
          </p>
        </div>
        <span className="text-[11px] font-mono font-medium text-zinc-500 uppercase tracking-wider">
          {categories.length} scenarios ready
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            onClick={onSelectCategory}
          />
        ))}
      </div>
    </section>
  );
}
