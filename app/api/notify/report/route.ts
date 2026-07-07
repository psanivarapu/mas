import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import type { Domain, Persona, SegmentKey } from '@/lib/types'
import { buildQuestions, parseSegmentFile, questionnaireFileName, SEGMENT_ORDER } from '@/lib/questions'
import { buildReportData } from '@/lib/scoring'
import { generateRoadmap } from '@/lib/roadmap'
import { sendReportEmail } from '@/lib/email'
import { renderReportPdf } from '@/lib/pdf'

export const dynamic = 'force-dynamic'

const VALID_DOMAINS: Domain[] = ['martech', 'bfsi']
const VALID_PERSONAS: Persona[] = ['cto', 'data_scientist', 'hr']

export async function POST(request: NextRequest) {
  const { name, email, role, domain, persona, answers } = await request.json()

  if (
    !name ||
    !email ||
    !role ||
    !domain ||
    !persona ||
    !answers ||
    !VALID_DOMAINS.includes(domain) ||
    !VALID_PERSONAS.includes(persona)
  ) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 })
  }

  try {
    // Safe to use in file paths below: domain/persona are checked against a
    // fixed whitelist above, so no user input reaches the filesystem unvalidated.
    const sections = {} as Record<SegmentKey, string[]>
    const questionnairesDir = path.join(process.cwd(), 'questionnaires')
    for (const segment of SEGMENT_ORDER) {
      const fileName = questionnaireFileName(domain, persona, segment)
      const filePath = path.join(questionnairesDir, fileName)
      const raw = fs.readFileSync(filePath, 'utf-8')
      sections[segment] = parseSegmentFile(raw)
    }
    const questions = buildQuestions(sections)

    const report = buildReportData(domain, persona, answers)
    const roadmap = generateRoadmap(answers, domain, persona)

    const pdfBuffer = await renderReportPdf({
      name,
      email,
      role,
      domain,
      persona,
      questions,
      answers,
      report,
      roadmap,
    })

    await sendReportEmail({
      name,
      email,
      role,
      domain,
      persona,
      overallScore: report.overallScore,
      tier: report.tier,
      segmentScores: report.segmentScores,
      pdfBuffer,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Failed to send report email', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
  }
}
