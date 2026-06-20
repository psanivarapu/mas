'use client'

import { Zap, Calendar, BarChart3, Star } from 'lucide-react'
import type { TimeBucket, RoadmapItem } from '@/lib/types'
import { BUCKET_LABELS, EFFORT_COLORS } from '@/lib/roadmap'

const BUCKET_ICONS: Record<TimeBucket, React.ReactNode> = {
  immediate: <Zap className="w-4 h-4" />,
  short: <Calendar className="w-4 h-4" />,
  medium: <BarChart3 className="w-4 h-4" />,
  long: <Star className="w-4 h-4" />,
}

interface RoadmapTimelineProps {
  roadmap: Record<TimeBucket, RoadmapItem[]>
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  return (
    <div className="bg-[#0A1628]/80 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-sm font-medium text-white leading-snug">{item.action}</p>
        <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${EFFORT_COLORS[item.effort]}`}>
          {item.effort}
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-start gap-1.5">
          <span className="text-xs text-gray-500 shrink-0 mt-0.5">Owner:</span>
          <span className="text-xs text-blue-300">{item.owner}</span>
        </div>
        <div className="flex items-start gap-1.5">
          <span className="text-xs text-gray-500 shrink-0 mt-0.5">Outcome:</span>
          <span className="text-xs text-gray-300">{item.outcome}</span>
        </div>
      </div>
    </div>
  )
}

interface BucketColumnProps {
  bucket: TimeBucket
  items: RoadmapItem[]
}

function BucketColumn({ bucket, items }: BucketColumnProps) {
  const config = BUCKET_LABELS[bucket]

  return (
    <div className={`rounded-2xl border p-5 ${config.bg} flex flex-col`}>
      {/* Column Header */}
      <div className="mb-4">
        <div className={`flex items-center gap-2 mb-1 ${config.color}`}>
          {BUCKET_ICONS[bucket]}
          <span className="font-bold text-base">{config.label}</span>
        </div>
        <div className="text-xs text-gray-500">{config.range}</div>
        <div className={`mt-2 text-xs font-medium px-2 py-0.5 rounded-full inline-block ${config.color} bg-white/5`}>
          {items.length} action{items.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 flex-1">
        {items.length > 0 ? (
          items.map((item) => <RoadmapCard key={item.id} item={item} />)
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-gray-600 text-center italic">
              No immediate actions needed here — this is a strength area.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  const buckets: TimeBucket[] = ['immediate', 'short', 'medium', 'long']

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        {(['Low', 'Medium', 'High'] as const).map((level) => (
          <div key={level} className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full font-semibold ${EFFORT_COLORS[level]}`}>{level}</span>
            <span className="text-gray-500">
              {level === 'Low' ? 'Quick win' : level === 'Medium' ? 'Moderate investment' : 'Significant initiative'}
            </span>
          </div>
        ))}
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {buckets.map((bucket) => (
          <BucketColumn key={bucket} bucket={bucket} items={roadmap[bucket]} />
        ))}
      </div>
    </div>
  )
}
