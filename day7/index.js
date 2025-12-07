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
    const paths = Array(rows).fill(null).map(() => Array(cols).fill(0));
    paths[0][startX] = 1;

    for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols; x++) {
            if (paths[y][x] > 0) {
                if (diagram[y][x] === '^') {
                    // Split to left and right
                    if (x > 0) {
                        paths[y + 1][x - 1] += paths[y][x];
                    }
                    if (x < cols - 1) {
                        paths[y + 1][x + 1] += paths[y][x];
                    }
                } else {
                    // Continue straight down
                    paths[y + 1][x] += paths[y][x];
                }
            }
        }
    }

    // Sum all paths in the last row
    return paths[rows - 1].reduce((sum, count) => sum + count, 0);
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
