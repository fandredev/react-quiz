import { useEffect, useReducer } from 'react';
import { Question } from '../shared/interfaces/questions';

interface State {
  questions: Question[];
  status: 'ready' | 'loading' | 'error' | 'active' | 'finished';
}

const INITIAL_STATE: State = {
  questions: [],
  status: 'loading',
};

type Action =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error('Invalid action type');
  }
}

export function useSearchQuestions() {
  const [{ status, questions }, dispatch] = useReducer(reducer, INITIAL_STATE);

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
  };
}
