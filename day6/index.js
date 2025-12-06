const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');

const lines = input.split('\n');

const part1 = () => {
    const rows = [];
    let operators = null;

    for (const line of lines) {
        const elements = line.trim().split(/\s+/);

        if (elements[0].match(/^\d+$/)) {
            rows.push(elements);
        } else {
            operators = elements;
        }
    }

    const result = rows[0].map(Number);

    for (let i = 1; i < rows.length; i++) {

        const numbers = rows[i];
        for (let j = 0; j < numbers.length; j++) {
            const number = Number(numbers[j]);
            const operator = operators[j];

            if (operator === '+') {
                result[j] += number;
            } else {
                result[j] *= number;
            }
        }
    }

    return result.reduce((a, b) => a + b, 0);
}

const part2 = () => {
    const operators = lines[lines.length - 1].split(/\s+/);

    let length = 0;

    for (let i = 0; i < lines.length - 1; i++) {
        length = Math.max(length, lines[i].length);
    }

    for (let i = 0; i < lines.length - 1; i++) {
        lines[i] = lines[i].padEnd(length, ' ');
    }

    let operatorIndex = 0;
    let total = 0
    let grandTotal = 0;

    for (let column = 0; column < length; column++) {
        let number = '';

        for (let row = 0; row < lines.length - 1; row++) {
            if (lines[row][column] !== ' ') {
                number += lines[row][column];
            }
        }

        if (number !== '') {
            if (operators[operatorIndex] === '+') {
                if (total === 0) {
                    total = Number(number);
                } else {
                    total += Number(number);
                }
            } else {
                if (total === 0) {
                    total = Number(number);
                } else {
                    total *= Number(number);
                }
            }
        } else {
            operatorIndex++;
            grandTotal += total;
            total = 0;
        }
    }

    grandTotal += total;

    return grandTotal;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
