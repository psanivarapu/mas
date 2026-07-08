'use client'

import type { Tier } from '@/lib/types'
import { TIER_CONFIGS } from '@/lib/tiers'

export { TIER_CONFIGS }

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
