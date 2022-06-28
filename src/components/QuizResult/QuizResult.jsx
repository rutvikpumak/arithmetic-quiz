import React, { useEffect, useState } from "react";
import { useQuiz } from "../../context/quiz-context";

export function QuizResult({ quizNo }) {
  const { state, dispatch } = useQuiz();
  const [quizData, setQuizData] = useState(state[`quiz${quizNo}`]);

  useEffect(() => {
    setQuizData(state[`quiz${quizNo}`]);
  }, [state]);

  const startAgainHandler = () => {
    dispatch({ type: `RESET_QUIZ${quizNo}` });
  };

  return (
    quizData && (
      <div className="overflow-y-auto h-max">
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-bold text-blue-500 text-center mb-4">Quiz {quizNo} Result</p>
          <button
            className="bg-blue-500 text-white font-bold text-base px-2 py-0.5 rounded-md mt-4 hover:bg-blue-400"
            onClick={() => startAgainHandler()}
          >
            Start Again
          </button>
        </div>
        <p className="text-xl font-bold text-blue-500 text-center">
          Total Score : {quizData?.score}/{+quizData?.noOfQuestion * 10}{" "}
        </p>
        <div>
          {quizData?.questions.map((question, index) => (
            <div key={question + index}>
              <p className="text-lg font-bold">
                {index + 1}) {question}
              </p>
              <p className="text-center bg-green-500 text-white font-bold rounded-lg my-2">
                Correct Answer : {quizData.selectedQuestions[index]?.correctAns}
              </p>
              {quizData.selectedQuestions[index]?.answer === "" ? (
                <p className="text-center bg-orange-400 text-white font-bold rounded-lg px-2">
                  Option Not Selected
                </p>
              ) : (
                +quizData.selectedQuestions[index]?.answer !==
                  quizData.selectedQuestions[index]?.correctAns && (
                  <div>
                    <p className="text-center bg-red-500 text-white font-bold rounded-lg px-2">
                      Your Answer : {quizData.selectedQuestions[index]?.answer}
                    </p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
}
