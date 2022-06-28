import { initialState, quizReducer } from "../reducer/quizReducer";

const { createContext, useContext, useReducer, useEffect } = require("react");

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const quizState = JSON.parse(localStorage.getItem("quizData")) || initialState;

  const [state, dispatch] = useReducer(quizReducer, quizState);

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};

const useQuiz = () => useContext(QuizContext);

export { QuizProvider, useQuiz };
