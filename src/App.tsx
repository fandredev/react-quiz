import { useEffect, useReducer } from 'react';
import Header from './components/header';
import Main from './components/main';

interface Question {
  question: string;
  options: string[];
  correctOption: string;
  points: number;
}

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

export default function Quiz() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch('http://localhost:5000/questions/');
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

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
        {state.questions.map((question, index) => {
          return (
            <div key={index}>
              <p>{question.question}</p>
              <ul>
                {question.options.map((option, index) => {
                  return <li key={index}>{option}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </Main>
    </div>
  );
}
