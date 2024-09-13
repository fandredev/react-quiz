interface StartScreenProps {
  questionsLength: number;
}

export default function StartScreen({ questionsLength }: StartScreenProps) {
  return (
    <div className="">
      <h2>Welcome to the React Quiz!</h2>
      <h2>{questionsLength} question to test your React Mastery</h2>
      <button>Let's start</button>
    </div>
  );
}
