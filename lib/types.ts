export type Domain = 'martech' | 'bfsi'
export type Persona = 'cto' | 'data_scientist' | 'hr'
export type Screen = 'landing' | 'questionnaire' | 'report'
export type Tier = 'bee' | 'elephant' | 'dolphin' | 'unicorn'
export type SegmentKey = 'governance' | 'technology' | 'people' | 'culture'
export type TimeBucket = 'immediate' | 'short' | 'medium' | 'long'
export type Effort = 'Low' | 'Medium' | 'High'

export interface Question {
  id: string
  text: string
  segment: SegmentKey
  globalIndex: number
}

export interface AppState {
  domain: Domain | null
  persona: Persona | null
  currentScreen: Screen
  currentQuestion: number
  answers: Record<string, number>
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
  domain: Domain
  persona: Persona
  answers: Record<string, number>
  segmentScores: Record<SegmentKey, number>
  overallScore: number
  tier: Tier
}

export interface ShareableState {
  domain: Domain
  persona: Persona
  answers: Record<string, number>
}
