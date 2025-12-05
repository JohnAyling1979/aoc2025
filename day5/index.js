const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');

const lines = input.split('\n');

let startingList = false;
let ingredients = [];
const freshRanges = [];


for (const line of lines) {
    if (line === '') {
        startingList = true;
    } else if (startingList) {
        ingredients.push(line);
    } else {
        const [start, end] = line.split('-').map(Number);

        freshRanges.push({start, end});
    }
}

const part1 = () => {
    let count = 0;
    for (const ingredient of ingredients) {
        for (const freshRange of freshRanges) {
            if (ingredient >= freshRange.start && ingredient <= freshRange.end) {
                count++;
                break;
            }
        }
    }
    return count;
}

const part2 = () => {
    freshRanges.sort((a, b) => a.start - b.start || a.end - b.end);

    const combinedRanges = [];

    for (let freshRangeIndex = 0; freshRangeIndex < freshRanges.length; freshRangeIndex++) {
        const freshRange = freshRanges[freshRangeIndex];
        found = false;

        for (let combinedRangeIndex = 0; combinedRangeIndex < combinedRanges.length; combinedRangeIndex++) {
            const combinedRange = combinedRanges[combinedRangeIndex];

            if (freshRange.start >= combinedRange.start && freshRange.start <= combinedRange.end) {
                if (freshRange.end > combinedRange.end) {
                    combinedRange.end = freshRange.end;
                }
                found = true;
                break;
            }
        }

        if (!found) {
            combinedRanges.push(freshRange);
        }
    }

    let count = 0;
    for (const combinedRange of combinedRanges) {
        count += combinedRange.end - combinedRange.start + 1;
    }
    return count;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
