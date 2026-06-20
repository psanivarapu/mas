'use client'

import { useState, useEffect } from 'react'
import { Zap, Calendar, BarChart3, Star, X, ChevronRight, User, Target, Gauge } from 'lucide-react'
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

// ── Drawer ──────────────────────────────────────────────────────────────────

interface DrawerProps {
  item: RoadmapItem | null
  onClose: () => void
}

function ActionDrawer({ item, onClose }: DrawerProps) {
  const open = item !== null

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const bucketConfig = item ? BUCKET_LABELS[item.bucket] : null

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0f1e35] border-l border-blue-900/50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2">
            {bucketConfig && (
              <span className={`flex items-center gap-1.5 text-xs font-semibold ${bucketConfig.color}`}>
                {item && BUCKET_ICONS[item.bucket]}
                {bucketConfig.label} · {bucketConfig.range}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer body */}
        {item && (
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Effort badge */}
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${EFFORT_COLORS[item.effort]}`}>
                {item.effort} Effort
              </span>
            </div>

            {/* Action title */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Action</p>
              <p className="text-white font-semibold text-base leading-relaxed">{item.action}</p>
            </div>

            <div className="h-px bg-white/8" />

            {/* Owner */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Owner</p>
                <p className="text-blue-300 font-medium text-sm">{item.owner}</p>
              </div>
            </div>

            {/* Expected outcome */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                <Target className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Expected Outcome</p>
                <p className="text-gray-200 text-sm leading-relaxed">{item.outcome}</p>
              </div>
            </div>

            {/* Effort level */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0 mt-0.5">
                <Gauge className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Effort Level</p>
                <p className="text-gray-200 text-sm">
                  <span className={`font-semibold ${
                    item.effort === 'Low' ? 'text-emerald-400' :
                    item.effort === 'Medium' ? 'text-amber-400' : 'text-red-400'
                  }`}>{item.effort}</span>
                  {' — '}
                  {item.effort === 'Low'
                    ? 'Quick win, achievable within days with minimal resources.'
                    : item.effort === 'Medium'
                    ? 'Moderate investment of time and resources over a few weeks.'
                    : 'Significant initiative requiring dedicated budget and cross-team coordination.'}
                </p>
              </div>
            </div>

            <div className="h-px bg-white/8" />

            {/* Timeline context */}
            {bucketConfig && (
              <div className={`rounded-xl border p-4 ${bucketConfig.bg}`}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'inherit' }}>
                  <span className={bucketConfig.color}>Timeline: {bucketConfig.label}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Target window: <span className="font-medium text-gray-200">{bucketConfig.range}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.bucket === 'immediate'
                    ? 'This is a critical gap. Prioritize this action above others.'
                    : item.bucket === 'short'
                    ? 'Schedule this after immediate wins are underway.'
                    : item.bucket === 'medium'
                    ? 'Begin planning once short-term foundations are in place.'
                    : 'This area is performing well — sustain and benchmark continuously.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Drawer footer */}
        <div className="px-6 py-4 border-t border-white/8 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────

interface RoadmapCardProps {
  item: RoadmapItem
  onClick: (item: RoadmapItem) => void
}

function RoadmapCard({ item, onClick }: RoadmapCardProps) {
  return (
    <button
      onClick={() => onClick(item)}
      className="w-full text-left bg-[#0A1628]/80 border border-white/10 rounded-xl px-4 py-3 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all group cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <p className="flex-1 text-sm font-medium text-white truncate">{item.action}</p>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${EFFORT_COLORS[item.effort]}`}>
            {item.effort}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 transition-colors" />
        </div>
      </div>
    </button>
  )
}

// ── Column ────────────────────────────────────────────────────────────────────

interface BucketColumnProps {
  bucket: TimeBucket
  items: RoadmapItem[]
  onItemClick: (item: RoadmapItem) => void
}

function BucketColumn({ bucket, items, onItemClick }: BucketColumnProps) {
  const config = BUCKET_LABELS[bucket]

  return (
    <div className={`rounded-2xl border p-5 ${config.bg} flex flex-col`}>
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

      <div className="flex flex-col gap-2 flex-1">
        {items.length > 0 ? (
          items.map((item) => (
            <RoadmapCard key={item.id} item={item} onClick={onItemClick} />
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center py-6">
            <p className="text-sm text-gray-600 text-center italic">
              No immediate actions needed — this is a strength area.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null)
  const buckets: TimeBucket[] = ['immediate', 'short', 'medium', 'long']

  return (
    <>
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
          <span className="text-gray-600 hidden sm:inline">· Click any action to see details</span>
        </div>

        {/* Kanban Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {buckets.map((bucket) => (
            <BucketColumn
              key={bucket}
              bucket={bucket}
              items={roadmap[bucket]}
              onItemClick={setSelectedItem}
            />
          ))}
        </div>
      </div>

      {/* Detail drawer */}
      <ActionDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  )
}
