export type Division = 'mpi' | 'hli' | 'hcib'
export type FunctionArea = 'support' | 'ops' | 'commercial'
export type Level = 'cxo' | 'senior' | 'exec'
export type Screen = 'landing' | 'context' | 'questionnaire' | 'report'
export type Tier = 'bee' | 'elephant' | 'dolphin' | 'unicorn'
export type SegmentKey = 'governance' | 'technology' | 'people' | 'culture'
export type TimeBucket = 'immediate' | 'short' | 'medium' | 'long'
export type Effort = 'Low' | 'Medium' | 'High'

// Sentinel answer value meaning "Not Applicable / Don't Know" — distinct
// from an unanswered question (absent key) and excluded from scoring averages.
export const NA_VALUE = 0

export interface Question {
  id: string
  text: string
  segment: SegmentKey
  globalIndex: number
}

export interface Registrant {
  name: string
  email: string
  role: string
}

export interface AppState {
  division: Division | null
  functionArea: FunctionArea | null
  level: Level | null
  currentScreen: Screen
  currentQuestion: number
  answers: Record<string, number>
  questions: Question[]
  questionsError: string | null
  registrant: Registrant | null
}

export interface TierConfig {
  tier: Tier
  level: number
  name: string
  emoji: string
  animal: string
  range: [number, number]
  description: string
  gradient: string
  border: string
  bg: string
  text: string
  badge: string
}

export interface SegmentConfig {
  key: SegmentKey
  name: string
  shortName: string
  icon: string
  prefix: string
}

export interface SegmentScore {
  key: SegmentKey
  name: string
  score: number
}

export interface RoadmapItem {
  id: string
  action: string
  owner: string
  outcome: string
  effort: Effort
  bucket: TimeBucket
  questionId: string
  score: number
}

export interface ReportData {
  division: Division
  functionArea: FunctionArea
  level: Level
  answers: Record<string, number>
  segmentScores: Record<SegmentKey, number>
  overallScore: number
  tier: Tier
}

export interface ShareableState {
  division: Division
  functionArea: FunctionArea
  level: Level
  answers: Record<string, number>
}
