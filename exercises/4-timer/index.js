const timeFormatter = require('./time-formatter.js');

const timeString = process.argv.at(-1);

const template = [
    { char: 'h', multiple: 1000 * 60 * 60 },
    { char: 'm', multiple: 1000 * 60 },
    { char: 's', multiple: 1000 },
];

function handleTimeString(str) {
    const values = str.split(' ');
    return values.reduce((total, item) => {
        const num = Number.parseInt(item);
        const char = item.slice(-1);
        const { multiple } = template.find((t) => t.char === char);
        total += num * multiple;
        return total;
    }, 0);
}
let time = handleTimeString(timeString);

console.log(`Запускаем обратный отсчёт!
До взрыва осталось: ${timeFormatter(Math.floor(time))}`);
const interval = setInterval(() => {
    console.log(`До взрыва осталось: ${timeFormatter(Math.floor((time -= 1000)))}`);
}, 1000);

setTimeout(() => {
    clearInterval(interval);
    console.log('Boom!');
}, time);
