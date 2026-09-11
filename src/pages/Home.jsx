import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { Hero } from '../components/home/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { HowItWorksModal } from '../components/home/HowItWorksModal';
import { CATEGORIES } from '../data/categories';

export function Home({ onSelectCategory, onStartDecision }) {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const handleStartDecision = () => {
    if (onStartDecision) {
      onStartDecision();
    } else if (onSelectCategory) {
      // Default to "Who's paying?" flagship flow
      const defaultCat = CATEGORIES.find((c) => c.id === 'whos-paying') || CATEGORIES[0];
      onSelectCategory(defaultCat);
    }
  };

  const handleCategoryClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <main className="min-h-screen">
      <Container>
        {/* Hero Section */}
        <Hero
          onStartDecision={handleStartDecision}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        />

        {/* Category Grid Section */}
        <div id="categories-section">
          <CategoryGrid
            categories={CATEGORIES}
            onSelectCategory={handleCategoryClick}
          />
        </div>
      </Container>

      {/* How it Works Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onStartDecision={handleStartDecision}
      />
    </main>
  );
}
