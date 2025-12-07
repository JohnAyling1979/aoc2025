const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');
const diagram = input.split('\n').map(line => line.split(''));

const startX = diagram[0].indexOf('S');
const rows = diagram.length;
const cols = diagram[0].length;

const part1 = () => {
    // Create a working copy to avoid mutating the original
    const working = diagram.map(row => [...row]);
    let splits = 0;

    for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols; x++) {
            // Handle start position
            if (working[y][x] === 'S') {
                working[y + 1][x] = '|';
            }

            // Handle splitter: ^ with | above it
            if (working[y][x] === '^' && y > 0 && working[y - 1][x] === '|') {
                // Create splits to left and right
                if (x > 0) {
                    working[y][x - 1] = '|';
                    working[y + 1][x - 1] = '|';
                }
                if (x < cols - 1) {
                    working[y][x + 1] = '|';
                    working[y + 1][x + 1] = '|';
                }
                splits++;
            }

            // Propagate | downward
            if (working[y][x] === '|' && working[y + 1][x] === '.') {
                working[y + 1][x] = '|';
            }
        }
    }

    return splits;
}

const part2 = () => {
    // Use two rows at a time (sliding window) to reduce memory
    let current = Array(cols).fill(0);
    current[startX] = 1;

    for (let y = 0; y < rows - 1; y++) {
        const next = Array(cols).fill(0);

        for (let x = 0; x < cols; x++) {
            if (current[x] === 0) continue;

            if (diagram[y][x] === '^') {
                // Split to left and right
                if (x > 0) next[x - 1] += current[x];
                if (x < cols - 1) next[x + 1] += current[x];
            } else {
                // Continue straight down
                next[x] += current[x];
            }
        }

        current = next;
    }

    // Sum all paths in the last row
    return current.reduce((sum, count) => sum + count, 0);
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
