import { Resend } from 'resend'
import type { CompanySelection, BusinessFunction, Persona, SegmentKey, Tier } from './types'
import { companyLabel, BUSINESS_FUNCTION_LABELS, PERSONA_LABELS } from './context'

const FROM_ADDRESS = 'labs@transformtechx.com'
const NOTIFY_RECIPIENTS = ['labs@transformtechx.com', 'amit@transformtechx.com']
const REPORT_NOTIFY_RECIPIENTS = ['labs@transformtechx.com', 'amit@transformtechx.com', 'ikhwankhairun@hli.com.my']

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
  company: CompanySelection
  businessFunction: BusinessFunction
  persona: Persona
  overallScore: number
  tier: Tier
  segmentScores: Record<SegmentKey, number>
  pdfBuffer: Buffer
}

export async function sendReportEmail(params: ReportEmailParams): Promise<void> {
  const resend = getClient()
  const { name, email, role, company, businessFunction, persona, overallScore, tier, segmentScores, pdfBuffer } = params
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Role: ${role}`,
    `Company: ${companyLabel(company)}`,
    `Business Function: ${BUSINESS_FUNCTION_LABELS[businessFunction]}`,
    `Persona: ${PERSONA_LABELS[persona]}`,
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
    to: REPORT_NOTIFY_RECIPIENTS,
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
