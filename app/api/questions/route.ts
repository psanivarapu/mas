import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import type { Domain, Persona, SegmentKey } from '@/lib/types'
import { buildQuestions, parseSegmentFile, questionnaireFileName, SEGMENT_ORDER } from '@/lib/questions'

// Always read the questionnaire files fresh from disk on every request.
export const dynamic = 'force-dynamic'

const VALID_DOMAINS: Domain[] = ['martech', 'bfsi']
const VALID_PERSONAS: Persona[] = ['cto', 'data_scientist', 'hr']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const domainParam = searchParams.get('domain')
  const personaParam = searchParams.get('persona')

  if (
    !domainParam ||
    !personaParam ||
    !VALID_DOMAINS.includes(domainParam as Domain) ||
    !VALID_PERSONAS.includes(personaParam as Persona)
  ) {
    return NextResponse.json({ error: 'Invalid domain or persona' }, { status: 400 })
  }

  // Safe to use in file paths below: both values are checked against a fixed
  // whitelist above, so no user input reaches the filesystem unvalidated.
  const domain = domainParam as Domain
  const persona = personaParam as Persona

  const sections = {} as Record<SegmentKey, string[]>
  const questionnairesDir = path.join(process.cwd(), 'questionnaires')

  for (const segment of SEGMENT_ORDER) {
    const fileName = questionnaireFileName(domain, persona, segment)
    const filePath = path.join(questionnairesDir, fileName)

    let raw: string
    try {
      raw = fs.readFileSync(filePath, 'utf-8')
    } catch {
      return NextResponse.json({ error: `Questionnaire file not found: ${fileName}` }, { status: 404 })
    }

    sections[segment] = parseSegmentFile(raw)
  }

  const questions = buildQuestions(sections)

  return NextResponse.json({ questions })
}
