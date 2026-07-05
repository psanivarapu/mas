'use client'

import { useState } from 'react'
import { ArrowRight, ShoppingCart, Building2, BrainCircuit, FlaskConical, UserCheck, ChevronRight, Sparkles } from 'lucide-react'
import type { Domain, Persona } from '@/lib/types'
import { isCompanyEmail, isValidEmailFormat, buildRegistrationMailto } from '@/lib/registration'

interface LandingScreenProps {
  onStart: (domain: Domain, persona: Persona) => void
}

const DOMAINS = [
  {
    id: 'martech' as Domain,
    label: 'Martech',
    full: 'Marketing Technology',
    icon: <ShoppingCart className="w-6 h-6" />,
    description: 'CRM, CDP, ad platforms, campaign analytics, customer data',
    color: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/40',
    hover: 'hover:border-blue-400/70',
    selected: 'border-blue-400 bg-blue-500/10',
  },
  {
    id: 'bfsi' as Domain,
    label: 'BFSI',
    full: 'Banking, Financial Services & Insurance',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Risk, fraud, credit, regulatory AI, insurance analytics',
    color: 'from-violet-500 to-purple-500',
    border: 'border-violet-500/40',
    hover: 'hover:border-violet-400/70',
    selected: 'border-violet-400 bg-violet-500/10',
  },
]

const PERSONAS = [
  {
    id: 'cto' as Persona,
    label: 'CTO',
    full: 'Chief Technology Officer',
    icon: <BrainCircuit className="w-5 h-5" />,
    description: 'Platform strategy, AI infrastructure, technical governance',
    focus: 'Strategic & architectural lens',
  },
  {
    id: 'data_scientist' as Persona,
    label: 'Lead Data Scientist',
    full: 'Lead Data Scientist',
    icon: <FlaskConical className="w-5 h-5" />,
    description: 'MLOps, model development, GenAI experimentation, team skills',
    focus: 'Technical & practitioner lens',
  },
  {
    id: 'hr' as Persona,
    label: 'HR Lead',
    full: 'HR / People Lead',
    icon: <UserCheck className="w-5 h-5" />,
    description: 'AI upskilling, talent strategy, change management, culture',
    focus: 'People & organizational lens',
  },
]

export default function LandingScreen({ onStart }: LandingScreenProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [touched, setTouched] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

  const emailValid = isCompanyEmail(email)
  const emailFormatValid = isValidEmailFormat(email)
  const detailsValid = name.trim().length > 0 && emailValid && role.trim().length > 0
  const canStart = detailsValid && selectedDomain !== null && selectedPersona !== null

  const handleBegin = () => {
    if (!detailsValid) {
      setTouched(true)
      return
    }
    if (!canStart) return
    window.location.href = buildRegistrationMailto(
      name.trim(),
      email.trim(),
      role.trim(),
      `Domain: ${selectedDomain}\nPersona: ${selectedPersona}`
    )
    onStart(selectedDomain!, selectedPersona!)
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
        <div className="w-full max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-14 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-6 uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Free Assessment
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
              GenAI &amp; Analytics<br />
              <span className="gradient-text">Maturity Index</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              Understand where your organization stands. Know where to go next.
            </p>
          </div>

          <div className="space-y-8 animate-slide-up">
            {/* Step 1: Your Details */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  1
                </div>
                <h2 className="text-lg font-bold text-white">Your Details</h2>
              </div>
              <div className="space-y-3">
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
              </div>
            </div>

            {/* Step 2: Domain */}
            <div className={`transition-all duration-300 ${detailsValid ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${detailsValid ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                  2
                </div>
                <h2 className="text-lg font-bold text-white">Select your Business Domain</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DOMAINS.map((domain) => {
                  const isSelected = selectedDomain === domain.id
                  return (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 group ${
                        isSelected
                          ? domain.selected
                          : `border-white/10 bg-white/3 ${domain.hover} hover:bg-white/5`
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div
                            className={`w-5 h-5 rounded-full bg-gradient-to-br ${domain.color} flex items-center justify-center`}
                          >
                            <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${domain.color} text-white`}>
                          {domain.icon}
                        </div>
                        <div>
                          <div className="font-bold text-white text-base">{domain.label}</div>
                          <div className="text-xs text-gray-500">{domain.full}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{domain.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3: Persona */}
            <div className={`transition-all duration-300 ${detailsValid && selectedDomain ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${selectedDomain ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                  3
                </div>
                <h2 className="text-lg font-bold text-white">Select your Persona</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PERSONAS.map((persona) => {
                  const isSelected = selectedPersona === persona.id
                  return (
                    <button
                      key={persona.id}
                      onClick={() => setSelectedPersona(persona.id)}
                      disabled={!selectedDomain}
                      className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-400 bg-blue-500/10'
                          : 'border-white/10 bg-white/3 hover:border-blue-500/40 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'}`}
                        >
                          {persona.icon}
                        </div>
                        <div className="font-semibold text-white text-sm">{persona.label}</div>
                      </div>
                      <p className="text-xs text-gray-400 mb-1.5">{persona.description}</p>
                      <p className="text-xs font-medium text-blue-400">{persona.focus}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={handleBegin}
                disabled={!canStart}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 disabled:opacity-40 disabled:cursor-not-allowed glow-blue"
              >
                Begin Assessment
                <ArrowRight className="w-5 h-5" />
              </button>
              {canStart && (
                <p className="text-center text-xs text-gray-500 mt-3">
                  A few quick questions across 4 dimensions • Results in ~5 minutes
                </p>
              )}
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
