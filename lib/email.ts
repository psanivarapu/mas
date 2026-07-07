import { Resend } from 'resend'
import type { Division, FunctionArea, Level, SegmentKey, Tier } from './types'

const FROM_ADDRESS = 'labs@transformtechx.com'
const NOTIFY_RECIPIENTS = ['labs@transformtechx.com', 'amit@transformtechx.com']

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(apiKey)
}

export async function sendRegistrationEmail(name: string, email: string, role: string): Promise<void> {
  const resend = getClient()
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_RECIPIENTS,
    subject: 'New AI Readiness Assessment started',
    text: [`Name: ${name}`, `Email: ${email}`, `Role: ${role}`].join('\n'),
  })
  if (error) throw new Error(error.message)
}

interface ReportEmailParams {
  name: string
  email: string
  role: string
  division: Division
  functionArea: FunctionArea
  level: Level
  overallScore: number
  tier: Tier
  segmentScores: Record<SegmentKey, number>
  pdfBuffer: Buffer
}

export async function sendReportEmail(params: ReportEmailParams): Promise<void> {
  const resend = getClient()
  const { name, email, role, division, functionArea, level, overallScore, tier, segmentScores, pdfBuffer } = params
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Role: ${role}`,
    `Division: ${division}`,
    `Function: ${functionArea}`,
    `Level: ${level}`,
    `Overall score: ${overallScore}`,
    `Tier: ${tier}`,
    `Governance: ${segmentScores.governance}`,
    `Technology: ${segmentScores.technology}`,
    `People: ${segmentScores.people}`,
    `Culture: ${segmentScores.culture}`,
    '',
    'Full report attached as PDF.',
  ].join('\n')
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_RECIPIENTS,
    subject: 'AI Readiness Assessment completed',
    text,
    attachments: [
      {
        filename: 'ai-readiness-assessment-report.pdf',
        content: pdfBuffer,
      },
    ],
  })
  if (error) throw new Error(error.message)
}
