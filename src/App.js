import "./App.css";
import { Quiz1, Quiz2 } from "./components";
import { useQuiz } from "./context/quiz-context";

function App() {
  const { state } = useQuiz();
  return (
    <div className="App flex flex-col h-screen py-8 gap-8 ">
      <p className="text-3xl font-bold text-center underline underline-offset-4">
        Arithmetic Quiz!
      </p>
      <p className="text-2xl font-bold text-right mr-8">
        Cumulative Score : {state.cumulativeScore}
      </p>
      <div className="flex justify-center h-96">
        <Quiz1 />
        <Quiz2 />
      </div>
    </div>
  );
}

export default App;
