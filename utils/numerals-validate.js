const numeralsValidate = (num) => {
    if (!num) return false;

    const format = Number(num);
    return Number.isInteger(format) && format > 0 && num === format.toString();
}

module.exports = numeralsValidate;