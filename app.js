const { setUp } = require('./scripts/setup');
const { getName, validate, delay } = require('./scripts/validation');
const { useMove, runAway, leaveGame } = require('./scripts/process');

async function app(inputName, count) {
    setUp();
    await delay(30000);
    let i = 0;
    while (i < count) {
        let doodleName = await getName();
        if (doodleName === inputName) {
            let check = await validate();
            await delay(200);
            if (check) {
                leaveGame();
                break;
            } else {
                ++i;
                console.log('kill : ' + i )
                await useMove();
            }
        } else {
            console.log('runaway\n');
            runAway();
        }
        await delay(23000);
    }
}