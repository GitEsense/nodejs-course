const getArgs = (args: string[]) => {
    const result: Record<string, string | boolean> = {};
    const [executer, file, ...other] = args;
    const indexOfAllCommands = other.reduce((acc: number[], el: string, i: number) => (el.charAt(0) === '-' ? [...acc, i] : acc), []);

    for (const [index, startIndex] of indexOfAllCommands.entries()) {
        const key: string = other[startIndex].substring(1);
        const endIndex: number = indexOfAllCommands[index + 1] ?? other.length;
        if (startIndex === other.length - 1) {
            result[key] = true;
        } else if (startIndex !== endIndex) {
            const values: string[] = other.slice(startIndex + 1, endIndex);
            result[key] = values.join(',');
        } else {
            result[key] = true;
        }
    }
    return result;
};

export { getArgs };
