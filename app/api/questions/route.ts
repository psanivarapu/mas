import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import type { SegmentKey } from '@/lib/types'
import { buildQuestions, parseSegmentFile, questionnaireFileName, SEGMENT_ORDER } from '@/lib/questions'

// Always read the questionnaire files fresh from disk on every request.
export const dynamic = 'force-dynamic'

export async function GET() {
  const sections = {} as Record<SegmentKey, string[]>
  const questionnairesDir = path.join(process.cwd(), 'questionnaires')

  for (const segment of SEGMENT_ORDER) {
    const fileName = questionnaireFileName(segment)
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
