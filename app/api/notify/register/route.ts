import { NextRequest, NextResponse } from 'next/server'
import { sendRegistrationEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const { name, email, role } = await request.json()

  if (!name || !email || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await sendRegistrationEmail(name, email, role)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Failed to send registration email', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
  }
}
