const { parentPort, workerData } = require('worker_threads');
const compute = require('./calculate');

parentPort.postMessage(compute(workerData));
