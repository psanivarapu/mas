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
