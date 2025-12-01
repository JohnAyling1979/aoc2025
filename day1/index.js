const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');

const lines = input.split('\n');

const part1 = () => {
    let pos = 50;
    let count = 0;

    for (const line of lines) {
        const direction = line[0];
        const distance = parseInt(line.slice(1)) % 100;

        if (direction === 'L') {
            pos -= distance;
        } else {
            pos += distance;
        }

        if (pos < 0) {
            pos += 100;
        } else if (pos > 99) {
            pos -= 100;
        }

        if (pos === 0) {
            count++;
        }
    }

    return count;
}

const part2 = () => {
    let pos = 50;
    let count = 0;

    for (const line of lines) {
        const direction = line[0];
        const distance = parseInt(line.slice(1)) % 100;
        const rotation = parseInt(line.slice(1)) / 100;

        if (rotation > 1) {
            count += Math.floor(rotation);
        }

        for (let i = 0; i < distance; i++) {
            if (direction === 'L') {
                pos--;
            } else {
                pos++;
            }

            if (pos === 0 || pos === 100) {
                count++;
            }

            if (pos < 0) {
                pos += 100;
            } else if (pos > 99) {
                pos -= 100;
            }
        }
    }

    return count;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
