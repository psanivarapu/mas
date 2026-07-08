import type { Tier } from './types'

export interface TierConfig {
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
