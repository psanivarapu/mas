'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { isCompanyEmail, isValidEmailFormat, buildRegistrationMailto } from '@/lib/registration'

interface LandingScreenProps {
  onStart: () => void
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [touched, setTouched] = useState(false)

  const emailValid = isCompanyEmail(email)
  const emailFormatValid = isValidEmailFormat(email)
  const canStart = name.trim().length > 0 && emailValid && role.trim().length > 0

  const handleBegin = () => {
    if (!canStart) {
      setTouched(true)
      return
    }
    window.location.href = buildRegistrationMailto(name.trim(), email.trim(), role.trim())
    onStart()
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

      {/* Nav */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold tracking-tight text-white">
            Transform<span className="text-blue-400">TechX</span>
          </span>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-xs text-gray-500 font-medium">Hong Leong Group</span>
        </div>
        <span className="text-xs font-semibold text-blue-400 bg-blue-500/15 px-3 py-1 rounded-full">
          AI Growth Readiness Assessment
        </span>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="w-full max-w-2xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6 uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            Hong Leong Group · Confidential
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
            Where does your division<br />
            stand on <span className="gradient-text">AI readiness?</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
            20 questions. 12 minutes. A real score across Governance, Technology, People, and Culture — so Hong
            Leong Group has data, not assumptions, when building its AI roadmap.
          </p>

          <div className="flex items-center justify-center gap-10 mb-10 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">20</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">4</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Dimensions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">12</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Minutes</div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto text-left mb-8 space-y-3">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
              />
            </div>
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
            <div>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your role / title"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/60"
              />
            </div>
          </div>

          <button
            onClick={handleBegin}
            className={`py-4 px-9 font-bold text-lg rounded-2xl transition-all duration-200 inline-flex items-center justify-center gap-3 shadow-lg glow-blue ${
              canStart
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-600/25 hover:shadow-blue-500/35'
                : 'bg-white/10 text-gray-400 shadow-none cursor-not-allowed'
            }`}
          >
            Begin Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">
            Your individual responses are confidential. Only group-level results are shared with leadership.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 flex items-center justify-between flex-wrap gap-2 border-t border-white/5">
        <span className="text-xs text-gray-600">
          Powered by <span className="text-gray-400 font-medium">TransformTechX</span> · AI Growth Readiness
          Framework
        </span>
        <span className="text-xs text-gray-700">Confidential · Hong Leong Group Internal Use Only</span>
      </footer>
    </div>
  )
}
