const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');

const ranges = input.split(',');

const isValidId1 = (id) => {
    if (id[0] === '0') {
        return false;
    }

    const half = Math.floor(id.length / 2);
    const firstHalf = id.slice(0, half);
    const secondHalf = id.slice(half);


    if (firstHalf === secondHalf) {
        return false;
    }

    return true;
}

const part1 = () => {
    let total = 0;
    ranges.forEach(range => {
        const [start, end] = range.split('-').map(Number);

        for (let i = start; i <= end; i++) {
            if (!isValidId1(i.toString())) {
                total += i;
            }
        }
    });

    return total;
}

const isValidId2 = (id) => {
    if (id[0] === '0') {
        return false;
    }

    const half = Math.floor(id.length / 2);
    const firstHalf = id.slice(0, half);
    const secondHalf = id.slice(half);

    if (firstHalf === secondHalf) {
        return false;
    }

    for (let pos = 1; pos <= Math.floor(id.length / 2); pos++) {
        if (id.length % pos === 0) {
            const pattern = id.substring(0, pos);
            if (pattern.repeat(id.length / pos) === id) {
                return false;
            }
        }
    }


    return true;
}

const part2 = () => {
    let total = 0;
    ranges.forEach(range => {
        const [start, end] = range.split('-').map(Number);

        for (let i = start; i <= end; i++) {
            if (!isValidId2(i.toString())) {
                total += i;
            }
        }
    });

    return total;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
