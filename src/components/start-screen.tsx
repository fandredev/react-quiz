import { Action } from '../hooks/useSearchQuestions';

interface StartScreenProps {
  questionsLength: number;
  dispatch: React.Dispatch<Action>;
}

export default function StartScreen({
  questionsLength,
  dispatch,
}: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questionsLength} question to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Let's start
      </button>
    </div>
  );
}
