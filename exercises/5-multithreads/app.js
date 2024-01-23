const { Worker } = require('worker_threads');
const { performance, PerformanceObserver } = require('perf_hooks');
const { fork } = require('child_process');
const os = require('os');
const CORE_COUNT = os.cpus().length;
main = performance.timerify(main);
const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().map((item) => {
        console.log(`${item.name}: Выполнено за - ${item.duration.toFixed(2)} ms`);
    });
});

performanceObserver.observe({ entryTypes: ['measure'] });

const splitArrayToWorkers = (array, callback) => {
    const length = Math.round(array.length / CORE_COUNT);
    const promises = Array.from({ length: CORE_COUNT }, (value, index) => {
        value = array.slice(index * length, (index + 1) * length);
        return callback(value, index + 1);
    });
    return promises;
};

const markString = (name, num) => {
    const mark = num ? `${name}-${num}` : name;
    const mark_start = `${name}-${num} start`;
    const mark_end = `${name}-${num} end`;
    return { mark, mark_start, mark_end };
};

const worker = (array, num = '') => {
    const name = 'worker';
    const { mark, mark_start, mark_end } = markString(name, num);
    return new Promise((resolve) => {
        performance.mark(mark_start);
        const worker = new Worker('./worker.js', {
            workerData: {
                array,
            },
        });

        worker.on('message', (msg) => {
            performance.mark(mark_end);
            performance.measure(mark, mark_start, mark_end);
            resolve(msg);
        });
    });
};

const forker = (array, num = '') => {
    const name = 'forker';
    const { mark, mark_start, mark_end } = markString(name, num);
    return new Promise((resolve) => {
        performance.mark(mark_start);
        const fp = fork('./fork.js');
        fp.send({ array });

        fp.on('message', (msg) => {
            performance.mark(mark_end);
            performance.measure(mark, mark_start, mark_end);
            resolve(msg);
        });
    });
};

async function main() {
    try {
        const array = [];
        for (let i = 1; i <= 7777777; i++) {
            array.push(i);
        }

        const resultWorkers = await Promise.all(splitArrayToWorkers(array, worker));
        const resultForkers = await Promise.all(splitArrayToWorkers(array, forker));
        const resultWorker = await worker(array);
        const resultForker = await forker(array);

        // console.log({
        //     resultForker,
        //     resultForkers: { array: resultForkers, total: resultForkers.reduce((a, c) => (a += c)) },
        //     resultWorker,
        //     resultWorkers: { array: resultWorkers, total: resultWorkers.reduce((a, c) => (a += c)) },
        // });
    } catch (e) {
        console.error(e.message);
    } finally {
    }
}

main();
