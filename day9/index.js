const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');

const points = input.split('\n').map(line => line.split(',').map(Number));

const part1 = () => {
    largestArea = 0;

    for (const point of points) {
        for (const otherPoint of points) {
            if (point === otherPoint) {
                continue;
            }

            const area = (Math.abs(point[0] - otherPoint[0]) + 1) * (Math.abs(point[1] - otherPoint[1]) + 1);

            if (Math.abs(area) > largestArea) {
                largestArea = area;
            }
        }
    }

    return largestArea;
}

const part2 = () => {
    smallestX = Infinity;
    largestX = -Infinity;
    smallestY = Infinity;
    largestY = -Infinity;

    for (const point of points) {
        if (point[0] > largestX) {
            largestX = point[0];
        }
        if (point[1] > largestY) {
            largestY = point[1];
        }
    }

    const map = [];
    for (let y = 0; y <= largestY + 2; y++) {
        map.push([]);
        for (let x = 0; x <= largestX + 2; x++) {
            if (points.some(point => point[0] === x && point[1] === y)) {
                map[y].push('#');
            } else {
                map[y].push('.');
            }
        }
    }

    console.log(map.map(row => row.join('')).join('\n'));
    return 0;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
