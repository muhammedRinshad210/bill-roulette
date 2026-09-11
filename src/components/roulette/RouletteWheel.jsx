import React from 'react';
import { Sparkles } from 'lucide-react';

export function RouletteWheel({
  items,
  participants = [],
  rotation = 0,
  isSpinning = false,
  onSpin,
  spinDisabled = false,
}) {
  const itemList = items || participants || [];
  const count = itemList.length;
  const radius = 184;
  const center = 200;
  const step = 360 / (count || 1);

  // Helper to calculate SVG coordinates starting from 12 o'clock (0 degrees) clockwise
  const getCoordinatesForPercent = (degrees, r = radius) => {
    const rad = (degrees * Math.PI) / 180;
    const x = center + r * Math.sin(rad);
    const y = center - r * Math.cos(rad);
    return { x, y };
  };

  // Generate SVG path for each slice
  const createSlicePath = (index) => {
    if (count === 1) {
      return `M ${center - radius} ${center} A ${radius} ${radius} 0 1 0 ${center + radius} ${center} A ${radius} ${radius} 0 1 0 ${center - radius} ${center} Z`;
    }

    const startAngle = index * step;
    const endAngle = (index + 1) * step;
    
    // For 2 slices (180 deg each), adjust endAngle infinitesimally to avoid SVG arc singularity
    const safeEndAngle = (endAngle - startAngle === 180) ? endAngle - 0.01 : endAngle;

    const start = getCoordinatesForPercent(startAngle);
    const end = getCoordinatesForPercent(safeEndAngle);
    const largeArcFlag = step > 180 ? 1 : 0;

    return `M ${center} ${center} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
  };

  // Palette colors for slices (subtle alternating luxury darks)
  const getSliceBg = (index) => {
    const colors = [
      '#12121A', // Dark secondary obsidian
      '#171722', // Elevated dark
      '#1B1A28', // Violet-tinged dark surface
    ];
    return colors[index % colors.length];
  };

  // Text styling and truncation based on count
  const getTextProps = () => {
    if (count <= 4) return { fontSize: '13px', maxLength: 13, textRadius: 105 };
    if (count <= 8) return { fontSize: '11.5px', maxLength: 11, textRadius: 110 };
    if (count <= 12) return { fontSize: '10px', maxLength: 9, textRadius: 115 };
    return { fontSize: '8.5px', maxLength: 8, textRadius: 120 };
  };

  const { fontSize, maxLength, textRadius } = getTextProps();

  return (
    <div className="relative w-full max-w-[min(80vw,42vh,315px)] sm:max-w-[350px] aspect-square mx-auto flex items-center justify-center select-none touch-manipulation">
      {/* Ambient radial glow background */}
      <div 
        aria-hidden="true" 
        className="absolute inset-2 rounded-full bg-accent-primary/10 blur-2xl pointer-events-none" 
      />

      {/* Top Pointer (Champagne Gold at 12 o'clock) */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none drop-shadow-[0_4px_10px_rgba(245,199,107,0.45)]">
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 24L5 5C5 5 9 8 14 8C19 8 23 5 23 5L14 24Z"
            fill="#F5C76B"
            stroke="#FBE2A7"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="7" r="2" fill="#0B0B0F" />
        </svg>
      </div>

      {/* Outer Wheel Rim (Brushed titanium bezel) */}
      <div className="relative w-full h-full p-2.5 rounded-full bg-gradient-to-b from-[#282838] via-[#161622] to-[#0D0D14] shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] border border-white/[0.12] flex items-center justify-center">
        {/* Rotating SVG Wheel Container */}
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning
              ? 'transform 4.0s cubic-bezier(0.12, 0.85, 0.15, 1.0)'
              : 'none',
            willChange: 'transform',
          }}
          className="w-full h-full rounded-full overflow-hidden"
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full block"
            style={{ shapeRendering: 'geometricPrecision' }}
          >
            {/* Slices */}
            {itemList.map((person, idx) => {
              const name = typeof person === 'string' ? person : person.name;
              const truncatedName =
                name.length > maxLength ? `${name.substring(0, maxLength - 1)}…` : name;
              const midAngle = idx * step + step / 2;

              return (
                <g key={idx}>
                  {/* Sector Path */}
                  <path
                    d={createSlicePath(idx)}
                    fill={getSliceBg(idx)}
                    stroke="rgba(255, 255, 255, 0.07)"
                    strokeWidth="1.2"
                  />

                  {/* Radial Divider Glow Accent */}
                  <path
                    d={createSlicePath(idx)}
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.12)"
                    strokeWidth="0.75"
                  />

                  {/* Name Label aligned along radius */}
                  <g transform={`rotate(${midAngle} ${center} ${center})`}>
                    <text
                      x={center}
                      y={center - textRadius}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#FAFAFA"
                      fontSize={fontSize}
                      fontWeight="600"
                      letterSpacing="0.02em"
                      className="select-none tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                    >
                      {truncatedName}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Wheel Inner Decorative Inset Border */}
            <circle
              cx={center}
              cy={center}
              r={radius - 1}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Center Hub & Spin Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button
            type="button"
            onClick={onSpin}
            disabled={spinDisabled || isSpinning}
            aria-label="Spin roulette wheel"
            className={`group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-primary/50 cursor-pointer touch-manipulation ${
              isSpinning
                ? 'bg-[#14141E] text-zinc-500 border border-white/10 scale-95 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-b from-[#222232] to-[#111118] text-white border-2 border-accent-primary/80 hover:border-accent-primary hover:shadow-glow-accent active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.75)]'
            }`}
          >
            {/* Subtle idle ring */}
            {!isSpinning && (
              <span className="absolute -inset-1 rounded-full border border-accent-primary/30 animate-pulse-subtle pointer-events-none" />
            )}

            <div className="flex flex-col items-center select-none">
              <span className={`text-xs sm:text-sm font-black tracking-widest uppercase ${
                isSpinning ? 'text-zinc-500' : 'text-accent-soft group-hover:text-white'
              }`}>
                {isSpinning ? '...' : 'SPIN'}
              </span>
              {!isSpinning && (
                <Sparkles className="w-2.5 h-2.5 text-highlight-gold mt-0.5 opacity-75" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
