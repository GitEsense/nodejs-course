let nodePath = process.argv[0],
    appPath = process.argv[1],
    firstNum = Number(process.argv[2]),
    secondNum = Number(process.argv[3]),
    operation = process.argv[4];

console.log(firstNum, secondNum);

try {
    const calculate = require(`./${operation}.js`);
    const result = calculate(firstNum, secondNum);
    console.log(result);
} catch (e) {
    console.log('this operation not defined');
}
