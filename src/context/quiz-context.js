import { initialState, quizReducer } from "../reducer/quizReducer";

const { createContext, useContext, useReducer, useEffect } = require("react");

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const quizState = JSON.parse(localStorage.getItem("quizData")) || initialState;

  const [state, dispatch] = useReducer(quizReducer, quizState);

  useEffect(() => {
    if (
      state.quiz1.questions.length === 0 &&
      state.quiz1.noOfQuestion === 0 &&
      state.quiz1.operand > 0 &&
      state.quiz1.operator.length >= 1
    ) {
      dispatch({ type: "UPDATE_QUIZ1" });
    }
    if (
      state.quiz2.questions.length === 0 &&
      state.quiz2.noOfQuestion === 0 &&
      state.quiz2.operand > 0 &&
      state.quiz2.operator.length >= 1
    ) {
      dispatch({ type: "UPDATE_QUIZ2" });
    }
  }, []);

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};

const useQuiz = () => useContext(QuizContext);

export { QuizProvider, useQuiz };
