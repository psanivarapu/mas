import type { Domain, Persona, SegmentKey, Question } from './types'

const SEGMENT_ORDER: SegmentKey[] = ['governance', 'technology', 'people', 'culture']
const SEGMENT_PREFIXES: Record<SegmentKey, string> = {
  governance: 'gov',
  technology: 'tech',
  people: 'ppl',
  culture: 'clt',
}

export function questionnaireFileName(domain: Domain, persona: Persona, segment: SegmentKey): string {
  return `${domain}_${persona}_${segment}.txt`
}

/**
 * Parses a single segment's questionnaire file: one question per line,
 * blank lines and lines starting with "#" (comments) are ignored.
 */
export function parseSegmentFile(raw: string): string[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
}

export function buildQuestions(sections: Record<SegmentKey, string[]>): Question[] {
  const questions: Question[] = []
  let globalIndex = 0

  for (const segment of SEGMENT_ORDER) {
    const prefix = SEGMENT_PREFIXES[segment]
    sections[segment].forEach((text, idx) => {
      questions.push({
        id: `${prefix}_${idx + 1}`,
        text,
        segment,
        globalIndex: globalIndex++,
      })
    })
  }

  return questions
}

/**
 * Client-side fetch of the full question set for a domain/persona, sourced
 * live from the /questionnaires text files via the /api/questions route.
 * Always reflects the current file contents on disk (no caching).
 */
export async function fetchQuestions(domain: Domain, persona: Persona): Promise<Question[]> {
  const res = await fetch(`/api/questions?domain=${domain}&persona=${persona}`, { cache: 'no-store' })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? `Failed to load questionnaire (${res.status})`)
  }
  const data = (await res.json()) as { questions: Question[] }
  return data.questions
}

export const SEGMENT_CONFIGS = [
  { key: 'governance' as SegmentKey, name: 'Data Governance', shortName: 'Governance', prefix: 'gov' },
  { key: 'technology' as SegmentKey, name: 'Technology', shortName: 'Technology', prefix: 'tech' },
  { key: 'people' as SegmentKey, name: 'People & Skills', shortName: 'People', prefix: 'ppl' },
  { key: 'culture' as SegmentKey, name: 'Culture & Strategy', shortName: 'Culture', prefix: 'clt' },
]

export { SEGMENT_ORDER, SEGMENT_PREFIXES }
