'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Shield, Cpu, Users, Compass, ChevronRight, Sparkles } from 'lucide-react'
import type { Domain, Persona, SegmentKey } from '@/lib/types'
import { getQuestions, SEGMENT_CONFIGS } from '@/lib/questions'

interface QuestionnaireScreenProps {
  domain: Domain
  persona: Persona
  answers: Record<string, number>
  onAnswer: (questionId: string, value: number) => void
  onComplete: () => void
  onBack: () => void
}

const SEGMENT_ICONS: Record<SegmentKey, React.ReactNode> = {
  governance: <Shield className="w-4 h-4" />,
  technology: <Cpu className="w-4 h-4" />,
  people: <Users className="w-4 h-4" />,
  culture: <Compass className="w-4 h-4" />,
}

const SEGMENT_COLORS: Record<SegmentKey, string> = {
  governance: 'from-violet-500 to-purple-600',
  technology: 'from-cyan-500 to-blue-600',
  people: 'from-amber-500 to-orange-600',
  culture: 'from-emerald-500 to-teal-600',
}

const SEGMENT_ACCENT: Record<SegmentKey, string> = {
  governance: 'text-violet-400',
  technology: 'text-cyan-400',
  people: 'text-amber-400',
  culture: 'text-emerald-400',
}

const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly\nDisagree', short: '1' },
  { value: 2, label: 'Disagree', short: '2' },
  { value: 3, label: 'Neutral', short: '3' },
  { value: 4, label: 'Agree', short: '4' },
  { value: 5, label: 'Strongly\nAgree', short: '5' },
]

const PERSONA_LABELS: Record<Persona, string> = {
  cto: 'CTO',
  data_scientist: 'Lead Data Scientist',
  hr: 'HR Lead',
}

const DOMAIN_LABELS: Record<Domain, string> = {
  martech: 'Martech',
  bfsi: 'BFSI',
}

export default function QuestionnaireScreen({
  domain,
  persona,
  answers,
  onAnswer,
  onComplete,
  onBack,
}: QuestionnaireScreenProps) {
  const questions = getQuestions(domain, persona)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const question = questions[currentQuestion]
  const currentSegmentIndex = Math.floor(currentQuestion / 5)
  const currentSegment = SEGMENT_CONFIGS[currentSegmentIndex]
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / 20) * 100
  const currentAnswer = answers[question?.id]
  const isLastQuestion = currentQuestion === 19

  const allAnswered = Object.keys(answers).length === 20

  function navigate(delta: number) {
    const next = currentQuestion + delta
    if (next < 0 || next > 19) return
    setDirection(delta > 0 ? 'forward' : 'backward')
    setAnimating(true)
    setTimeout(() => {
      setCurrentQuestion(next)
      setAnimating(false)
    }, 150)
  }

  function jumpToSegment(segmentIndex: number) {
    const targetQ = segmentIndex * 5
    setDirection(segmentIndex > currentSegmentIndex ? 'forward' : 'backward')
    setAnimating(true)
    setTimeout(() => {
      setCurrentQuestion(targetQ)
      setAnimating(false)
    }, 150)
  }

  function handleAnswer(value: number) {
    if (!question) return
    onAnswer(question.id, value)
    // Auto-advance after a short delay
    if (currentQuestion < 19) {
      setTimeout(() => navigate(1), 350)
    }
  }

  function getSegmentStatus(segIdx: number) {
    const segQuestions = questions.slice(segIdx * 5, segIdx * 5 + 5)
    const answered = segQuestions.filter((q) => answers[q.id] !== undefined).length
    return { answered, total: 5, complete: answered === 5 }
  }

  if (!question) return null

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1628]">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-[#0A1628]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-3">
          {/* Context row */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                {DOMAIN_LABELS[domain]}
              </span>
              <span className="text-gray-600">•</span>
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                {PERSONA_LABELS[persona]}
              </span>
            </div>
            <div className="text-sm text-gray-400 font-medium">
              <span className="text-white font-bold">{currentQuestion + 1}</span>
              <span className="text-gray-600"> / 20</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Segment tabs */}
          <div className="flex gap-1.5 mt-3">
            {SEGMENT_CONFIGS.map((seg, idx) => {
              const status = getSegmentStatus(idx)
              const isActive = idx === currentSegmentIndex
              return (
                <button
                  key={seg.key}
                  onClick={() => jumpToSegment(idx)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${SEGMENT_COLORS[seg.key]} text-white shadow-sm`
                      : status.complete
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/5 text-gray-500 hover:bg-white/8 hover:text-gray-300'
                  }`}
                >
                  <span className="hidden sm:inline">{SEGMENT_ICONS[seg.key]}</span>
                  <span className="truncate">{seg.shortName}</span>
                  {status.complete && !isActive && <span className="text-emerald-400">✓</span>}
                  {!status.complete && !isActive && status.answered > 0 && (
                    <span className="text-gray-600 text-xs">{status.answered}/5</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Question area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Segment badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${SEGMENT_COLORS[currentSegment.key]} text-white text-xs font-semibold`}>
              {SEGMENT_ICONS[currentSegment.key]}
              <span>{currentSegment.name}</span>
            </div>
            <span className="text-xs text-gray-600">
              Q{(currentQuestion % 5) + 1} of 5 in this segment
            </span>
          </div>

          {/* Question card */}
          <div
            className={`transition-all duration-150 ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
          >
            <div className="bg-[#0f1e35] border border-blue-900/40 rounded-2xl p-6 sm:p-8 mb-6 shadow-xl">
              <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">{question.text}</p>
            </div>

            {/* Likert scale */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-gray-600 px-1">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {LIKERT_OPTIONS.map((option) => {
                  const isSelected = currentAnswer === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`likert-btn flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all font-medium ${
                        isSelected
                          ? 'selected border-blue-400 bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/20'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-gray-200'
                      }`}
                    >
                      <span className="text-lg sm:text-xl font-bold">{option.value}</span>
                      <span className="text-xs text-center leading-tight hidden sm:block whitespace-pre-line">
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Answer indicator */}
              <div className="h-5 flex items-center justify-center">
                {currentAnswer && (
                  <p className="text-xs text-blue-400 animate-fade-in">
                    Selected: <span className="font-semibold">{LIKERT_OPTIONS[currentAnswer - 1]?.label.replace('\n', ' ')}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => navigate(-1)}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: 5 }, (_, i) => {
                const qIdx = currentSegmentIndex * 5 + i
                const q = questions[qIdx]
                const isAnswered = q && answers[q.id] !== undefined
                const isCurrent = qIdx === currentQuestion
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setAnimating(true)
                      setTimeout(() => { setCurrentQuestion(qIdx); setAnimating(false) }, 150)
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-blue-400 w-4'
                        : isAnswered
                        ? 'bg-emerald-500'
                        : 'bg-white/20'
                    }`}
                  />
                )
              })}
            </div>

            {isLastQuestion ? (
              <button
                onClick={onComplete}
                disabled={!allAnswered}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  allAnswered
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {allAnswered ? 'View Results' : `${20 - Object.keys(answers).length} left`}
              </button>
            ) : (
              <button
                onClick={() => navigate(1)}
                disabled={currentQuestion === 19}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Completion hint */}
          {allAnswered && !isLastQuestion && (
            <div className="mt-4 text-center">
              <button
                onClick={onComplete}
                className="text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
              >
                All questions answered — view your results
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
