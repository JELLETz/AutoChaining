const robot = require("robotjs");
const { delay } = require('./validation');
function runAway(){
    robot.moveMouse(1120, 750);
    robot.moveMouseSmooth(1130,750);
    robot.mouseClick();
    robot.mouseClick();
}

async function useMove() {
    robot.setMouseDelay(100);

    // ไปยังปุ่ม fight //
    robot.moveMouse(280, 748);
    robot.moveMouseSmooth(290, 748);
    robot.mouseClick();
    robot.mouseClick();
    // ไปยังปุ่ม fight //
    // สกิล 1
    robot.moveMouse(280, 680);
    robot.moveMouseSmooth(285, 680);
    robot.mouseClick();
    await delay(3000);


    // ไปยังปุ่ม fight //
    robot.moveMouse(280, 748);
    robot.moveMouseSmooth(290, 748);
    robot.mouseClick();
    robot.mouseClick();
    // ไปยังปุ่ม fight //
    // สกิล 2
    robot.moveMouse(570 , 680);
    robot.moveMouseSmooth(575, 680);
    robot.mouseClick();
    await delay(3000);

    // ไปยังปุ่ม fight //
    robot.moveMouse(280, 748);
    robot.moveMouseSmooth(290, 748);
    robot.mouseClick();
    robot.mouseClick();
    // ไปยังปุ่ม fight //
    // สกิล 3
    robot.moveMouse(860 , 680);
    robot.moveMouseSmooth(865, 680);
    robot.mouseClick();
    await delay(3000);

    // ไปยังปุ่ม fight //
    robot.moveMouse(280, 748);
    robot.moveMouseSmooth(290, 748);
    robot.mouseClick();
    robot.mouseClick();
    // ไปยังปุ่ม fight //
    // สกิล 4
    robot.moveMouse(1160 , 680);
    robot.moveMouseSmooth(1165, 680);
    robot.mouseClick();


    // ถ้าสกิล 1 หมดก็จะไปกดใช้สกิล 2 2 หมดก็ใช้ 3 ไล่ไปเรื่อยๆ

}

function leaveGame() {
    robot.moveMouse(1415 , 15);
    robot.moveMouseSmooth(1436, 15);
    robot.mouseClick();

    robot.moveMouse(826 , 610);
    robot.moveMouseSmooth(900, 610);
    robot.mouseClick();
}

module.exports = { leaveGame, useMove, runAway };