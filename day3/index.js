const fs = require('fs');

const input = fs.readFileSync('sample', 'utf8');
const banks = input.split('\n').map(line => line.split('').map(Number));

const part1 = () => {
    let totalCharge = 0;

    for (const bank of banks) {
        let firstLargestBattery = 0;
        let secondLargestBattery = 0;

        for (let i = 0; i < bank.length; i++) {
            const battery = bank[i];

            if (battery > firstLargestBattery && i !== bank.length - 1) {
                firstLargestBattery = battery
                secondLargestBattery = bank[i + 1];
            } else if (battery > secondLargestBattery) {
                secondLargestBattery = battery;
            }
        }
        totalCharge += parseInt(`${firstLargestBattery}${secondLargestBattery}`);
    }
    return totalCharge;
}
const part2 = () => {
    let totalCharge = 0;

    return totalCharge;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
