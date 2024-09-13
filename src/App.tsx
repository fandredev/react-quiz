import Header from './components/header';
import Main from './components/main';

export default function Quiz() {
  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}
