const fs = require('fs');

const input = fs.readFileSync('data', 'utf8');
const banks = input.split('\n').map(line => line.split('').map(Number));

const part1 = () => {
    let totalCharge = 0;

    for (const bank of banks) {
        let firstLargestBattery = 0;
        let secondLargestBattery = 0;

        for (let i = 0; i < bank.length; i++) {
            const battery = bank[i];

            if (battery > firstLargestBattery && i !== bank.length - 1) {
                firstLargestBattery = battery;
                secondLargestBattery = bank[i + 1];
            } else if (battery > secondLargestBattery) {
                secondLargestBattery = battery;
            }
        }
        totalCharge += firstLargestBattery * 10 + secondLargestBattery;
    }
    return totalCharge;
}
const part2 = () => {
    let totalCharge = 0;

    for (const bank of banks) {
        const batteryBank = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let bankIndex = 0;

        for (let batteryIndex = 0; batteryIndex < batteryBank.length; batteryIndex++) {
            const endIndex = bank.length - (11 - batteryIndex);

            for (let i = bankIndex; i < endIndex; i++) {
                if (bank[i] > batteryBank[batteryIndex]) {
                    batteryBank[batteryIndex] = bank[i];
                    bankIndex = i + 1;
                }
            }
        }

        totalCharge += Number(batteryBank.join(''));
    }

    return totalCharge;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
