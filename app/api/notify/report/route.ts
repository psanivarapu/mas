import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import type { SegmentKey } from '@/lib/types'
import { buildQuestions, parseSegmentFile, questionnaireFileName, SEGMENT_ORDER } from '@/lib/questions'
import { buildReportData } from '@/lib/scoring'
import { generateRoadmap } from '@/lib/roadmap'
import { sendReportEmail } from '@/lib/email'
import { renderReportPdf } from '@/lib/pdf'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const { name, email, role, division, functionArea, level, answers } = await request.json()

  if (!name || !email || !role || !division || !functionArea || !level || !answers) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const sections = {} as Record<SegmentKey, string[]>
    const questionnairesDir = path.join(process.cwd(), 'questionnaires')
    for (const segment of SEGMENT_ORDER) {
      const fileName = questionnaireFileName(segment)
      const filePath = path.join(questionnairesDir, fileName)
      const raw = fs.readFileSync(filePath, 'utf-8')
      sections[segment] = parseSegmentFile(raw)
    }
    const questions = buildQuestions(sections)

    const report = buildReportData(division, functionArea, level, answers)
    const roadmap = generateRoadmap(answers)

    const pdfBuffer = await renderReportPdf({
      name,
      email,
      role,
      division,
      functionArea,
      level,
      questions,
      answers,
      report,
      roadmap,
    })

    await sendReportEmail({
      name,
      email,
      role,
      division,
      functionArea,
      level,
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
