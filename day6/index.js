const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');

const lines = input.split('\n');

const part1 = () => {
    const rows = [];
    let operators = null;

    for (const line of lines) {
        const elements = line.trim().split(/\s+/);
        const firstElement = elements[0];

        if (!isNaN(firstElement) && firstElement !== '') {
            rows.push(elements.map(Number));
        } else {
            operators = elements;
        }
    }

    const result = [...rows[0]];

    for (let i = 1; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            if (operators[j] === '+') {
                result[j] += rows[i][j];
            } else {
                result[j] *= rows[i][j];
            }
        }
    }

    return result.reduce((a, b) => a + b, 0);
}

const part2 = () => {
    const operators = lines[lines.length - 1].split(/\s+/);
    const dataLines = lines.slice(0, -1);

    const maxLength = Math.max(...dataLines.map(line => line.length));
    const paddedLines = dataLines.map(line => line.padEnd(maxLength, ' '));

    let operatorIndex = 0;
    let total = null;
    let grandTotal = 0;

    for (let column = 0; column < maxLength; column++) {
        const digits = [];

        for (let row = 0; row < paddedLines.length; row++) {
            const char = paddedLines[row][column];
            if (char !== ' ') {
                digits.push(char);
            }
        }

        if (digits.length > 0) {
            const number = Number(digits.join(''));
            const operator = operators[operatorIndex];

            if (total === null) {
                total = number;
            } else if (operator === '+') {
                total += number;
            } else {
                total *= number;
            }
        } else {
            if (total !== null) {
                grandTotal += total;
                total = null;
            }
            operatorIndex++;
        }
    }

    if (total !== null) {
        grandTotal += total;
    }

    return grandTotal;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
