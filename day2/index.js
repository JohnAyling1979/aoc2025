const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');
const ranges = input.split(',');

// Common validation checks shared by both parts
const hasCommonInvalidations = (id) => {
    // Cannot start with zero
    if (id[0] === '0') {
        return false;
    }

    // Cannot have first half equal to second half
    const half = Math.floor(id.length / 2);
    const firstHalf = id.slice(0, half);
    const secondHalf = id.slice(half);
    if (firstHalf === secondHalf) {
        return false;
    }

    return true;
};

const isValidId1 = (id) => {
    return hasCommonInvalidations(id);
};

const isValidId2 = (id) => {
    if (!hasCommonInvalidations(id)) {
        return false;
    }

    // Cannot be formed by repeating a pattern
    const maxPatternLength = Math.floor(id.length / 2);
    for (let patternLength = 1; patternLength <= maxPatternLength; patternLength++) {
        if (id.length % patternLength === 0) {
            const pattern = id.substring(0, patternLength);
            const repetitions = id.length / patternLength;
            if (pattern.repeat(repetitions) === id) {
                return false;
            }
        }
    }

    return true;
};

// Generic function to process ranges with a validation function
const processRanges = (validator) => {
    let total = 0;
    for (const range of ranges) {
        const [start, end] = range.split('-').map(Number);
        for (let i = start; i <= end; i++) {
            if (!validator(i.toString())) {
                total += i;
            }
        }
    }
    return total;
};

const part1 = () => processRanges(isValidId1);
const part2 = () => processRanges(isValidId2);

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
