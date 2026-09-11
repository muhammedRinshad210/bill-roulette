import React from 'react';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="w-full py-8 sm:py-10 border-t border-white/[0.05] mt-16 sm:mt-24 text-center">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-textMuted">
        <p>
          Bill Roulette &copy; {new Date().getFullYear()} &bull; Fair group decisions, zero drama.
        </p>
        <p className="flex items-center gap-1.5">
          <span>Built for friends &amp; food</span>
          <span>&bull;</span>
          <span className="text-accent-soft font-mono">Mobile-first</span>
        </p>
      </Container>
    </footer>
  );
}
