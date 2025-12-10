const fs = require('fs');

const input = fs.readFileSync('sample', 'utf8');

const lines = input.split('\n').map(line => line.split(' '));

const part1 = () => {
    let total = 0;

    const part1Lines = JSON.parse(JSON.stringify(lines));

    for (const line of part1Lines) {
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
    let total = 0;

    const part2Lines = JSON.parse(JSON.stringify(lines));

    const line = part2Lines[1];

    // for (const line of part2Lines) {
        line.shift();
        const goal = line.pop().slice(1).slice(0, -1).split(',').join('');
        const buttons = line;
        const initialState = Array(goal.length).fill('0').join('');

        const queue = [{state: initialState, pressCount: 0}];
        const visited = new Set([initialState]);

        console.log('intial', goal, initialState, buttons);

        while (queue.length > 0) {
            const {state, pressCount} = queue.shift();

            console.log('checking', state, goal, pressCount);

            if (state === goal) {
                total += pressCount;
                break;
            }

            for (const button of buttons) {
                indexes = button.slice(1).slice(0, -1).split(',');
                let newState = state.split('');

                for (const index of indexes) {
                    newState[index]++;
                }

                newState = newState.join('');

                if (!visited.has(newState)) {
                    queue.push({state: newState, pressCount: pressCount + 1});
                    visited.add(newState);
                }
            }
        }
    // }

    return total;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
