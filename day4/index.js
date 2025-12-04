const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');
const rows = input.split('\n').map(line => line.split(''));

const getNumberOfNeighbors = (y, x) => {
    let neighbors = 0;
    if (y > 0 && rows[y - 1][x] === '@') {
        neighbors++;
    }
    if (y < rows.length - 1 && rows[y + 1][x] === '@') {
        neighbors++;
    }
    if (x > 0 && rows[y][x - 1] === '@') {
        neighbors++;
    }
    if (x < rows[y].length - 1 && rows[y][x + 1] === '@') {
        neighbors++;
    }
    if (y > 0 && x > 0 && rows[y - 1][x - 1] === '@') {
        neighbors++;
    }
    if (y > 0 && x < rows[y].length - 1 && rows[y - 1][x + 1] === '@') {
        neighbors++;
    }
    if (y < rows.length - 1 && x > 0 && rows[y + 1][x - 1] === '@') {
        neighbors++;
    }
    if (y < rows.length - 1 && x < rows[y].length - 1 && rows[y + 1][x + 1] === '@') {
        neighbors++;
    }

    return neighbors;
}

const part1 = () => {
    let count = 0;

    for (let y = 0; y < rows.length; y++) {
        const row = rows[y];

        for (let x = 0; x < row.length; x++) {
            const point = row[x];

            if (point === '@') {
                const neighbors = getNumberOfNeighbors(y, x);

                if (neighbors < 4) {
                    count++;
                }
            }
        }
    }

    return count;
}

const part2 = () => {
    let totalCount = 0;
    let count = 0;

    do {
        count = 0;
        for (let y = 0; y < rows.length; y++) {
            const row = rows[y];

            for (let x = 0; x < row.length; x++) {
                const point = row[x];

                if (point === '@') {
                    const neighbors = getNumberOfNeighbors(y, x);

                    if (neighbors < 4) {
                        count++;
                        rows[y][x] = '.';
                    }
                }
            }
        }
        totalCount += count;
    } while (count > 0);

    return totalCount;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
