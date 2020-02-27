import Game from './game.js';

var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

var GAME_WIDTH = canvas.width;
var GAME_HEIGHT = canvas.height;

var game = new Game(GAME_WIDTH, GAME_HEIGHT);

var lastTime = 0;

function gameLoop(timeStamp) {
    var deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.fillStyle = "#fff";
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);