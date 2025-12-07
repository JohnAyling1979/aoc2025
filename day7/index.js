const fs = require('fs');

const input = fs.readFileSync('sample', 'utf8');

const diagram = input.split('\n').map(line => line.split(''));

const startX = diagram[0].indexOf('S');

const part1 = () => {
    let splits = 0;

    for (let y = 0; y < diagram.length - 1; y++) {
        for (let x = 0; x < diagram[y].length; x++) {
            if (diagram[y][x] === 'S') {
                diagram[y + 1][x] = '|';
            }
            if (diagram[y][x] === '^' && diagram[y - 1][x] === '|') {
                diagram[y][x - 1] = '|';
                diagram[y + 1][x - 1] = '|';

                diagram[y][x + 1] = '|';
                diagram[y + 1][x + 1] = '|';

                splits++;
            }
            if (diagram[y][x] === '|' && diagram[y + 1][x] === '.') {
                diagram[y + 1][x] = '|';
            }
        }
    }

    return splits;
}

const part2 = () => {
    const paths = Array(diagram.length).fill(null).map(() => Array(diagram[0].length).fill(0));

    paths[0][startX] = 1;

    for (let y = 0; y < diagram.length - 1; y++) {
        for (let x = 0; x < diagram[y].length; x++) {
            if (paths[y][x] > 0) {
                if (diagram[y][x] === '^') {
                    paths[y + 1][x - 1] += paths[y][x];
                    paths[y + 1][x + 1] += paths[y][x];
                } else {
                    paths[y + 1][x] += paths[y][x];
                }
            }
        }
    }

    let totalPaths = 0;

    for (let x = 0; x < paths[paths.length - 1].length; x++) {
        totalPaths += paths[paths.length - 1][x];
    }

    return totalPaths;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
