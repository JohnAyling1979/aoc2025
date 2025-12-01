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

        // Count positions landed on during movement (optimized)
        if (direction === 'R') {
            // For right movement, count if we land on 100 during movement
            const stepsTo100 = 100 - pos;
            if (stepsTo100 >= 1 && stepsTo100 <= distance) {
                count++;
            }
        } else {
            // For left movement, count if we land on 0 during movement
            const stepsTo0 = pos;
            if (stepsTo0 >= 1 && stepsTo0 <= distance) {
                count++;
            }
        }

        // Update final position
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
    }

    return count;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
