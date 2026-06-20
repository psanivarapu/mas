'use client'

import type { Tier } from '@/lib/types'

interface TierConfig {
  level: number
  animal: string
  emoji: string
  name: string
  gradient: string
  border: string
  textColor: string
  description: string
  shortDesc: string
}

export const TIER_CONFIGS: Record<Tier, TierConfig> = {
  bee: {
    level: 1,
    animal: 'Bee',
    emoji: '🐝',
    name: 'Level 1 — The Bee',
    gradient: 'from-yellow-500 via-amber-500 to-orange-500',
    border: 'border-yellow-500/50',
    textColor: 'text-yellow-400',
    description: 'Ad-hoc and reactive. Your organization has limited AI/analytics structure. Most initiatives are experimental and uncoordinated, with no formal governance or strategy.',
    shortDesc: 'Ad-hoc, reactive. No structured AI strategy.',
  },
  elephant: {
    level: 2,
    animal: 'Elephant',
    emoji: '🐘',
    name: 'Level 2 — The Elephant',
    gradient: 'from-slate-400 via-slate-500 to-gray-600',
    border: 'border-slate-400/50',
    textColor: 'text-slate-300',
    description: 'Aware and building momentum. Your organization recognizes AI\'s importance and has some active initiatives, but they lack coordination, governance, and consistent execution.',
    shortDesc: 'Aware, some initiatives. Not coordinated.',
  },
  dolphin: {
    level: 3,
    animal: 'Dolphin',
    emoji: '🐬',
    name: 'Level 3 — The Dolphin',
    gradient: 'from-teal-400 via-cyan-500 to-sky-500',
    border: 'border-teal-400/50',
    textColor: 'text-teal-300',
    description: 'Scaling with purpose. You have structured AI programs, live GenAI use cases, and growing governance maturity. The challenge is now consistency and acceleration.',
    shortDesc: 'Scaling. Structured programs. Some GenAI live.',
  },
  unicorn: {
    level: 4,
    animal: 'Unicorn',
    emoji: '🦄',
    name: 'Level 4 — The Unicorn',
    gradient: 'from-purple-500 via-violet-500 to-fuchsia-500',
    border: 'border-purple-500/50',
    textColor: 'text-purple-300',
    description: 'AI-native and continuously improving. Your organization has world-class governance, deep AI integration across the value chain, and a culture of data-driven innovation.',
    shortDesc: 'AI-native. Governed. Continuously improving.',
  },
}

interface TierBadgeProps {
  tier: Tier
  score: number
  size?: 'sm' | 'md' | 'lg'
  showDescription?: boolean
}

export default function TierBadge({ tier, score, size = 'md', showDescription = false }: TierBadgeProps) {
  const config = TIER_CONFIGS[tier]

  if (size === 'lg') {
    return (
      <div className="flex flex-col items-center text-center">
        <div
          className={`relative rounded-3xl border-2 ${config.border} p-8 bg-gradient-to-br ${config.gradient} bg-opacity-10 backdrop-blur-sm`}
          style={{ background: 'rgba(10,22,40,0.6)' }}
        >
          <div
            className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-7xl mx-auto mb-4 shadow-2xl`}
          >
            {config.emoji}
          </div>
          <div className={`text-5xl font-black mb-1 ${config.textColor}`}>{score}</div>
          <div className="text-gray-400 text-sm mb-3">out of 100</div>
          <div className={`text-2xl font-bold mb-1 ${config.textColor}`}>{config.name}</div>
          {showDescription && (
            <p className="text-gray-300 text-sm max-w-sm mt-3 leading-relaxed">{config.description}</p>
          )}
        </div>
      </div>
    )
  }

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.border} ${config.textColor} bg-white/5`}
      >
        <span>{config.emoji}</span>
        <span>{config.animal}</span>
      </span>
    )
  }

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-3 rounded-xl border ${config.border} bg-white/5`}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-2xl`}
      >
        {config.emoji}
      </div>
      <div>
        <div className={`font-bold ${config.textColor}`}>{config.name}</div>
        <div className="text-gray-400 text-sm">{config.shortDesc}</div>
      </div>
    </div>
  )
}
