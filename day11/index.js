const fs = require('fs');

const findPathRecursive = (graph, current, target, path) => {
    const newPath = [...path, current];

    if (current === target) {
        return [newPath];
    }

    const paths = [];
    for (const output of graph.get(current)) {
        if (!newPath.includes(output)) {
            paths.push(...findPathRecursive(graph, output, target, newPath));
        }
    }

    return paths;
}

const part1 = () => {
    const input = fs.readFileSync('data', 'utf8');

    const lines = input.split('\n');

    const graph = new Map();

    for (const line of lines) {
        const [input, outputs] = line.split(': ');
        graph.set(input, outputs.split(' '));
    }

    const paths = findPathRecursive(graph, 'you', 'out', []);

    return paths.length;
}

const part2 = () => {
    const input = fs.readFileSync('sample2', 'utf8');

    const lines = input.split('\n');

    const graph = new Map();

    for (const line of lines) {
        const [input, outputs] = line.split(': ');
        graph.set(input, outputs.split(' '));
    }

    const paths = findPathRecursive(graph, 'svr', 'out', []);

    let pathsThatVisitDacFft = paths.filter(path => path.includes('dac') && path.includes('fft'));

    return pathsThatVisitDacFft.length;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
