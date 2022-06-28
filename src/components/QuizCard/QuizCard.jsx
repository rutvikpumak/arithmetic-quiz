import React, { useEffect, useState } from "react";
import { useQuiz } from "../../context/quiz-context";
import { QuizResult } from "../QuizResult/QuizResult";

export function QuizCard({ quizNo }) {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const { state, dispatch } = useQuiz();
  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(20);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    localStorage.setItem("quizData", JSON.stringify(state));
    setCurrentQuestion(
      state[`quiz${quizNo}`]?.questions[
        state[`quiz${quizNo}`]?.currentQue ||
          JSON.parse(localStorage.getItem("quizData"))[`quiz${quizNo}`].currentQue
      ]
    );
  }, [state]);

  const nextHandler = () => {
    dispatch({ type: `NEXT_QUE_QUIZ${quizNo}`, payload: { currentQuestion, answer } });
    setAnswer("");
    if (state[`quiz${quizNo}`]?.currentQue + 1 === +state[`quiz${quizNo}`]?.noOfQuestion) {
      setShowResult(true);
    } else {
      setSeconds(20);
    }
  };

  const resetHandler = () => {
    dispatch({ type: `RESET_QUIZ${quizNo}` });
    setAnswer("");
    setSeconds(20);
    setShowResult(false);
  };

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 1) {
        nextHandler();
        if (state[`quiz${quizNo}`]?.currentQue + 1 === +state[`quiz${quizNo}`]?.noOfQuestion) {
          clearInterval(intervalId);
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [seconds]);

  return showResult ? (
    <QuizResult quizNo={quizNo} />
  ) : (
    <div className="flex flex-col m-4 py-2 px-4 gap-4">
      <p className="text-center font-bold text-xl underline underline-offset-4">
        Question {state[`quiz${quizNo}`]?.currentQue + 1}/{state[`quiz${quizNo}`]?.questions.length}
      </p>
      <div className="text-xl flex justify-between font-bold items-center mt-4 ">
        <p>
          {state[`quiz${quizNo}`]?.currentQue + 1}) {currentQuestion} ?
        </p>
        <p className="">
          Timer : <span className={`${seconds < 6 && "text-red-600"}`}>{seconds}</span>
        </p>
      </div>
      <div className="flex items-center">
        <span>Enter your answer :</span>
        <input
          type="number"
          className="border border-solid border-gray-300 rounded-sm px-2 ml-4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <div className="text-xl flex justify-between font-bold items-center mt-4">
        <button
          className="bg-red-500 text-white font-bold text-base px-2 py-1 rounded-md mt-4 hover:bg-red-400"
          onClick={() => resetHandler()}
        >
          Reset
        </button>
        {state[`quiz${quizNo}`]?.currentQue === +state[`quiz${quizNo}`]?.noOfQuestion - 1 ? (
          <button
            className="bg-blue-500 text-white font-bold text-base px-2 py-1 rounded-md mt-4 hover:bg-blue-400"
            onClick={() => nextHandler()}
          >
            Result
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white font-bold text-base px-2 py-1 rounded-md mt-4 hover:bg-blue-400"
            onClick={() => nextHandler()}
          >
            Next Question
          </button>
        )}
      </div>
      <p className="text-right font-bold text-xl">Score: {state[`quiz${quizNo}`]?.score}</p>
    </div>
  );
}
