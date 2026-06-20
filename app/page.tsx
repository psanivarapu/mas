'use client'

import { useReducer, useEffect } from 'react'
import type { Domain, Persona, Screen, AppState } from '@/lib/types'
import LandingScreen from '@/components/LandingScreen'
import QuestionnaireScreen from '@/components/QuestionnaireScreen'
import ReportScreen from '@/components/ReportScreen'

type Action =
  | { type: 'START'; domain: Domain; persona: Persona }
  | { type: 'ANSWER'; questionId: string; value: number }
  | { type: 'COMPLETE' }
  | { type: 'RETAKE' }
  | { type: 'RESTORE'; domain: Domain; persona: Persona; answers: Record<string, number> }

const INITIAL_STATE: AppState = {
  domain: null,
  persona: null,
  currentScreen: 'landing',
  currentQuestion: 0,
  answers: {},
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'START':
      return {
        ...INITIAL_STATE,
        domain: action.domain,
        persona: action.persona,
        currentScreen: 'questionnaire',
      }
    case 'ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      }
    case 'COMPLETE':
      return { ...state, currentScreen: 'report' }
    case 'RETAKE':
      return INITIAL_STATE
    case 'RESTORE':
      return {
        ...INITIAL_STATE,
        domain: action.domain,
        persona: action.persona,
        answers: action.answers,
        currentScreen: 'report',
      }
    default:
      return state
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  // On mount: check for shared state in URL
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const stateParam = params.get('state')
    if (!stateParam) return

    try {
      const decoded = JSON.parse(decodeURIComponent(atob(stateParam))) as {
        domain: Domain
        persona: Persona
        answers: Record<string, number>
      }
      if (decoded.domain && decoded.persona && decoded.answers) {
        dispatch({
          type: 'RESTORE',
          domain: decoded.domain,
          persona: decoded.persona,
          answers: decoded.answers,
        })
        // Clean URL without reload
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch {
      // Silently ignore malformed state params
    }
  }, [])

  if (state.currentScreen === 'landing' || !state.domain || !state.persona) {
    return (
      <LandingScreen
        onStart={(domain, persona) => dispatch({ type: 'START', domain, persona })}
      />
    )
  }

  if (state.currentScreen === 'questionnaire') {
    return (
      <QuestionnaireScreen
        domain={state.domain}
        persona={state.persona}
        answers={state.answers}
        onAnswer={(questionId, value) => dispatch({ type: 'ANSWER', questionId, value })}
        onComplete={() => dispatch({ type: 'COMPLETE' })}
        onBack={() => dispatch({ type: 'RETAKE' })}
      />
    )
  }

  if (state.currentScreen === 'report') {
    return (
      <ReportScreen
        domain={state.domain}
        persona={state.persona}
        answers={state.answers}
        onRetake={() => dispatch({ type: 'RETAKE' })}
      />
    )
  }

  return null
}
