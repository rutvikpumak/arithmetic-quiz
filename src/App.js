import "./App.css";
import { Quiz1, Quiz2 } from "./components";
import { QuizCard } from "./components/QuizCard/QuizCard";

function App() {
  return (
    <div className="App flex flex-col h-screen py-8 gap-8 ">
      <h1 className="text-3xl font-bold text-center">Arithmetic Quiz!</h1>
      <div className="flex justify-center h-96">
        <Quiz1 />
        <Quiz2 />
      </div>
    </div>
  );
}

export default App;
