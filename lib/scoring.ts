import type { Division, FunctionArea, Level, SegmentKey, Tier, ReportData } from './types'

const SEGMENT_PREFIXES: Record<SegmentKey, string> = {
  governance: 'gov',
  technology: 'tech',
  people: 'ppl',
  culture: 'clt',
}

export function computeSegmentScore(answers: Record<string, number>, segment: SegmentKey): number {
  const prefix = SEGMENT_PREFIXES[segment]
  const scores: number[] = []
  for (let i = 1; i <= 5; i++) {
    const val = answers[`${prefix}_${i}`]
    if (val !== undefined && val > 0) scores.push(val)
  }
  if (scores.length === 0) return 0
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return Math.round(avg * 20)
}

export function computeAllSegmentScores(answers: Record<string, number>): Record<SegmentKey, number> {
  return {
    governance: computeSegmentScore(answers, 'governance'),
    technology: computeSegmentScore(answers, 'technology'),
    people: computeSegmentScore(answers, 'people'),
    culture: computeSegmentScore(answers, 'culture'),
  }
}

export function computeOverallScore(segmentScores: Record<SegmentKey, number>): number {
  const vals = Object.values(segmentScores)
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
}

export function getTier(score: number): Tier {
  if (score <= 25) return 'bee'
  if (score <= 50) return 'elephant'
  if (score <= 75) return 'dolphin'
  return 'unicorn'
}

export function buildReportData(
  division: Division,
  functionArea: FunctionArea,
  level: Level,
  answers: Record<string, number>
): ReportData {
  const segmentScores = computeAllSegmentScores(answers)
  const overallScore = computeOverallScore(segmentScores)
  const tier = getTier(overallScore)
  return { division, functionArea, level, answers, segmentScores, overallScore, tier }
}

export function getScoreColor(score: number): string {
  if (score < 40) return '#EF4444'
  if (score < 60) return '#F59E0B'
  return '#10B981'
}

export function getScoreLabel(score: number): string {
  if (score < 40) return 'Needs Attention'
  if (score < 60) return 'Developing'
  if (score < 75) return 'Progressing'
  return 'Strong'
}

export function getAnswerLabel(val: number): string {
  if (val === 0) return "Not Applicable / Don't Know"
  const labels: Record<number, string> = {
    1: 'Strongly Disagree',
    2: 'Disagree',
    3: 'Neutral',
    4: 'Agree',
    5: 'Strongly Agree',
  }
  return labels[val] ?? ''
}
