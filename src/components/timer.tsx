import { useEffect } from 'react';
import { Action } from '../hooks/useSearchQuestions';

interface TimerProps {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number | null;
}

export default function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const mins = Math.floor(secondsRemaining! / 60);
  const seconds = secondsRemaining! % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      <span>
        {mins < 10 && '0'}
        {mins}:{seconds < 10 && '0'}
        {seconds}
      </span>
    </div>
  );
}
