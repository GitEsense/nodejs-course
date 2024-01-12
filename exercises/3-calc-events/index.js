const myEmitter = new myEmitter();
const actions = [
    { title: 'add', action: (a, b) => a + b },
    { title: 'multiple', action: (a, b) => a * b },
    {
        title: 'division',
        action: (a, b) => {
            if (b === 0) {
                return 'Нельзя делить на ноль';
            }
            return a / b;
        },
    },
    { title: 'substraction', action: (a, b) => a - b },
];

for (const item of actions) {
    myEmitter.on(item.title, (a, b) => {
        myEmitter.emit('result', item.action(a, b));
    });
}
myEmitter.emit('add', 5, 6);
myEmitter.on('result', (res) => console.log(res));
