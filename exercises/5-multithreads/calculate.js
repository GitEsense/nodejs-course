module.exports = function compute({ array }) {
    return array.reduce((acc, value) => {
        if (value % 3 === 0) {
            acc++;
        }
        return acc;
    }, 0);
};
