import { useEffect, useReducer } from 'react';
import { Question } from '../shared/interfaces/questions';

interface State {
  questions: Question[];
  status: 'ready' | 'loading' | 'error' | 'active' | 'finished';
  index: number
  answer: null | number
  points: number
  highscore: number
  secondsRemaining: number | null
}

export type Action =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'finished' }
  | { type: 'restart' }
  | { type: 'tick' }

const INITIAL_STATE: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

const SECS_PER_QUESTION = 30;


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };
    
    case 'start': {
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      };
    }
    case 'newAnswer': {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points: action.payload === parseInt(question.correctOption) ? state.points + question.points : state.points 
      }
    }
    case 'nextQuestion': {
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    }
    case 'finished': {
      return {
        ...state,
        highscore: state.points > state.highscore ? state.points : state.highscore,
        status: 'finished'
      }
    }
    case 'restart': {
      return {
        ...state,
        status: 'ready',
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
        secondsRemaining: 10
      }
    }

    case 'tick': {
      return {
        ...state,
        secondsRemaining: (state.secondsRemaining ?? 0) - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      }
    }
    default:
      throw new Error('Invalid action type');
  }
}

export function useSearchQuestions() {
  const [{ status, questions, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch(import.meta.env.VITE_QUESTIONS_API_URL);
        const data: Question[] = await response.json();
        dispatch({
          type: 'dataReceived',
          payload: data,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
        dispatch({ type: 'dataFailed' });
      }
    }

    getQuestions();
  }, []);

  
  return {
    questions,
    status,
    dispatchEvent: dispatch,
    index,
    answer,
    points,
    highscore,
    secondsRemaining
  };
}
