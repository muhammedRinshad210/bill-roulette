import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { DecisionSetup } from './components/setup/DecisionSetup';
import { RouletteScreen } from './components/roulette/RouletteScreen';
import { HowItWorksModal } from './components/home/HowItWorksModal';
import { CATEGORIES } from './data/categories';
import { cn } from './lib/utils';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'setup' | 'roulette'
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [activeParticipants, setActiveParticipants] = useState([]);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Track scroll positions across screens
  const scrollPositions = useRef({
    home: 0,
    setup: 0,
    roulette: 0,
  });

  const pendingRestoreRef = useRef(null);
  const isRestoringScrollRef = useRef(false);

  // Helper to record scroll position for current screen
  const saveCurrentScroll = () => {
    if (isRestoringScrollRef.current) return;
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    scrollPositions.current[currentScreen] = y;
  };

  // Passive scroll listener to continuously keep the active screen's position updated
  useEffect(() => {
    const handleScroll = () => {
      if (isRestoringScrollRef.current) return;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      scrollPositions.current[currentScreen] = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentScreen]);

  // Set manual scroll restoration and listen to browser popstate (Back / Forward navigation)
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (!window.history.state || !window.history.state.screen) {
      window.history.replaceState({ screen: 'home', categoryId: null }, '');
    }

    const handlePopState = (event) => {
      const state = event.state;
      const targetScreen = state?.screen || 'home';
      const targetCategoryId = state?.categoryId;

      if (targetCategoryId) {
        const foundCategory = CATEGORIES.find((c) => c.id === targetCategoryId);
        if (foundCategory) {
          setSelectedCategory(foundCategory);
        }
      }

      // Restore scroll position of target screen
      const restoreY = scrollPositions.current[targetScreen] ?? 0;
      pendingRestoreRef.current = restoreY;
      isRestoringScrollRef.current = true;
      setCurrentScreen(targetScreen);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Restore scroll position when screen changes
  useLayoutEffect(() => {
    if (pendingRestoreRef.current !== null) {
      const targetY = pendingRestoreRef.current;
      pendingRestoreRef.current = null;
      isRestoringScrollRef.current = true;

      // Immediate attempt
      window.scrollTo({ top: targetY, behavior: 'instant' });

      // Frame attempts to guard against browser layout shifts
      const frame1 = requestAnimationFrame(() => {
        window.scrollTo({ top: targetY, behavior: 'instant' });
        const frame2 = requestAnimationFrame(() => {
          window.scrollTo({ top: targetY, behavior: 'instant' });
          isRestoringScrollRef.current = false;
        });
        return () => cancelAnimationFrame(frame2);
      });

      return () => {
        cancelAnimationFrame(frame1);
        isRestoringScrollRef.current = false;
      };
    }
  }, [currentScreen]);

  // Forward Navigation: Select Category (Home -> Setup)
  const handleSelectCategory = (category) => {
    saveCurrentScroll();
    if (category.id !== selectedCategory?.id) {
      setActiveParticipants([]);
    }
    // Opening fresh -> Setup starts at top
    scrollPositions.current.setup = 0;
    pendingRestoreRef.current = 0;
    isRestoringScrollRef.current = true;

    setSelectedCategory(category);
    window.history.pushState({ screen: 'setup', categoryId: category.id }, '');
    setCurrentScreen('setup');
  };

  const handleStartDecision = () => {
    const defaultCategory = CATEGORIES.find((c) => c.id === 'whos-paying') || CATEGORIES[0];
    handleSelectCategory(defaultCategory);
  };

  // Back Navigation: Setup -> Home
  const handleBackToHome = () => {
    saveCurrentScroll();
    if (window.history.state?.screen === 'setup') {
      window.history.back();
    } else {
      pendingRestoreRef.current = scrollPositions.current.home ?? 0;
      isRestoringScrollRef.current = true;
      setCurrentScreen('home');
    }
  };

  // Forward Navigation: Setup -> Roulette
  const handleSetupContinue = (participants) => {
    saveCurrentScroll();
    setActiveParticipants(participants);
    // Opening fresh -> Roulette starts at top
    scrollPositions.current.roulette = 0;
    pendingRestoreRef.current = 0;
    isRestoringScrollRef.current = true;

    window.history.pushState({ screen: 'roulette', categoryId: selectedCategory?.id }, '');
    setCurrentScreen('roulette');
  };

  // Back Navigation: Roulette -> Setup (preserves current items and scroll position)
  const handleBackToSetup = () => {
    saveCurrentScroll();
    if (window.history.state?.screen === 'roulette') {
      window.history.back();
    } else {
      pendingRestoreRef.current = scrollPositions.current.setup ?? 0;
      isRestoringScrollRef.current = true;
      setCurrentScreen('setup');
    }
  };

  // Fresh Navigation: Roulette -> Home (New decision)
  const handleNewDecision = () => {
    // Fresh decision opens Home at top
    scrollPositions.current.home = 0;
    pendingRestoreRef.current = 0;
    isRestoringScrollRef.current = true;

    if (window.history.state?.screen && window.history.state.screen !== 'home') {
      window.history.pushState({ screen: 'home', categoryId: null }, '');
    }
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-brand-textPrimary antialiased selection:bg-accent-primary/30">
      {/* Home View (kept mounted to avoid component remount layout shifts and animation replays) */}
      <div
        className={cn(
          "min-h-screen flex flex-col flex-1",
          currentScreen !== 'home' && "hidden"
        )}
      >
        <Header onOpenHowItWorks={() => setIsHowItWorksOpen(true)} />
        <div className="flex-1">
          <Home
            onSelectCategory={handleSelectCategory}
            onStartDecision={handleStartDecision}
          />
        </div>
        <Footer />
        <HowItWorksModal
          isOpen={isHowItWorksOpen}
          onClose={() => setIsHowItWorksOpen(false)}
          onStartDecision={handleStartDecision}
        />
      </div>

      {/* Setup View */}
      {currentScreen === 'setup' && (
        <DecisionSetup
          category={selectedCategory}
          initialParticipants={activeParticipants}
          onBack={handleBackToHome}
          onContinue={handleSetupContinue}
        />
      )}

      {/* Roulette View */}
      {currentScreen === 'roulette' && (
        <RouletteScreen
          category={selectedCategory}
          items={activeParticipants}
          onBack={handleBackToSetup}
          onNewDecision={handleNewDecision}
        />
      )}
    </div>
  );
}
