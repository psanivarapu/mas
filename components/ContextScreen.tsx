'use client'

import { useState } from 'react'
import { ArrowRight, ShoppingCart, Building2, BrainCircuit, FlaskConical, UserCheck, ChevronRight, Sparkles } from 'lucide-react'
import type { Domain, Persona } from '@/lib/types'

interface ContextScreenProps {
  onSubmit: (domain: Domain, persona: Persona) => void
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

export default function ContextScreen({ onSubmit }: ContextScreenProps) {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

  const canStart = selectedDomain !== null && selectedPersona !== null

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
          <span className="font-bold text-white tracking-tight">AI Growth Readiness and Maturity Index</span>
        </div>
        <div className="text-xs text-gray-500">Quick assessment • ~5 mins</div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight tracking-tight">
              Tell us about your <span className="gradient-text">context</span>
            </h1>
            <p className="text-gray-400">A few quick questions across 4 dimensions • Results in ~5 minutes</p>
          </div>

          <div className="space-y-8 animate-slide-up">
            {/* Step 1: Domain */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  1
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
                          : `border-white/10 bg-white/5 ${domain.hover} hover:bg-white/10`
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

            {/* Step 2: Persona */}
            <div className={`transition-all duration-300 ${selectedDomain ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${selectedDomain ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                  2
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
                          : 'border-white/10 bg-white/5 hover:border-blue-500/40 hover:bg-white/10'
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
                onClick={() => canStart && onSubmit(selectedDomain!, selectedPersona!)}
                disabled={!canStart}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 disabled:opacity-40 disabled:cursor-not-allowed glow-blue"
              >
                Begin Assessment
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
