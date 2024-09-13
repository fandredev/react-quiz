import Header from './components/header';
import Main from './components/main';
import Loader from './components/loader';
import ErrorMessage from './components/error';
import StartScreen from './components/start-screen';
import { useSearchQuestions } from './hooks/useSearchQuestions';

export default function Quiz() {
  const { questions, status } = useSearchQuestions();
  const questionsLength = questions.length;

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && (
          <StartScreen questionsLength={questionsLength} />
        )}
      </Main>
    </div>
  );
}
