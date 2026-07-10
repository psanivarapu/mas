'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import type { MainCompany, Subsidiary, BusinessFunction, Persona, CompanySelection } from '@/lib/types'
import { MAIN_COMPANIES, SUBSIDIARIES_BY_COMPANY, BUSINESS_FUNCTIONS, PERSONAS } from '@/lib/context'

interface ContextScreenProps {
  onSubmit: (company: CompanySelection, businessFunction: BusinessFunction, persona: Persona) => void
}

const SELECT_CLASSES =
  'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400/60 disabled:opacity-40 disabled:cursor-not-allowed appearance-none'

function StepLabel({ num, title, done }: { num: number; title: string; done: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
          done ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        {done ? <Check className="w-3.5 h-3.5" /> : num}
      </div>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      {done && <span className="text-xs font-semibold text-emerald-400 ml-auto">Selected</span>}
    </div>
  )
}

export default function ContextScreen({ onSubmit }: ContextScreenProps) {
  const [mainCompany, setMainCompany] = useState<MainCompany | null>(null)
  const [subsidiary, setSubsidiary] = useState<Subsidiary | null>(null)
  const [businessFunction, setBusinessFunction] = useState<BusinessFunction | null>(null)
  const [persona, setPersona] = useState<Persona | null>(null)

  const availableSubsidiaries = mainCompany ? SUBSIDIARIES_BY_COMPANY[mainCompany] : []
  const needsSubsidiary = availableSubsidiaries.length > 0
  const companyComplete = mainCompany !== null && (!needsSubsidiary || subsidiary !== null)
  const functionComplete = businessFunction !== null
  const canStart = companyComplete && functionComplete && persona !== null

  function handleMainCompanyChange(value: string) {
    setMainCompany((value || null) as MainCompany | null)
    setSubsidiary(null)
  }

  function handleSubmit() {
    if (!mainCompany || !businessFunction || !persona || !canStart) return
    const company: CompanySelection = { mainCompany, subsidiary }
    onSubmit(company, businessFunction, persona)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5">
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

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <h1 className="text-2xl sm:text-3xl font-black text-white text-center mb-2">Select your context</h1>
        <p className="text-sm text-gray-500 text-center mb-10">
          Your answers will be tailored to your company, business function, and persona.
        </p>

        {/* Step 1: Company */}
        <div className="mb-8">
          <StepLabel num={1} title="Select your Company" done={companyComplete} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Company
              </label>
              <select
                value={mainCompany ?? ''}
                onChange={(e) => handleMainCompanyChange(e.target.value)}
                className={SELECT_CLASSES}
              >
                <option value="" disabled>
                  Select your company
                </option>
                {MAIN_COMPANIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Subsidiary
              </label>
              <select
                value={subsidiary ?? ''}
                onChange={(e) => setSubsidiary((e.target.value || null) as Subsidiary | null)}
                disabled={!needsSubsidiary}
                className={SELECT_CLASSES}
              >
                <option value="" disabled>
                  {needsSubsidiary ? 'Select your subsidiary' : 'Not applicable'}
                </option>
                {availableSubsidiaries.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/5 mb-8" />

        {/* Step 2: Business Function */}
        <div className={`mb-8 transition-opacity duration-300 ${companyComplete ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <StepLabel num={2} title="Select your Business Function" done={functionComplete} />
          <select
            value={businessFunction ?? ''}
            onChange={(e) => setBusinessFunction((e.target.value || null) as BusinessFunction | null)}
            disabled={!companyComplete}
            className={SELECT_CLASSES}
          >
            <option value="" disabled>
              Select your business function
            </option>
            {BUSINESS_FUNCTIONS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="h-px bg-white/5 mb-8" />

        {/* Step 3: Persona */}
        <div className={`mb-10 transition-opacity duration-300 ${functionComplete ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <StepLabel num={3} title="Select your Persona" done={persona !== null} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PERSONAS.map((p) => {
              const isSelected = persona === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  disabled={!functionComplete}
                  className={`text-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-400 bg-blue-500/10'
                      : 'border-white/10 bg-white/3 hover:border-blue-500/40 hover:bg-white/5'
                  }`}
                >
                  <div className="font-bold text-white text-sm">{p.name}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-opacity duration-300 ${canStart ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <button
            onClick={handleSubmit}
            disabled={!canStart}
            className="py-3.5 px-8 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl transition-all duration-200 inline-flex items-center gap-2 shadow-lg shadow-blue-600/25"
          >
            Begin Assessment
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-gray-500 mt-3">20 questions · your answers are confidential</p>
        </div>
      </main>

      <footer className="py-4 px-6 flex items-center justify-between flex-wrap gap-2 border-t border-white/5">
        <span className="text-xs text-gray-600">
          Powered by <span className="text-gray-400 font-medium">TransformTechX</span> · AI Growth Readiness
          Framework
        </span>
        <span className="text-xs text-gray-700">Confidential · Hong Leong Group Internal Use Only</span>
      </footer>
    </div>
  )
}
