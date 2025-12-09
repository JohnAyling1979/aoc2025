const fs = require('fs');

const input = fs.readFileSync('sample', 'utf8');

const points = input.split('\n').map(line => line.split(',').map(Number));

const part1 = () => {
    const distances = [];
    const seenPoints = new Set();


    for (const point of points) {
        for (const otherPoint of points) {
            if (point === otherPoint) {
                continue;
            }

            const first = point[0] < otherPoint[0] ? point : otherPoint;
            const second = point[0] < otherPoint[0] ? otherPoint : point;

            if (seenPoints.has(`${first.join(',')}-${second.join(',')}`)) {
                continue;
            }

            seenPoints.add(`${first.join(',')}-${second.join(',')}`);

            distances.push({
                firstPoint: first.join(','),
                secondPoint: second.join(','),
                distance: Math.sqrt(Math.pow(first[0] - second[0], 2) + Math.pow(first[1] - second[1], 2) + Math.pow(first[2] - second[2], 2)),
            });
        }

        distances.sort((a, b) => a.distance - b.distance);
    }

    const connections = [];

    for (let distanceIndex = 0; distanceIndex < 10; distanceIndex++) {
        const distance = distances[distanceIndex];

        let found = false;
        for (let connectionIndex = 0; connectionIndex < connections.length; connectionIndex++) {
            const connection = connections[connectionIndex];

            if (connection.includes(distance.firstPoint) && !connection.includes(distance.secondPoint)) {
                console.log(`Adding second point to connection: ${connectionIndex}`);
                connection.push(distance.secondPoint);
                found = true;
            } else if (connection.includes(distance.secondPoint) && !connection.includes(distance.firstPoint)) {
                console.log(`Adding first point to connection: ${connectionIndex}`);
                connection.push(distance.firstPoint);
                found = true;
            } else if (connection.includes(distance.firstPoint) && connection.includes(distance.secondPoint)) {
                console.log(`Connection already exists: ${connectionIndex}`);
                found = true;
            }
        }

        if (!found) {
            console.log('Creating new connection');
            connections.push([distance.firstPoint, distance.secondPoint]);
        }
    }

    console.log(connections);
    return 0;
}

const part2 = () => {
    return 0;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
