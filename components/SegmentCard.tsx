'use client'

import { Shield, Cpu, Users, Compass, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import type { SegmentKey, Question } from '@/lib/types'
import { getScoreColor } from '@/lib/scoring'

const SEGMENT_ICONS: Record<SegmentKey, React.ReactNode> = {
  governance: <Shield className="w-5 h-5" />,
  technology: <Cpu className="w-5 h-5" />,
  people: <Users className="w-5 h-5" />,
  culture: <Compass className="w-5 h-5" />,
}

const SEGMENT_NAMES: Record<SegmentKey, string> = {
  governance: 'Data Governance',
  technology: 'Technology',
  people: 'People & Skills',
  culture: 'Culture & Strategy',
}

const SEGMENT_COLORS: Record<SegmentKey, string> = {
  governance: '#8B5CF6',
  technology: '#06B6D4',
  people: '#F59E0B',
  culture: '#10B981',
}

interface SegmentCardProps {
  segment: SegmentKey
  score: number
  answers: Record<string, number>
  questions: Question[]
}

export default function SegmentCard({ segment, score, answers, questions: allQuestions }: SegmentCardProps) {
  const icon = SEGMENT_ICONS[segment]
  const name = SEGMENT_NAMES[segment]
  const color = SEGMENT_COLORS[segment]
  const scoreColor = getScoreColor(score)

  const questions = allQuestions.filter((q) => q.segment === segment)

  const questionScores = questions.map((q) => ({
    text: q.text,
    id: q.id,
    score: answers[q.id] ?? 0,
    label: q.text.length > 60 ? q.text.slice(0, 57) + '…' : q.text,
  }))

  const strengths = questionScores
    .filter((q) => q.score >= 4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)

  const gaps = questionScores
    .filter((q) => q.score > 0 && q.score <= 2)
    .sort((a, b) => a.score - b.score)
    .slice(0, 2)

  const barData = questionScores.map((q, i) => ({
    name: `Q${i + 1}`,
    score: q.score * 20,
    rawScore: q.score,
  }))

  return (
    <div className="bg-[#0f1e35] border border-blue-900/40 rounded-2xl p-6 report-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{name}</h3>
            <div className="text-sm" style={{ color: scoreColor }}>
              {score < 40 ? 'Needs Attention' : score < 60 ? 'Developing' : score < 75 ? 'Progressing' : 'Strong'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black" style={{ color: scoreColor }}>
            {score}
          </div>
          <div className="text-xs text-gray-500">/ 100</div>
        </div>
      </div>

      {/* Score bar */}
      <div className="mb-5">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${score}%`, backgroundColor: scoreColor }}
          />
        </div>
      </div>

      {/* Mini bar chart */}
      <div className="mb-5">
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">Question Scores</p>
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={barData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barGap={2}>
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} hide />
            <Bar dataKey="score" radius={[3, 3, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.rawScore === 0 ? '#6B7280' : getScoreColor(entry.rawScore * 20)}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Strengths */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-400">What&apos;s Working</span>
        </div>
        {strengths.length > 0 ? (
          <ul className="space-y-1.5">
            {strengths.map((s) => (
              <li key={s.id} className="text-xs text-gray-300 flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                <span>{s.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500 italic">No areas scored 4 or above yet — keep building!</p>
        )}
      </div>

      {/* Gaps */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-amber-400">Areas for Improvement</span>
        </div>
        {gaps.length > 0 ? (
          <ul className="space-y-1.5">
            {gaps.map((g) => (
              <li key={g.id} className="text-xs text-gray-300 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                <span>{g.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500 italic flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" />
            No critical gaps identified in this segment — great work!
          </p>
        )}
      </div>
    </div>
  )
}
