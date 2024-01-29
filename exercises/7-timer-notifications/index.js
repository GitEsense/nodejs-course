const boom = require('./scripts/caboom.js');

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
        console.log(total);
        return total;
    }, 0);
}

function main() {
    console.log(`Запускаем обратный отсчёт!`);
    const time = handleTimeString(timeString);
    boom(time);
}

main();
