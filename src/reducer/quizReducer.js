import { calArray, queGenerator } from "../utils/queGenerator";

export const initialState = {
  cumulativeScore: 0,
  quiz1: {
    currentQue: 0,
    noOfQuestion: 0,
    operand: 0,
    operator: [],
    questions: [],
    answers: [],
    score: 0,
  },
  quiz2: {
    currentQue: 0,
    noOfQuestion: 0,
    operand: 0,
    operator: [],
    questions: [],
    answers: [],
    score: 0,
  },
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_QUIZ1": {
      //case to update value input by user at start of quiz and update it in state
      const { noOfQue, operand, operators } = action.payload;
      return {
        ...state,
        quiz1: {
          ...state.quiz1,
          noOfQuestion: noOfQue,
          operand: operand,
          operator: operators,
          questions:
            JSON.parse(localStorage.getItem("quiz-1")) ||
            queGenerator(noOfQue, operand, operators, 1), //call to function which generator random que based on input
        },
      };
    }

    case "UPDATE_QUIZ2": {
      //case to update value input by user at start of quiz2 and update it in state
      const { noOfQue, operand, operators } = action.payload;
      return {
        ...state,
        quiz2: {
          ...state.quiz2,
          noOfQuestion: noOfQue,
          operand: operand,
          operator: operators,
          questions:
            JSON.parse(localStorage.getItem("quiz-2")) ||
            queGenerator(noOfQue, operand, operators, 2), //call to function which generator random que based on input
        },
      };
    }

    case "NEXT_QUE_QUIZ1": {
      //case to update quiz1 state based in prev question input

      const { currentQuestion, answer } = action.payload;
      const queArr = /(\d+)(\D)(\d+)/gm.exec(currentQuestion); //extracting value from question using regex
      const correctAns = calArray([queArr[1], queArr[2], queArr[3]]); //call to cal value function based on value
      const currQue = JSON.parse(localStorage.getItem("quizData")).quiz1.currentQue;

      return {
        ...state,
        cumulativeScore:
          correctAns === Number(answer) ? state.cumulativeScore + 10 : state.cumulativeScore,
        quiz1: {
          ...state.quiz1,
          currentQue: +state.quiz1.noOfQuestion === currQue + 1 ? currQue : currQue + 1,
          score: correctAns === Number(answer) ? state.quiz1.score + 10 : state.quiz1.score,
          answers: [
            ...state.quiz1.answers,
            {
              correctAns,
              answer,
            },
          ],
        },
      };
    }

    case "NEXT_QUE_QUIZ2": {
      //case to update quiz1 state based in prev question input

      const { currentQuestion, answer } = action.payload;
      const queArr = /(\d+)(\D)(\d+)/gm.exec(currentQuestion);
      const correctAns = calArray([queArr[1], queArr[2], queArr[3]]); //extracting value from question using regex
      const currQue = JSON.parse(localStorage.getItem("quizData")).quiz2.currentQue; //call to cal value function based on

      return {
        ...state,
        cumulativeScore:
          correctAns === Number(answer) ? state.cumulativeScore + 10 : state.cumulativeScore,
        quiz2: {
          ...state.quiz2,
          currentQue: +state.quiz2.noOfQuestion === currQue + 1 ? currQue : currQue + 1,
          score: correctAns === Number(answer) ? state.quiz2.score + 10 : state.quiz2.score,
          answers: [
            ...state.quiz2.answers,
            {
              correctAns,
              answer,
            },
          ],
        },
      };
    }

    case "RESET_QUIZ1": // case to reset quiz1
      localStorage.clear("quiz-1");
      localStorage.clear("currentQue_Quiz1");
      return {
        ...state,
        cumulativeScore: state.cumulativeScore - state.quiz1.score,
        quiz1: {
          currentQue: 0,
          noOfQuestion: 0,
          operand: 0,
          operator: [],
          questions: [],
          answers: [],
          score: 0,
        },
      };

    case "RESET_QUIZ2": // case to reset quiz2
      localStorage.clear("quiz-2");
      localStorage.clear("currentQue_Quiz2");
      return {
        ...state,
        cumulativeScore: state.cumulativeScore - state.quiz2.score,
        quiz2: {
          currentQue: 0,
          noOfQuestion: 0,
          operand: 0,
          operator: [],
          questions: [],
          answers: [],
          score: 0,
        },
      };

    default:
      return state;
  }
};
