import InputHandler from "./input.js";
import Panel from "./assets/display/predef/panel.js";
import GameObject from "./assets/display/predef/gameObject.js";

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

        this.createMainObjects();

        this.speedCycle = 100 - SPEED;

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
        this.gameObjects.uppermostPanel =
                new Panel({x: 0, y: 0}, {x: this.gameWidth, y: 25}, "#222");
        var buttonText = this.gameObjects.uppermostPanel.createChildButtonText({x: 1190, y:0}, "MENU", {x: 90, y:25});
        buttonText.triggerClick = function() {
            console.log("LBC");
        }
        buttonText.setButtonWidth(90);
        buttonText.setButtonHeight(24);
    }

}