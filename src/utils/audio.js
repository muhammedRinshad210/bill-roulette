// Subtle mechanical roulette tick synthesis using Web Audio API
// Zero external requests, zero dependencies, 100% offline

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.activeTimeouts = [];
  }

  // Lazy initialize AudioContext on user gesture
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play a single subtle mechanical peg click
  playTick(volume = 0.15) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Filtered micro-noise burst (10ms)
      const bufferSize = ctx.sampleRate * 0.01;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600 + Math.random() * 200, now);
      filter.Q.setValueAtTime(4.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.01);

      // 2. Soft wood/metal tactile transient
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750 + Math.random() * 80, now);

      oscGain.gain.setValueAtTime(volume * 0.3, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.008);
    } catch {
      // Ignore browser policy restrictions
    }
  }

  // Play subtle mechanical ticks during wheel spinning
  // Ticks decelerate alongside wheel and stop completely when the wheel halts
  playSpinSequence(duration = 4000) {
    this.stopSpinSequence();
    if (this.isMuted) return;

    let elapsed = 50;
    let interval = 40;

    // Schedule ticks strictly while spinning; halt before full stop (no end sound)
    while (elapsed < duration - 200) {
      const timeoutId = setTimeout(() => {
        this.playTick(0.16);
      }, elapsed);

      this.activeTimeouts.push(timeoutId);

      // Smooth deceleration curve matching visual slowdown
      const progress = elapsed / duration;
      const decelerationFactor = 1 + Math.pow(progress, 1.7) * 7.0;
      interval = 40 * decelerationFactor;
      elapsed += interval;
    }
  }

  stopSpinSequence() {
    this.activeTimeouts.forEach((id) => clearTimeout(id));
    this.activeTimeouts = [];
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted) {
      this.stopSpinSequence();
    }
  }
}

export const soundManager = new SoundManager();
