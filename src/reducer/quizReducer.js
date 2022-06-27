import { calArray, queGenerator } from "../utils/queGenerator";

export const initialState = {
  quiz1: {
    currentQue: 0,
    noOfQuestion: 0,
    operand: 0,
    operator: [],
    questions: [],
    selectedQuestions: [],
    score: 0,
  },
  quiz2: {
    currentQue: 0,
    noOfQuestion: 0,
    operand: 0,
    operator: [],
    questions: [],
    selectedQuestions: [],
    score: 0,
  },
};

export const quizReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_QUIZ1": {
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
            queGenerator(noOfQue, operand, operators, 1),
        },
      };
    }

    case "UPDATE_QUIZ2": {
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
            queGenerator(noOfQue, operand, operators, 2),
        },
      };
    }

    case "NEXT_QUE_QUIZ1": {
      const { currentQuestion, answer } = action.payload;
      const queArr = /(\d+)(\D)(\d+)/gm.exec(currentQuestion);
      const correctAns = calArray([queArr[1], queArr[2], queArr[3]]);
      const currQue = JSON.parse(localStorage.getItem("quizData")).quiz1.currentQue;

      return {
        ...state,
        quiz1: {
          ...state.quiz1,
          currentQue: +state.quiz1.noOfQuestion === currQue + 1 ? currQue : currQue + 1,
          score: correctAns === Number(answer) ? state.quiz1.score + 10 : state.quiz1.score,
          selectedQuestions: [
            ...state.quiz1.selectedQuestions,
            {
              correctAns,
              answer,
            },
          ],
        },
      };
    }

    case "NEXT_QUE_QUIZ2": {
      const { currentQuestion, answer } = action.payload;
      const queArr = /(\d+)(\D)(\d+)/gm.exec(currentQuestion);
      const correctAns = calArray([queArr[1], queArr[2], queArr[3]]);
      const currQue = JSON.parse(localStorage.getItem("quizData")).quiz2.currentQue;

      return {
        ...state,
        quiz2: {
          ...state.quiz2,
          currentQue: +state.quiz2.noOfQuestion === currQue + 1 ? currQue : currQue + 1,
          score: correctAns === Number(answer) ? state.quiz2.score + 10 : state.quiz2.score,
          selectedQuestions: [
            ...state.quiz2.selectedQuestions,
            {
              correctAns,
              answer,
            },
          ],
        },
      };
    }

    case "RESET_QUIZ1":
      localStorage.clear("quiz-1");
      localStorage.clear("currentQue_Quiz1");
      return {
        ...state,
        quiz1: {
          currentQue: 0,
          noOfQuestion: 0,
          operand: 0,
          operator: [],
          questions: [],
          selectedQuestions: [],
          score: 0,
        },
      };

    case "RESET_QUIZ2":
      localStorage.clear("quiz-2");
      localStorage.clear("currentQue_Quiz2");
      return {
        ...state,
        quiz2: {
          currentQue: 0,
          noOfQuestion: 0,
          operand: 0,
          operator: [],
          questions: [],
          selectedQuestions: [],
          score: 0,
        },
      };
  }
};
