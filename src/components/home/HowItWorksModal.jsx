import React from 'react';
import { Layers, Users, Dices, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export function HowItWorksModal({ isOpen, onClose, onStartDecision }) {
  const steps = [
    {
      icon: Layers,
      step: "01",
      title: "Pick or create a dilemma",
      desc: "Choose from bill-splitting, food picks, aux cord rights, or write your own custom question.",
    },
    {
      icon: Users,
      step: "02",
      title: "Add your friends or options",
      desc: "Quickly enter group names, restaurant spots, or chores with quick-presets.",
    },
    {
      icon: Dices,
      step: "03",
      title: "Spin the roulette",
      desc: "Fate makes the call in high-stakes animation. No take-backs, no debates, purely fair.",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How Bill Roulette Works"
      subtitle="The painless way to resolve group deadlock in 30 seconds."
    >
      <div className="space-y-4 my-2">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="flex items-start gap-4 p-3.5 rounded-xl bg-surface-secondary border border-white/[0.06]"
            >
              <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-white/10 flex items-center justify-center shrink-0 text-accent-soft font-mono text-sm font-bold">
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-brand-textPrimary flex items-center gap-2">
                  <Icon className="w-4 h-4 text-accent-soft" />
                  {item.title}
                </h4>
                <p className="text-xs text-brand-textSecondary mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3">
        <Button variant="ghost" size="sm" onClick={onClose}>
          Got it
        </Button>
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => {
            onClose();
            onStartDecision();
          }}
          icon={ArrowRight}
          iconPosition="right"
        >
          Let's try it
        </Button>
      </div>
    </Modal>
  );
}
