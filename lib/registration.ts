const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BLOCKED_DOMAINS = ['gmail.com']

export function isValidEmailFormat(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

export function isCompanyEmail(email: string): boolean {
  if (!isValidEmailFormat(email)) return false
  const domain = email.trim().split('@')[1]?.toLowerCase()
  return !!domain && !BLOCKED_DOMAINS.includes(domain)
}

const NOTIFY_RECIPIENTS = ['labs@transformtechx.com', 'amit@transformtechx.com']

export function buildRegistrationMailto(name: string, email: string, role: string, context?: string): string {
  const subject = 'New AI Readiness Assessment started'
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Role: ${role}`,
    ...(context ? [context] : []),
  ]
  const body = bodyLines.join('\n')
  return `mailto:${NOTIFY_RECIPIENTS.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
