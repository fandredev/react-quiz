import { Action } from '../hooks/useSearchQuestions';
import { Question } from '../shared/interfaces/questions';

interface QuestionResultProps {
  option: string;
  dispatch: React.Dispatch<Action>;
  answer: null | number;
  question: Question;
  index: number;
}

export function QuestionResult({
  option,
  dispatch,
  answer,
  question,
  index,
}: QuestionResultProps) {
  const hasAnswered = answer !== null;
  const correctOption = parseInt(question.correctOption) === index;

  return (
    <button
      className={`btn btn-option ${index === answer ? 'selected ' : ''}${
        hasAnswered ? (correctOption ? 'correct' : 'wrong') : ''
      }`}
      onClick={() => {
        dispatch({ type: 'newAnswer', payload: index });
      }}
      disabled={hasAnswered}
    >
      {option}
    </button>
  );
}
