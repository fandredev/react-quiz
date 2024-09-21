interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
}

export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
}: ProgressProps) {
  return (
    <header className="progress">
      <p>
        Question <span>{index}</span> of <span>{numQuestions}</span>
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}
