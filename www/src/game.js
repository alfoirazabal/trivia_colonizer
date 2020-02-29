import InputHandler from "./input.js";
import Panel from "./assets/display/predef/panel.js";
import GameObject from "./assets/display/predef/gameObject.js";
import { Button } from "./assets/display/predef/button.js";
import { Label } from "./assets/display/predef/label.js";
import UIImage from "./assets/display/predef/uiimage.js";

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
        setUppermostPanel(this);
        setUpperPanel(this);
        function setUppermostPanel(game) {
            game.gameObjects.uppermostPanel =
                    new Panel({x: 0, y: 0}, {x: game.gameWidth, y: 25}, "#222");
            var buttonText = Button.createButtonText({x: 1190, y:0}, "MENU", {x: 90, y: 25});
            buttonText.triggerClick = function() {
                console.log("LBC");
            }
            buttonText.triggerHover = function() {
                console.log("LBCHover");
            }
            game.gameObjects.uppermostPanel.addChild(buttonText);
        }
        function setUpperPanel(game) {
            createPlayerUpperPanel(game, 1);
            createPlayerUpperPanel(game, 2);

            console.log(game.gameObjects);

            function createPlayerUpperPanel(game, playerNumber) {
                var upperPanelName = "upperPanelP" + playerNumber;
                switch(playerNumber) {
                    case 1:
                        game.gameObjects[upperPanelName] = new Panel({x: 0, y: 25}, {x: game.gameWidth / 2, y: 80}, "#666");
                        break;
                    case 2:
                        game.gameObjects[upperPanelName] = new Panel({x: game.gameWidth / 2, y: 25}, {x: game.gameWidth / 2, y: 80}, "#888");
                        break;
                }
                var labelPNumber = new Label({x: 10, y: 60}, "P" + playerNumber);
                labelPNumber.setFont("60px Arial");
                game.gameObjects[upperPanelName].addChild(labelPNumber);
                var labelPScore = new Label({x: 90, y: 30}, "Score: 0");
                labelPScore.setFont("20px Arial");
                game.gameObjects[upperPanelName].addChild(labelPScore);
                var labelPowerUps = new Label({x: 90, y: 60}, "Power Ups: ");
                labelPowerUps.setFont("20px Arial");
                game.gameObjects[upperPanelName].addChild(labelPowerUps);
                var powerUpsPanel = new Panel({x: 210, y: 38}, {x: 300, y: 30}, "#000");
                game.gameObjects[upperPanelName].addChild(powerUpsPanel);
                for(let i = 0 ; i < 10 ; i++) {
                    var powerUpIcon = new UIImage({x: i * 30, y: 0}, null, null);
                    powerUpsPanel.addChild(powerUpIcon);
                }
            }

            function createMapGridPanel(game) {
                
            }
        }
    }

}