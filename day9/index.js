const fs = require('fs');

const input = fs.readFileSync('sample', 'utf8');

const points = input.split('\n').map(line => line.split(',').map(Number));

const part1 = () => {
    largestArea = 0;

    for (const point of points) {
        for (const otherPoint of points) {
            if (point === otherPoint) {
                continue;
            }

            const xmin = Math.min(point[0], otherPoint[0]);
            const xmax = Math.max(point[0], otherPoint[0]);
            const ymin = Math.min(point[1], otherPoint[1]);
            const ymax = Math.max(point[1], otherPoint[1]);

            const area = (xmax - xmin + 1) * (ymax - ymin + 1);

            if (Math.abs(area) > largestArea) {
                largestArea = area;
            }
        }
    }

    return largestArea;
}

const createConnectedGrid = (points) => {
    const maxX = Math.max(...points.map(point => point[0]));
    const maxY = Math.max(...points.map(point => point[1]));

    const grid = Array.from({ length: maxY + 1}, () => Array(maxX + 1).fill(0));

    let currentPoint = points[0];

    for (let i = 1; i < points.length; i++) {
        const point = points[i];

        if (point[0] === currentPoint[0]) {
            for (let y = Math.min(point[1], currentPoint[1]); y <= Math.max(point[1], currentPoint[1]); y++) {
                grid[y][point[0]] = 1;
            }
        } else if (point[1] === currentPoint[1]) {
            for (let x = Math.min(point[0], currentPoint[0]); x <= Math.max(point[0], currentPoint[0]); x++) {
                grid[point[1]][x] = 1;
            }
        }

        currentPoint = point;
    }

    if (currentPoint[0] === points[0][0]) {
        for (let y = Math.min(currentPoint[1], points[0][1]); y <= Math.max(currentPoint[1], points[0][1]); y++) {
            grid[y][currentPoint[0]] = 1;
        }
    } else if (currentPoint[1] === points[0][1]) {
        for (let x = Math.min(currentPoint[0], points[0][0]); x <= Math.max(currentPoint[0], points[0][0]); x++) {
            grid[currentPoint[1]][x] = 1;
        }
    }

    for (let y = 0; y < grid.length; y++) {
        let inside = false;
        let filledOne = false;

        for (let x = 0; x < grid[y].length; x++) {
            if (!inside && grid[y][x] === 1) {
                inside = true;
            } else if (inside && filledOne && grid[y][x] === 1) {
                inside = false;
                filledOne = false;
            }

            if (inside && grid[y][x] === 0) {
                grid[y][x] = 1;
                filledOne = true;
            }
        }
    }

    return grid;
}

const part2 = () => {
    largestArea = 0;

    const grid = createConnectedGrid(points);

    console.log(grid.join('\n'));

    for (const point of points) {
        for (const otherPoint of points) {
            if (point === otherPoint) {
                continue;
            }

            const xmin = Math.min(point[0], otherPoint[0]);
            const xmax = Math.max(point[0], otherPoint[0]);
            const ymin = Math.min(point[1], otherPoint[1]);
            const ymax = Math.max(point[1], otherPoint[1]);

            const area = (xmax - xmin + 1) * (ymax - ymin + 1);

            let valid = true;
            for (let y = ymin; y < ymax; y++) {
                for (let x = xmin; x < xmax; x++) {
                    if (grid[y][x] === 0) {
                        valid = false;
                        break;
                    }
                }
            }

            if (valid && area > largestArea) {
                largestArea = area;
            }
        }
    }

    return largestArea;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
