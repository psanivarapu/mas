import { NextRequest, NextResponse } from 'next/server'
import { sendReportEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const { name, email, role, division, functionArea, level, overallScore, tier, segmentScores } =
    await request.json()

  if (!name || !email || !role || !division || !functionArea || !level || !segmentScores) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await sendReportEmail({ name, email, role, division, functionArea, level, overallScore, tier, segmentScores })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Failed to send report email', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
  }
}
