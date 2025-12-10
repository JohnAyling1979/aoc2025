const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');

const lines = input.split('\n').map(line => line.split(' '));

const part1 = () => {
    let total = 0;

    for (const line of lines) {
        line.pop();
        const goal = line.shift().slice(1).slice(0, -1);
        const buttons = line;
        const initialState = Array(goal.length).fill('.').join('');

        const queue = [{state: initialState, pressCount: 0}];
        const visited = new Set([initialState]);

        while (queue.length > 0) {
            const {state, pressCount} = queue.shift();

            if (state === goal) {
                total += pressCount;
                break;
            }

            for (const button of buttons) {
                indexes = button.slice(1).slice(0, -1).split(',');
                let newState = state.split('');

                for (const index of indexes) {
                    if (newState[index] === '.') {
                        newState[index] = '#';
                    } else {
                        newState[index] = '.';
                    }
                }

                newState = newState.join('');

                if (!visited.has(newState)) {
                    queue.push({state: newState, pressCount: pressCount + 1});
                    visited.add(newState);
                }
            }
        }
    }

    return total;
}

const part2 = () => {
    return 0;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
