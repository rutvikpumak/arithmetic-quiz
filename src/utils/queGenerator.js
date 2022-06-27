export function calArray(arr) {
  let com = null;
  switch (arr[1]) {
    case "+":
      com = Number(arr[0]) + Number(arr[2]);
      break;
    case "*":
      com = Number(arr[0]) * Number(arr[2]);
      break;
    case "/":
      com = Number(arr[0]) / Number(arr[2]);
      break;
    case "-":
      com = Number(arr[0]) - Number(arr[2]);
      break;
    default:
      break;
  }
  return com;
}

export function queGenerator(numOfQue, operand, operators, quizNumber) {
  let queArr = [];
  if (numOfQue > 1) {
    for (let num = 0; num < numOfQue; num++) {
      let que = "";
      let num1 = Math.floor(Math.random() * operand);
      let num2 = Math.floor(Math.random() * operand);
      let operator = operators[Math.floor(Math.random() * operators.length)];
      que = num1 + operator + num2;
      queArr.push(que);
    }
  }
  localStorage.setItem(`quiz-${quizNumber}`, JSON.stringify(queArr));
  return queArr;
}
