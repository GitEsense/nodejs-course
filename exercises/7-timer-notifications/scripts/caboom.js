const timeFormatter = require('./time-formatter.js');
const { notify } = require('node-notifier');
const path = require('path');
const notifyOption = {
    title: 'BOOM!',
    message: 'Приложение отработало корректно, поздравляю!',
    icon: path.join(__dirname, '../img/boom.jpg'),
    sound: true,
    wait: false,
};

module.exports = function boomTime(time) {
    console.log(`До взрыва осталось: ${timeFormatter(Math.floor(time))}`);
    const interval = setInterval(() => {
        console.log(`До взрыва осталось: ${timeFormatter(Math.floor((time -= 1000)))}`);
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        notify(notifyOption);
    }, time - 1);
};
