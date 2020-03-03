import InputHandler from "./input.js";
import { setUppermostPanel, setUpperPanel, createMapGridPanel, drawMapFilterPanel, drawPanelQuestion } from "./logic/display.js";
import MapGrid from "./assets/domain/mapGrid/mapGrid.js";
import { GRID_POWER_UPS } from "./assets/domain/mapGrid/gridPowerUps.js";
import { getRandomQuestion } from "./logic/works.js";
import Player from "./assets/domain/player.js";

const SPEED = 100;  // DEFAULT

const GAME_MODES = {
    PLAY: 0
}

export default class Game {

    constructor(GAME_WIDTH, GAME_HEIGHT) {
        
        this.gameWidth = GAME_WIDTH;
        this.gameHeight = GAME_HEIGHT;

        this.GAME_MODE = GAME_MODES.PLAY;

        new InputHandler(this);

        this.gameObjects = {};

        this.speedCycle = 100 - SPEED;

        this.ACTIVE_FILTER_INDEX = 0;

        this.players = [
            new Player(this, "#f00"),
            new Player(this, "#00f")
        ];
        this.players[0].powerUps[3] = true;
        this.players[1].powerUps[2] = true;

        this.mapGrid = new MapGrid(this);
        console.log(this.mapGrid);

        this.createMainObjects();

    }

    update(deltaTime) {
        this.speedCycle--;
        if(this.speedCycle <= 0) {
            for(let gameObject in this.gameObjects) {
                this.gameObjects[gameObject].update(deltaTime);
            }
            this.speedCycle = 100 - SPEED;
        }
    }

    draw(ctx) {
        for(let gameObject in this.gameObjects) {
            this.gameObjects[gameObject].draw(ctx);
        }
    }

    createMainObjects() {
        setUppermostPanel(this);        
        setUpperPanel(this);
        createMapGridPanel(this);
        drawMapFilterPanel(this);
        // Preparing Questions Panel (LOGIC)
        var question = getRandomQuestion();
        // Drawing Questions Panel
        drawPanelQuestion(this, question);
    }

}