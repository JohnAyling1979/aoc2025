const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');
const grid = input.split('\n').map(line => line.split(''));

// This program simulates removing rolls of paper (@) from a grid.
// A roll can only be removed if it has fewer than 4 occupied adjacent positions,
// meaning there's enough room around it to be safely removed.

// Directions for checking 8 adjacent positions around each roll: [dy, dx]
const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
];

const MIN_OCCUPIED_NEIGHBORS = 4; // Rolls can only be removed if fewer than 4 adjacent positions are occupied

const countOccupiedNeighbors = (grid, y, x) => {
    let occupiedNeighbors = 0;
    const height = grid.length;

    for (const [dy, dx] of DIRECTIONS) {
        const ny = y + dy;
        const nx = x + dx;

        // Check bounds for each row individually since rows may have different lengths
        if (ny >= 0 && ny < height && nx >= 0 && nx < grid[ny].length && grid[ny][nx] === '@') {
            occupiedNeighbors++;
        }
    }

    return occupiedNeighbors;
};

// Part 1: Count how many rolls can be removed in a single pass
const part1 = () => {
    let removableRolls = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] === '@') {
                const occupiedNeighbors = countOccupiedNeighbors(grid, y, x);
                if (occupiedNeighbors < MIN_OCCUPIED_NEIGHBORS) {
                    removableRolls++;
                }
            }
        }
    }

    return removableRolls;
}

// Part 2: Simulate the process of repeatedly removing rolls until no more can be removed
const part2 = () => {
    let totalRemovals = 0;

    while (true) {
        let removalsThisRound = 0;
        const positionsToRemove = [];

        // First pass: identify all rolls that can be removed
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === '@') {
                    const occupiedNeighbors = countOccupiedNeighbors(grid, y, x);
                    if (occupiedNeighbors < MIN_OCCUPIED_NEIGHBORS) {
                        positionsToRemove.push([y, x]);
                    }
                }
            }
        }

        // Second pass: remove all identified rolls
        for (const [y, x] of positionsToRemove) {
            grid[y][x] = '.';
            removalsThisRound++;
        }

        totalRemovals += removalsThisRound;

        // If no rolls were removed this round, we're done
        if (removalsThisRound === 0) {
            break;
        }
    }

    return totalRemovals;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
