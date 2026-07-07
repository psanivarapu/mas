'use client'

import { useReducer, useEffect } from 'react'
import type { Division, FunctionArea, Level, AppState, Question, Registrant } from '@/lib/types'
import { fetchQuestions } from '@/lib/questions'
import LandingScreen from '@/components/LandingScreen'
import ContextScreen from '@/components/ContextScreen'
import QuestionnaireScreen from '@/components/QuestionnaireScreen'
import ReportScreen from '@/components/ReportScreen'

type Action =
  | { type: 'START'; registrant: Registrant }
  | { type: 'SET_CONTEXT'; division: Division; functionArea: FunctionArea; level: Level }
  | { type: 'ANSWER'; questionId: string; value: number }
  | { type: 'COMPLETE' }
  | { type: 'RETAKE' }
  | {
      type: 'RESTORE'
      division: Division
      functionArea: FunctionArea
      level: Level
      answers: Record<string, number>
    }
  | { type: 'QUESTIONS_LOADED'; questions: Question[] }
  | { type: 'QUESTIONS_ERROR'; message: string }

const INITIAL_STATE: AppState = {
  division: null,
  functionArea: null,
  level: null,
  currentScreen: 'landing',
  currentQuestion: 0,
  answers: {},
  questions: [],
  questionsError: null,
  registrant: null,
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'START':
      return { ...state, registrant: action.registrant, currentScreen: 'context' }
    case 'SET_CONTEXT':
      return {
        ...state,
        division: action.division,
        functionArea: action.functionArea,
        level: action.level,
        answers: {},
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
      return { ...INITIAL_STATE, questions: state.questions }
    case 'RESTORE':
      return {
        ...state,
        division: action.division,
        functionArea: action.functionArea,
        level: action.level,
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
        division: Division
        functionArea: FunctionArea
        level: Level
        answers: Record<string, number>
      }
      if (decoded.division && decoded.functionArea && decoded.level && decoded.answers) {
        dispatch({
          type: 'RESTORE',
          division: decoded.division,
          functionArea: decoded.functionArea,
          level: decoded.level,
          answers: decoded.answers,
        })
        // Clean URL without reload
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch {
      // Silently ignore malformed state params
    }
  }, [])

  // The question set is shared across every Division/Function/Level
  // combination, so it's loaded once, independent of context selection.
  useEffect(() => {
    if (state.questions.length > 0) return
    let cancelled = false

    fetchQuestions()
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
  }, [state.questions.length])

  if (state.currentScreen === 'landing') {
    return (
      <LandingScreen
        onStart={(name, email, role) => dispatch({ type: 'START', registrant: { name, email, role } })}
      />
    )
  }

  if (state.currentScreen === 'context') {
    return (
      <ContextScreen
        onSubmit={(division, functionArea, level) => dispatch({ type: 'SET_CONTEXT', division, functionArea, level })}
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

  if (state.currentScreen === 'questionnaire' && state.division && state.functionArea && state.level) {
    return (
      <QuestionnaireScreen
        division={state.division}
        functionArea={state.functionArea}
        level={state.level}
        questions={state.questions}
        answers={state.answers}
        onAnswer={(questionId, value) => dispatch({ type: 'ANSWER', questionId, value })}
        onComplete={() => {
          if (state.registrant && state.division && state.functionArea && state.level) {
            fetch('/api/notify/report', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...state.registrant,
                division: state.division,
                functionArea: state.functionArea,
                level: state.level,
                answers: state.answers,
              }),
            }).catch(() => {})
          }
          dispatch({ type: 'COMPLETE' })
        }}
        onBack={() => dispatch({ type: 'RETAKE' })}
      />
    )
  }

  if (state.currentScreen === 'report' && state.division && state.functionArea && state.level) {
    return (
      <ReportScreen
        division={state.division}
        functionArea={state.functionArea}
        level={state.level}
        questions={state.questions}
        answers={state.answers}
        onRetake={() => dispatch({ type: 'RETAKE' })}
      />
    )
  }

  return null
}
