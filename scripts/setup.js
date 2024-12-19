const robot = require("robotjs");

function setUp(){
    robot.setMouseDelay(200);

    robot.moveMouse(720, 482);
    robot.moveMouseSmooth(720, 480); // เคลื่อนเมาส์ไปกลางจอ
    robot.mouseClick();

    robot.moveMouse(45, 900);
    robot.moveMouseSmooth(45, 860); // คลิกที่ menu ซ้ายล่าง
    robot.mouseClick();

    robot.moveMouse(910, 520);
    robot.moveMouseSmooth(910, 398); // คลิกที่กระเป๋า
    robot.mouseClick();

    robot.moveMouse(1100, 300);
    robot.moveMouseSmooth(1102, 198); // เลือก keyitems 
    robot.mouseClick();
    robot.mouseClick();

    robot.moveMouse(240, 720);
    robot.moveMouseSmooth(240, 650); // คลิกที่ item
    robot.mouseClick(); 

    robot.moveMouse(260, 666);
    robot.moveMouseSmooth(255, 666); // คลิกที่ use
    robot.mouseClick(); 

    robot.moveMouse(1100, 400);
    robot.moveMouseSmooth(1120, 312); // กดตกลง
    robot.mouseClick(); 

    robot.moveMouse(1000, 200);
    robot.moveMouseSmooth(1222, 193); // กดตกลงอีกที
    robot.mouseClick(); 
}

module.exports = { setUp };