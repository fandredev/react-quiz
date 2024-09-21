import { Action } from '../hooks/useSearchQuestions';
import { Question as Q } from '../shared/interfaces/questions';
import { QuestionResult } from './question-item';

interface QuestionProps {
  question: Q;
  dispatch: React.Dispatch<Action>;
  answer: null | number;
}

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  return (
    <div className="">
      <h4>{question.question}</h4>

      <div className="options">
        {question.options.map((option, index) => (
          <QuestionResult
            answer={answer}
            key={index}
            option={option}
            question={question}
            dispatch={dispatch}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
