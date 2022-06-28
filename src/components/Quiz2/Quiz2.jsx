import React, { useState } from "react";
import { useQuiz } from "../../context/quiz-context";
import { QuizCard } from "../QuizCard/QuizCard";

const OPERATORS = ["+", "-", "*", "/"];

export function Quiz2() {
  const { state, dispatch } = useQuiz();
  const [formDetails, setFormDetails] = useState({
    noOfQue: 0,
    operand: 0,
    operators: [],
  });

  const toggleOperator = (e) => {
    setFormDetails({
      ...formDetails,
      operators: formDetails.operators.includes(e.target.value)
        ? formDetails.operators.filter((ele) => ele !== e.target.value)
        : [...formDetails.operators, e.target.value],
    });
  };

  const startQuizHandler = () => {
    const { noOfQue, operand, operators } = formDetails;
    if (noOfQue !== 0 && (noOfQue < 1 || noOfQue > 20)) {
      alert("Number of Question should be between 1 to 20");
    }
    if (operand !== 0 && (operand < 0 || operand > 15)) {
      alert("Operand should be between 1 to 15");
    } else {
      if (noOfQue > 0 && noOfQue <= 20 && operand > 0 && operand <= 15 && operators.length > 0) {
        dispatch({ type: "UPDATE_QUIZ1", payload: { noOfQue, operand, operators } });
        setFormDetails({
          noOfQue: 0,
          operand: 0,
          operators: [],
        });
      } else if (noOfQue === 0 || operand === 0 || operators.length === 0) {
        alert("Fill all the fields");
      }
    }
  };

  return (
    <div className="flex flex-col shadow-xl m-8 w-2/4  border border-sky-500 py-2 px-4">
      {state.quiz2.noOfQuestion === 0 ? (
        <>
          <p className="text-2xl font-bold text-blue-500 text-center mb-4">Quiz 2</p>
          <div className="flex flex-col gap-8 justify-center">
            <div>
              <span className="font-bold">*Number of Question : </span>
              <input
                className="border border-solid border-gray-300 rounded-sm px-2"
                type="number"
                onChange={(e) => setFormDetails({ ...formDetails, noOfQue: e.target.value })}
                required
              />
            </div>
            <div>
              <span className="font-bold">*Operands Limit : </span>
              <input
                className="border border-solid border-gray-300 rounded-sm px-2"
                type="number"
                onChange={(e) => setFormDetails({ ...formDetails, operand: e.target.value })}
                required
              />
            </div>
            <div>
              <span className="font-bold">*Select Operator : </span>
              <div className="flex-row gap-8 inline-flex">
                {OPERATORS.map((operator, index) => (
                  <label key={operator + index} className="cursor-pointer">
                    <input
                      className="mr-2"
                      type="checkbox"
                      value={operator}
                      name="operator"
                      onChange={(e) => toggleOperator(e)}
                    />
                    {operator}
                  </label>
                ))}
              </div>
            </div>
            <button
              className="self-center bg-blue-500 text-white font-bold text-lg w-fit px-2 py-1 rounded-md mt-4"
              onClick={() => startQuizHandler()}
            >
              Start Quiz
            </button>
          </div>
        </>
      ) : (
        <QuizCard quizNo="2" />
      )}
    </div>
  );
}
