const timeFormatter = require('./time-formatter.js');

module.exports = function boomTime(time) {
    console.log(`До взрыва осталось: ${timeFormatter(Math.floor(time))}`);
    const interval = setInterval(() => {
        console.log(`До взрыва осталось: ${timeFormatter(Math.floor((time -= 1000)))}`);
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        console.log('Boom!');
    }, time);
};
