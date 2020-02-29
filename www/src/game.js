import InputHandler from "./input.js";
import Panel from "./assets/display/predef/panel.js";
import { Button } from "./assets/display/predef/button.js";
import { Label } from "./assets/display/predef/label.js";
import UIImage from "./assets/display/predef/uiimage.js";
import MapGrid, { GRID_DIMENSIONS, GRID_TILE_SIZE, GRID_POSITION_COLORS } from "./assets/domain/mapGrid/mapGrid.js";
import { GRID_POWER_UPS } from "./assets/domain/mapGrid/gridPowerUps.js";
import { GRID_FILTER_OPTIONS, GRID_FILTER_BUTTONS_POSITIONING } from "./assets/domain/mapGrid/gridsFilter.js";

const SPEED = 100;  // DEFAULT

const GAME_MODES = {
    PLAY: 0
}

const PLAYERS_UPPER_PANEL_OBJECT_NAMES = "upperPanelP";

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
            createMapGridPanel(game);

            console.log(game.gameObjects);

            function createPlayerUpperPanel(game, playerNumber) {
                var upperPanelName = PLAYERS_UPPER_PANEL_OBJECT_NAMES + playerNumber;
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
            }

            function createMapGridPanel(game) {
                game.gameObjects.mapGridPanel = new Panel(
                        {x: 0, y: 105},
                        {x: 1280, y: 400},
                        "#222"
                );
                var mapGrid = new MapGrid(game);
                // Creating Default Grids...
                for(var col = 0 ; col < GRID_DIMENSIONS.X ; col++) {
                    for(var row = 0 ; row < GRID_DIMENSIONS.Y ; row++) {
                        var currentColorIndex = 
                                (row + col) % GRID_POSITION_COLORS.length;
                        var panelInPosition = new Panel(
                                {
                                    x: row * GRID_TILE_SIZE,
                                    y: col * GRID_TILE_SIZE
                                },
                                {
                                    x: GRID_TILE_SIZE,
                                    y: GRID_TILE_SIZE
                                },
                                GRID_POSITION_COLORS[currentColorIndex]
                        );
                        game.gameObjects.mapGridPanel.addChild(
                                panelInPosition
                        );
                    }
                }
                // Drawing MapGrid PowerUps...
                var currentPowerUpInPlayersPanel = 0;
                for(var col = 0 ; col < GRID_DIMENSIONS.Y ; col++) {
                    for(var row = 0 ; row < GRID_DIMENSIONS.X ; row++) {
                        var powerUpValue = mapGrid.grid.powerUpsGrid[row][col];
                        if(powerUpValue !== null) {
                            drawPowerUpInGrid(row, col, powerUpValue);
                            drawPowerUpInPlayerPanel(1, powerUpValue, currentPowerUpInPlayersPanel);
                            drawPowerUpInPlayerPanel(2, powerUpValue, currentPowerUpInPlayersPanel);
                            currentPowerUpInPlayersPanel++;
                        }
                    }
                }
                function drawPowerUpInGrid(row, col, powerUpValue) {
                    var gridPowerUp = GRID_POWER_UPS[powerUpValue];
                    var powerUpImage = new UIImage({x: col * GRID_TILE_SIZE, y: row * GRID_TILE_SIZE}, gridPowerUp.image);
                    game.gameObjects.mapGridPanel.addChild(powerUpImage);
                }
                function drawPowerUpInPlayerPanel(playerNumber, powerUpValue, powerUpPanelIndexPosition) {
                    var powerUpImage = GRID_POWER_UPS[powerUpValue].image;
                    var panel = game.gameObjects[PLAYERS_UPPER_PANEL_OBJECT_NAMES + playerNumber].gameObjectsChildren[3];
                    var powerUpImage = new UIImage({x: powerUpPanelIndexPosition * 30, y: 0}, powerUpImage, {x: 30, y: 30});
                    panel.addChild(powerUpImage);
                }
                // Drawing Map Filter Panel
                var mapFilterPanel = new Panel({x: 0, y: 505}, {x: game.gameWidth, y: 40}, "#333");
                game.gameObjects.mapFilterPanel = mapFilterPanel;
                var labelMapFilter = new Label({x: 20, y: 25}, "Map Filter: ");
                labelMapFilter.setFont("18px Arial");
                game.gameObjects.mapFilterPanel.addChild(labelMapFilter);
                var filterButtonStartPosX = 
                        GRID_FILTER_BUTTONS_POSITIONING.START_POS_X;
                var filterButtonRightMarginX = 
                        GRID_FILTER_BUTTONS_POSITIONING.RIGHT_MARGIN_X;
                var filterButtonSize = 
                        GRID_FILTER_BUTTONS_POSITIONING.BUTTON_SIZE;
                for(var i = 0 ; i < Object.keys(GRID_FILTER_OPTIONS).length ; i++) {
                    var filterImage = GRID_FILTER_OPTIONS[i].image.deactivated;
                    var xPosition = (filterButtonStartPosX + i * filterButtonSize) + (filterButtonRightMarginX * (i + 1));
                    var filterButton = Button.createButtonImageFixedSize(
                        {x: xPosition, y: 5},
                        filterImage,
                        {x: filterButtonSize, y: filterButtonSize}
                    );
                    game.gameObjects.mapFilterPanel.addChild(filterButton);
                }
            }
        }
    }

}