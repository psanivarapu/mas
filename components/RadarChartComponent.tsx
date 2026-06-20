'use client'

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { SegmentKey } from '@/lib/types'
import { getScoreColor } from '@/lib/scoring'

interface RadarChartProps {
  segmentScores: Record<SegmentKey, number>
}

const SEGMENT_LABELS: Record<SegmentKey, string> = {
  governance: 'Data Governance',
  technology: 'Technology',
  people: 'People & Skills',
  culture: 'Culture & Strategy',
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const val = payload[0].value as number
    return (
      <div className="bg-[#0f1e35] border border-blue-800/50 rounded-lg px-3 py-2 text-sm">
        <span className="font-semibold" style={{ color: getScoreColor(val) }}>
          {val} / 100
        </span>
      </div>
    )
  }
  return null
}

export default function RadarChartComponent({ segmentScores }: RadarChartProps) {
  const data = (Object.keys(segmentScores) as SegmentKey[]).map((key) => ({
    subject: SEGMENT_LABELS[key],
    score: segmentScores[key],
    fullMark: 100,
  }))

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} margin={{ top: 20, right: 40, bottom: 20, left: 40 }}>
        <PolarGrid
          stroke="#1e3a5f"
          strokeDasharray="3 3"
        />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 10 }}
          tickCount={5}
        />
        <Radar
          name="Maturity Score"
          dataKey="score"
          stroke="#2563EB"
          fill="#2563EB"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
