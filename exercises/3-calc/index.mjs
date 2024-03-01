import operations from "../operations/index.mjs";
const firstNum = Number(process.argv[2]),
  secondNum = Number(process.argv[3]),
  operation = process.argv[4];

try {
  if (!operations[operation]) {
    throw new Error("this operation not defined");
  }
  if (!(parseInt(firstNum) && parseInt(secondNum))) {
    throw new Error("this arguments not Number");
  }
  const calculate = operations[operation];
  const result = calculate(firstNum, secondNum);
  console.log(result);
} catch (e) {
  console.log(e.message);
}
