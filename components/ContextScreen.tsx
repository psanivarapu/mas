'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import type { Division, FunctionArea, Level } from '@/lib/types'

interface ContextScreenProps {
  onSubmit: (division: Division, functionArea: FunctionArea, level: Level) => void
}

const DIVISIONS: { id: Division; name: string; sub: string; icon: string; description: string }[] = [
  {
    id: 'mpi',
    name: 'MPI',
    sub: 'Semiconductor',
    icon: '🔬',
    description: 'Malaysian Pacific Industries — IC packaging, precision testing, electronics manufacturing',
  },
  {
    id: 'hli',
    name: 'HLI',
    sub: 'Automotive & Tiles',
    icon: '🏍️',
    description: 'Yamaha Motor, fibre cement boards, ceramic tiles — multi-product industrial manufacturing',
  },
  {
    id: 'hcib',
    name: 'HCIB',
    sub: 'Cement & Building',
    icon: '🏗️',
    description: 'Hume Cement — ready-mix concrete, aggregates, building products',
  },
]

const FUNCTIONS: { id: FunctionArea; name: string; sub: string; icon: string; description: string }[] = [
  {
    id: 'support',
    name: 'Support Functions',
    sub: 'Finance · HR · Procurement',
    icon: '🗂️',
    description: 'Enabling functions — cost ops, workforce planning, vendor management, compliance',
  },
  {
    id: 'ops',
    name: 'Manufacturing & Supply Chain',
    sub: 'Ops · Production · Logistics',
    icon: '⚙️',
    description: 'Plant floor, quality control, demand planning, inventory, supplier operations',
  },
  {
    id: 'commercial',
    name: 'Sales & Marketing',
    sub: 'Revenue · Trade · Distribution',
    icon: '📈',
    description: 'Channel strategy, pricing, customer analytics, distributor performance',
  },
]

const LEVELS: { id: Level; name: string; sub: string }[] = [
  { id: 'cxo', name: 'VP / CXO', sub: 'Strategic decisions, P&L ownership' },
  { id: 'senior', name: 'Sr Manager / Director', sub: 'Function leadership, team management' },
  { id: 'exec', name: 'Executive / Manager', sub: 'Day-to-day operations, team member' },
]

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
  const [division, setDivision] = useState<Division | null>(null)
  const [functionArea, setFunctionArea] = useState<FunctionArea | null>(null)
  const [level, setLevel] = useState<Level | null>(null)

  const canStart = division !== null && functionArea !== null && level !== null

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
          Your answers will be tailored to your division, function, and level.
        </p>

        {/* Step 1: Division */}
        <div className="mb-8">
          <StepLabel num={1} title="Select your Division" done={division !== null} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DIVISIONS.map((d) => {
              const isSelected = division === d.id
              return (
                <button
                  key={d.id}
                  onClick={() => setDivision(d.id)}
                  className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-400 bg-blue-500/10'
                      : 'border-white/10 bg-white/3 hover:border-blue-500/40 hover:bg-white/5'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="text-xl mb-2 block">{d.icon}</span>
                  <div className="font-bold text-white text-sm">{d.name}</div>
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1.5">{d.sub}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{d.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="h-px bg-white/5 mb-8" />

        {/* Step 2: Function */}
        <div className={`mb-8 transition-opacity duration-300 ${division ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <StepLabel num={2} title="Select your Function" done={functionArea !== null} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FUNCTIONS.map((f) => {
              const isSelected = functionArea === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setFunctionArea(f.id)}
                  disabled={!division}
                  className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-400 bg-blue-500/10'
                      : 'border-white/10 bg-white/3 hover:border-blue-500/40 hover:bg-white/5'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="text-xl mb-2 block">{f.icon}</span>
                  <div className="font-bold text-white text-sm">{f.name}</div>
                  <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1.5">{f.sub}</div>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="h-px bg-white/5 mb-8" />

        {/* Step 3: Level */}
        <div className={`mb-10 transition-opacity duration-300 ${functionArea ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <StepLabel num={3} title="Select your Level" done={level !== null} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LEVELS.map((l) => {
              const isSelected = level === l.id
              return (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  disabled={!functionArea}
                  className={`text-center p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-400 bg-blue-500/10'
                      : 'border-white/10 bg-white/3 hover:border-blue-500/40 hover:bg-white/5'
                  }`}
                >
                  <div className="font-bold text-white text-sm mb-1">{l.name}</div>
                  <div className="text-xs text-gray-500">{l.sub}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-opacity duration-300 ${canStart ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <button
            onClick={() => canStart && onSubmit(division!, functionArea!, level!)}
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
