const getArgs = (args) => {
    const result = {};
    const [executer, file, ...other] = args;
    const indexOfAllCommands = other.reduce((acc, el, i) => (el.charAt(0) === '-' ? [...acc, i] : acc), []);
    console.log(indexOfAllCommands);

    for (const [index, startIndex] of indexOfAllCommands.entries()) {
        const key = other[startIndex].substr(1);
        const endIndex = indexOfAllCommands[index + 1] ?? other.length;
        if (startIndex === other.length - 1) {
            result[key] = true;
        } else if (startIndex !== endIndex) {
            const values = other.slice(startIndex + 1, endIndex);
            result[key] = values.join(',');
        } else {
            result[key] = true;
        }
    }
    return result;
};

export { getArgs };
