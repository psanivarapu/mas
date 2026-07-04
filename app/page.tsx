'use client'

import { useReducer, useEffect } from 'react'
import type { Domain, Persona, AppState, Question } from '@/lib/types'
import { fetchQuestions } from '@/lib/questions'
import LandingScreen from '@/components/LandingScreen'
import QuestionnaireScreen from '@/components/QuestionnaireScreen'
import ReportScreen from '@/components/ReportScreen'

type Action =
  | { type: 'START'; domain: Domain; persona: Persona }
  | { type: 'ANSWER'; questionId: string; value: number }
  | { type: 'COMPLETE' }
  | { type: 'RETAKE' }
  | { type: 'RESTORE'; domain: Domain; persona: Persona; answers: Record<string, number> }
  | { type: 'QUESTIONS_LOADED'; questions: Question[] }
  | { type: 'QUESTIONS_ERROR'; message: string }

const INITIAL_STATE: AppState = {
  domain: null,
  persona: null,
  currentScreen: 'landing',
  currentQuestion: 0,
  answers: {},
  questions: [],
  questionsError: null,
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
    case 'QUESTIONS_LOADED':
      return { ...state, questions: action.questions, questionsError: null }
    case 'QUESTIONS_ERROR':
      return { ...state, questionsError: action.message }
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

  // Load the question bank for the selected domain/persona from the
  // /questionnaires text files whenever a new combination is chosen.
  useEffect(() => {
    if (!state.domain || !state.persona || state.questions.length > 0) return
    let cancelled = false

    fetchQuestions(state.domain, state.persona)
      .then((questions) => {
        if (!cancelled) dispatch({ type: 'QUESTIONS_LOADED', questions })
      })
      .catch((err) => {
        if (!cancelled) {
          dispatch({
            type: 'QUESTIONS_ERROR',
            message: err instanceof Error ? err.message : 'Failed to load questionnaire',
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [state.domain, state.persona, state.questions.length])

  if (state.currentScreen === 'landing' || !state.domain || !state.persona) {
    return (
      <LandingScreen
        onStart={(domain, persona) => dispatch({ type: 'START', domain, persona })}
      />
    )
  }

  if (state.questionsError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-red-400 font-semibold mb-2">Couldn&apos;t load the questionnaire</p>
          <p className="text-gray-500 text-sm mb-6">{state.questionsError}</p>
          <button
            onClick={() => dispatch({ type: 'RETAKE' })}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  if (state.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading questionnaire…</p>
      </div>
    )
  }

  if (state.currentScreen === 'questionnaire') {
    return (
      <QuestionnaireScreen
        domain={state.domain}
        persona={state.persona}
        questions={state.questions}
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
        questions={state.questions}
        answers={state.answers}
        onRetake={() => dispatch({ type: 'RETAKE' })}
      />
    )
  }

  return null
}
