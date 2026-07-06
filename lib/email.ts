import { Resend } from 'resend'
import type { Domain, Persona, SegmentKey, Tier } from './types'

const FROM_ADDRESS = 'labs@transformtechx.com'
const NOTIFY_RECIPIENTS = ['labs@transformtechx.com', 'amit@transformtechx.com']

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')
  return new Resend(apiKey)
}

export async function sendRegistrationEmail(name: string, email: string, role: string): Promise<void> {
  const resend = getClient()
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_RECIPIENTS,
    subject: 'New Assessment started',
    text: [`Name: ${name}`, `Email: ${email}`, `Role: ${role}`].join('\n'),
  })
  if (error) throw new Error(error.message)
}

interface ReportEmailParams {
  name: string
  email: string
  role: string
  domain: Domain
  persona: Persona
  overallScore: number
  tier: Tier
  segmentScores: Record<SegmentKey, number>
}

export async function sendReportEmail(params: ReportEmailParams): Promise<void> {
  const resend = getClient()
  const { name, email, role, domain, persona, overallScore, tier, segmentScores } = params
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Role: ${role}`,
    `Domain: ${domain}`,
    `Persona: ${persona}`,
    `Overall score: ${overallScore}`,
    `Tier: ${tier}`,
    `Governance: ${segmentScores.governance}`,
    `Technology: ${segmentScores.technology}`,
    `People: ${segmentScores.people}`,
    `Culture: ${segmentScores.culture}`,
  ].join('\n')
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: NOTIFY_RECIPIENTS,
    subject: 'Assessment completed',
    text,
  })
  if (error) throw new Error(error.message)
}
