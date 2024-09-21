import Header from './components/header';
import Main from './components/main';
import Loader from './components/loader';
import ErrorMessage from './components/error';
import StartScreen from './components/start-screen';
import { useSearchQuestions } from './hooks/useSearchQuestions';
import Question from './components/question';
import NextButton from './components/next-button';

export default function Quiz() {
  const { questions, status, dispatchEvent, index, answer } =
    useSearchQuestions();
  const questionsLength = questions.length;

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && (
          <StartScreen
            questionsLength={questionsLength}
            dispatch={dispatchEvent}
          />
        )}

        {status === 'active' && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatchEvent}
              answer={answer}
            />
            <NextButton dispatch={dispatchEvent} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
