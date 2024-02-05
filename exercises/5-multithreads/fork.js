const compute = require('./calculate.js');

process.on('message', (msg) => {
    if (msg == 'disconnect') {
        console.log('process disconnected');
        return process.disconnect();
    }
    process.send(compute(msg));
});
