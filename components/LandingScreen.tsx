'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { isCompanyEmail, isValidEmailFormat, buildRegistrationMailto } from '@/lib/registration'

interface LandingScreenProps {
  onProceed: (name: string, email: string, role: string) => void
}

export default function LandingScreen({ onProceed }: LandingScreenProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [touched, setTouched] = useState(false)

  const emailValid = isCompanyEmail(email)
  const emailFormatValid = isValidEmailFormat(email)
  const detailsValid = name.trim().length > 0 && emailValid && role.trim().length > 0

  const handleProceed = () => {
    if (!detailsValid) {
      setTouched(true)
      return
    }
    window.location.href = buildRegistrationMailto(name.trim(), email.trim(), role.trim())
    onProceed(name.trim(), email.trim(), role.trim())
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">GenAI Maturity Index</span>
        </div>
        <div className="text-xs text-gray-500">Quick assessment • ~5 mins</div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Hero */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Free Assessment
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
              GenAI &amp; Analytics<br />
              <span className="gradient-text">Maturity Index</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              Understand where your organization stands. Know where to go next.
            </p>
          </div>

          <div className="space-y-3 animate-slide-up">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
            />
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="Company email address"
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder:text-gray-500 focus:outline-none ${
                  touched && email.length > 0 && !emailValid
                    ? 'border-red-500/60 focus:border-red-400/70'
                    : 'border-white/10 focus:border-blue-400/60'
                }`}
              />
              {touched && email.length > 0 && !emailValid && (
                <p className="text-xs text-red-400 mt-1.5">
                  {emailFormatValid ? 'Please use your company email address, not a personal gmail.com address.' : 'Enter a valid email address.'}
                </p>
              )}
            </div>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Your role / title"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
            />

            <div className="pt-2">
              <button
                onClick={handleProceed}
                disabled={!detailsValid}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 disabled:opacity-40 disabled:cursor-not-allowed glow-blue"
              >
                Proceed
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 text-center border-t border-white/5">
        <p className="text-xs text-gray-600">
          All responses are processed locally. No data is sent to any server.
        </p>
      </footer>
    </div>
  )
}
