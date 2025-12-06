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


    for (const bank of banks) {
        const batteryBank = [0,0,0,0,0,0,0,0,0,0,0,0];
        let batteryIndex = 0;
        let bankIndex = 0;

        do {
            for (let i = bankIndex; i < bank.length - (11 - batteryIndex); i++) {
                const battery = bank[i];

                if (battery > batteryBank[batteryIndex]) {
                    batteryBank[batteryIndex] = battery;
                    bankIndex = i + 1;
                }
            }

            batteryIndex++;
        } while (batteryIndex < batteryBank.length);

        totalCharge += parseInt(batteryBank.join(''));
    }


    return totalCharge;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
