import { Action } from '../hooks/useSearchQuestions';

interface NextButtonProps {
  dispatch: React.Dispatch<Action>;
  answer: null | number;
}

export default function NextButton({ dispatch, answer }: NextButtonProps) {
  if (answer === null) return;

  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: 'nextQuestion' });
      }}
    >
      Next
    </button>
  );
}
