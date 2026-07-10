'use client'

import { useRef } from 'react'
import {
  Download,
  Share2,
  RefreshCw,
  Shield,
  Cpu,
  Users,
  Compass,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
} from 'lucide-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { CompanySelection, BusinessFunction, Persona, SegmentKey, Question } from '@/lib/types'
import { buildReportData } from '@/lib/scoring'
import { generateRoadmap } from '@/lib/roadmap'
import { TIER_CONFIGS } from '@/components/TierBadge'
import SegmentCard from '@/components/SegmentCard'
import RoadmapTimeline from '@/components/RoadmapTimeline'
import { companyLabel, BUSINESS_FUNCTION_LABELS, PERSONA_LABELS } from '@/lib/context'

const RadarChartComponent = dynamic(() => import('@/components/RadarChartComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-80 flex items-center justify-center">
      <div className="text-gray-500 text-sm">Loading chart…</div>
    </div>
  ),
})

interface ReportScreenProps {
  company: CompanySelection
  businessFunction: BusinessFunction
  persona: Persona
  questions: Question[]
  answers: Record<string, number>
  onRetake: () => void
}

const SEGMENT_NAMES: Record<SegmentKey, string> = {
  governance: 'Data Governance',
  technology: 'Technology',
  people: 'People & Skills',
  culture: 'Culture & Strategy',
}

const SEGMENT_ICONS: Record<SegmentKey, React.ReactNode> = {
  governance: <Shield className="w-4 h-4" />,
  technology: <Cpu className="w-4 h-4" />,
  people: <Users className="w-4 h-4" />,
  culture: <Compass className="w-4 h-4" />,
}

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const filled = (score / 100) * circumference
  const color = score < 40 ? '#EF4444' : score < 60 ? '#F59E0B' : '#10B981'

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#1e3a5f" strokeWidth={8} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={8}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - filled}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
    </svg>
  )
}

export default function ReportScreen({ company, businessFunction, persona, questions, answers, onRetake }: ReportScreenProps) {
  const [copied, setCopied] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const report = buildReportData(company, businessFunction, persona, answers)
  const tierConfig = TIER_CONFIGS[report.tier]
  const roadmap = generateRoadmap(answers)

  // Top 3 strengths and gaps across all questions
  const questionScores = questions.map((q) => ({
    id: q.id,
    text: q.text,
    segment: q.segment,
    score: answers[q.id] ?? 0,
  }))

  // Exclude NA/Don't Know (score 0) answers — they aren't real scores and
  // shouldn't surface as either a strength or a gap.
  const scorableQuestions = questionScores.filter((q) => q.score > 0)
  const topStrengths = [...scorableQuestions].sort((a, b) => b.score - a.score).slice(0, 3)
  const topGaps = [...scorableQuestions].sort((a, b) => a.score - b.score).slice(0, 3)

  const segments: SegmentKey[] = ['governance', 'technology', 'people', 'culture']

  function handleShare() {
    try {
      const shareState = { company, businessFunction, persona, answers }
      const encoded = btoa(encodeURIComponent(JSON.stringify(shareState)))
      const url = `${window.location.origin}${window.location.pathname}?state=${encoded}`
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      })
    } catch {
      alert('Could not copy share link.')
    }
  }

  function handlePrint() {
    window.print()
  }

  const radarData = {
    governance: report.segmentScores.governance,
    technology: report.segmentScores.technology,
    people: report.segmentScores.people,
    culture: report.segmentScores.culture,
  }

  return (
    <div className="min-h-screen bg-[#0A1628]" ref={reportRef}>
      {/* Action bar - no-print */}
      <div className="no-print sticky top-0 z-20 bg-[#0A1628]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight hidden sm:inline">
              AI Growth Readiness Assessment
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRetake}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Retake</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 text-sm font-medium transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        {/* ─── SECTION A: Maturity Overview ─── */}
        <section>
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/5" />
            <span>Section A — Maturity Overview</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Hero card */}
            <div
              className={`relative overflow-hidden rounded-3xl border-2 ${tierConfig.border} p-8 flex flex-col justify-between`}
              style={{
                background: `linear-gradient(135deg, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.90) 100%)`,
              }}
            >
              {/* Background gradient blob */}
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${tierConfig.gradient} pointer-events-none`}
              />

              <div className="relative">
                {/* Context tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {companyLabel(company)}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {BUSINESS_FUNCTION_LABELS[businessFunction]}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {PERSONA_LABELS[persona]}
                  </span>
                </div>

                {/* Animal + score */}
                <div className="flex items-center gap-6 mb-6">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tierConfig.gradient} flex items-center justify-center text-4xl shadow-2xl`}
                  >
                    {tierConfig.emoji}
                  </div>
                  <div>
                    <div className={`text-5xl font-black ${tierConfig.textColor}`}>
                      {report.overallScore}
                    </div>
                    <div className="text-gray-500 text-sm">Overall Score / 100</div>
                  </div>
                </div>

                <h2 className={`text-2xl font-black mb-2 ${tierConfig.textColor}`}>
                  {tierConfig.name}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">{tierConfig.description}</p>
              </div>

              {/* Score bars */}
              <div className="relative mt-6 space-y-3">
                {segments.map((seg) => {
                  const s = report.segmentScores[seg]
                  const color = s < 40 ? '#EF4444' : s < 60 ? '#F59E0B' : '#10B981'
                  return (
                    <div key={seg}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span style={{ color }}>{SEGMENT_ICONS[seg]}</span>
                          <span>{SEGMENT_NAMES[seg]}</span>
                        </div>
                        <span className="text-xs font-bold" style={{ color }}>
                          {s}
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${s}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Radar chart */}
            <div className="bg-[#0f1e35] border border-blue-900/40 rounded-3xl p-6 flex flex-col">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Segment Radar
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <RadarChartComponent segmentScores={radarData} />
              </div>
              {/* Score legend */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {segments.map((seg) => {
                  const s = report.segmentScores[seg]
                  const color = s < 40 ? '#EF4444' : s < 60 ? '#F59E0B' : '#10B981'
                  return (
                    <div key={seg} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-xs text-gray-400 truncate">{SEGMENT_NAMES[seg]}</span>
                      <span className="text-xs font-bold ml-auto" style={{ color }}>
                        {s}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION B: Segment Deep Dives ─── */}
        <section>
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/5" />
            <span>Section B — Segment Deep Dives</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {segments.map((seg) => (
              <SegmentCard
                key={seg}
                segment={seg}
                score={report.segmentScores[seg]}
                answers={answers}
                questions={questions}
              />
            ))}
          </div>
        </section>

        {/* ─── SECTION C: Strengths & Gaps ─── */}
        <section>
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/5" />
            <span>Section C — Overall Strengths &amp; Gaps</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Strengths */}
            <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-300">Top Strengths</h3>
                  <p className="text-xs text-gray-500">Highest scoring areas across all dimensions</p>
                </div>
              </div>
              <div className="space-y-4">
                {topStrengths.map((item, idx) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {SEGMENT_NAMES[item.segment]}
                        </span>
                        <span className="text-xs font-bold text-emerald-400">
                          {item.score}/5 ({item.score * 20}/100)
                        </span>
                      </div>
                      <p className="text-sm text-gray-200 leading-snug">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gaps */}
            <div className="bg-red-950/40 border border-red-800/40 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-red-300">Top Priority Gaps</h3>
                  <p className="text-xs text-gray-500">Lowest scoring areas requiring immediate attention</p>
                </div>
              </div>
              <div className="space-y-4">
                {topGaps.map((item, idx) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {SEGMENT_NAMES[item.segment]}
                        </span>
                        <span className="text-xs font-bold text-red-400">
                          {item.score}/5 ({item.score * 20}/100)
                        </span>
                      </div>
                      <p className="text-sm text-gray-200 leading-snug">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION D: Improvement Roadmap ─── */}
        <section>
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/5" />
            <span>Section D — Improvement Roadmap</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-1">Your AI Readiness Roadmap</h2>
            <p className="text-sm text-gray-400">
              Actions are prioritized by your lowest-scoring areas. Items in the Immediate and Short Term buckets
              represent the highest-leverage opportunities for a{' '}
              <span className="text-blue-300 font-medium">{PERSONA_LABELS[persona]}</span> in{' '}
              <span className="text-blue-300 font-medium">{BUSINESS_FUNCTION_LABELS[businessFunction]}</span> at{' '}
              <span className="text-blue-300 font-medium">{companyLabel(company)}</span>.
            </p>
          </div>
          <RoadmapTimeline roadmap={roadmap} />
        </section>

        {/* ─── SECTION E: Next Steps ─── */}
        <section className="no-print">
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-white/5" />
            <span>Section E — Next Steps</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="bg-gradient-to-br from-[#0f1e35] to-[#0A1628] border border-blue-900/40 rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className={`text-4xl mb-3`}>{tierConfig.emoji}</div>
              <h2 className="text-2xl font-black text-white mb-2">
                You&apos;re a{' '}
                <span className={tierConfig.textColor}>{tierConfig.animal}</span> — Level {tierConfig.level}
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto text-sm leading-relaxed">
                {tierConfig.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={handlePrint}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/20 group"
              >
                <Download className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-sm">Download Report</div>
                  <div className="text-xs text-blue-200 mt-0.5">Save as PDF</div>
                </div>
              </button>

              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all group"
              >
                {copied ? (
                  <>
                    <Check className="w-7 h-7 text-emerald-400" />
                    <div>
                      <div className="font-bold text-sm text-emerald-400">Link Copied!</div>
                      <div className="text-xs text-gray-400 mt-0.5">Share with your team</div>
                    </div>
                  </>
                ) : (
                  <>
                    <Copy className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-bold text-sm">Share Results</div>
                      <div className="text-xs text-gray-400 mt-0.5">Copy shareable link</div>
                    </div>
                  </>
                )}
              </button>

              <button
                onClick={onRetake}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all group"
              >
                <RefreshCw className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-sm">Retake Assessment</div>
                  <div className="text-xs text-gray-400 mt-0.5">Try a different company, function, or persona</div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-white/5">
          <p className="text-xs text-gray-600">
            Powered by TransformTechX · AI Growth Readiness Framework · Confidential · Hong Leong Group Internal Use Only
          </p>
        </footer>
      </div>
    </div>
  )
}
