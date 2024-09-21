import { useEffect, useState } from 'react';
import { Action } from '../hooks/useSearchQuestions';

interface FinishScreenProps {
  points: number;
  maxPossiblePoints: number;
  highscore: number;
  dispatch: React.Dispatch<Action>;
}

export default function FinishScreen({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}: FinishScreenProps) {
  const percentage = Math.round((points / maxPossiblePoints) * 100);
  const [emoji, setEmoji] = useState('');

  const getEmoji = (percentage: number) => {
    if (percentage === 100) return '🎉';
    const emojiMap = [
      { limit: 90, emoji: '💪' },
      { limit: 70, emoji: '😊' },
      { limit: 50, emoji: '👍' },
      { limit: 30, emoji: '😐' },
      { limit: 10, emoji: '😕' },
      { limit: 0, emoji: '😢' },
    ];

    return emojiMap.find((item) => percentage >= item.limit)?.emoji || '😢';
  };

  useEffect(() => {
    setEmoji(getEmoji(percentage));
  }, [percentage]);

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
        {maxPossiblePoints} points. That's {Math.ceil(percentage)}%!
      </p>
      <p className="highscore">Highscore: {highscore} points</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  );
}
