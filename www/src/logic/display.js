import Panel from "../assets/display/predef/panel.js";
import { Label } from "../assets/display/predef/label.js";
import { Button } from "../assets/display/predef/button.js";
import { getRandomQuestion, getPowerUpsArray } from "./works.js";
import UIImage from "../assets/display/predef/uiimage.js";
import { GRID_DIMENSIONS, GRID_TILE_SIZE, GRID_POSITION_COLORS, QUESTION_DIFFICULTIES } from "../assets/domain/mapGrid/mapGrid.js";
import { GRID_POWER_UPS } from "../assets/domain/mapGrid/gridPowerUps.js";
import { GRID_FILTER_OPTIONS, GRID_FILTER_BUTTONS_POSITIONING } from "../assets/domain/mapGrid/gridsFilter.js";
import GameObject from "../assets/display/predef/gameObject.js";
import { QUESTION_TYPES } from "../assets/domain/mapGrid/questionTypes.js";

const PLAYERS_UPPER_PANEL_OBJECT_NAMES = "upperPanelP";

export function drawGameMainView(game) {
    drawUppermostPanel(game);
    drawUpperPanel(game);
    createMapGridPanel(game);
    drawMapFilterPanel(game);
}

export function drawPanelQuestion(game, question) {

    if(game.gameObjects.panelQuestions !== undefined) {
        delete game.gameObjects.panelQuestions;
    }

    game.gameObjects.panelQuestions = new Panel({x: 0, y: 545}, {x: game.gameWidth, y: 175}, "#111");
    var lblQuestion = new Label({x: 20, y:38}, question.theQuestion);
    lblQuestion.setFont("18px Arial");
    game.gameObjects.panelQuestions.addChild(lblQuestion);
    if (question.theAnswers.length === 2) {  // True or False
        var buttonAnswer0 = Button.createButtonText({x: 20, y: 80}, question.theAnswers[0], {x: 570, y: 40});
        var buttonAnswer1 = Button.createButtonText({x: game.gameWidth - 20 - 570, y: 80}, question.theAnswers[1], {x: 570, y: 40});
        game.gameObjects.panelQuestions.addChild(buttonAnswer0);
        game.gameObjects.panelQuestions.addChild(buttonAnswer1);
    } else {    // 4 Possible Answers
        var buttonAnswer0 = Button.createButtonText({x: 20, y: 55}, question.theAnswers[0], {x: 570, y: 40});
        var buttonAnswer1 = Button.createButtonText({x: game.gameWidth - 20 - 570, y: 55}, question.theAnswers[1], {x: 570, y: 40});
        var buttonAnswer2 = Button.createButtonText({x: 20, y: 110}, question.theAnswers[2], {x: 570, y: 40});
        var buttonAnswer3 = Button.createButtonText({x: game.gameWidth - 20 - 570, y: 110}, question.theAnswers[3], {x: 570, y: 40});
        game.gameObjects.panelQuestions.addChild(buttonAnswer0);
        game.gameObjects.panelQuestions.addChild(buttonAnswer1);
        game.gameObjects.panelQuestions.addChild(buttonAnswer2);
        game.gameObjects.panelQuestions.addChild(buttonAnswer3);
    }

}

export function drawUppermostPanel(game) {
    removeBeforeRedraw(game, game.gameObjects.uppermostPanel);
    game.gameObjects.uppermostPanel =
            new Panel({x: 0, y: 0}, {x: game.gameWidth, y: 25}, "#222");
    var lblHoverInfo = new Label({x: 20, y: 18}, "");
    lblHoverInfo.setFont("15px Arial");
    game.gameObjects.uppermostPanel.addChild(lblHoverInfo);
    lblHoverInfo.setHoverInfotext = function(text) {
        lblHoverInfo.text = text;
    }
    game.gameObjects.uppermostPanel.lblInfo = lblHoverInfo;
    GameObject.GAME_DEFAULT_INFO_LABEL = lblHoverInfo;
    var buttonText = Button.createButtonText({x: 1190, y:0}, "MENU", {x: 90, y: 25});
    buttonText.addClickAction(function() {
        console.log("LBC");
        var question = getRandomQuestion(game);
        drawPanelQuestion(game, question);
        console.log(game.gameObjects);
    }, game.inputHandler);
    buttonText.buildLabelInfoText("GOTOMENU!", game.inputHandler);
    game.gameObjects.uppermostPanel.addChild(buttonText);
    
}

export function drawUpperPanel(game) {

    createPlayerUpperPanel(game, 1);
    createPlayerUpperPanel(game, 2);

    function createPlayerUpperPanel(game, playerNumber) {
        var upperPanelName = PLAYERS_UPPER_PANEL_OBJECT_NAMES + playerNumber;
        removeBeforeRedraw(game, game.gameObjects[upperPanelName]);
        switch(playerNumber) {
            case 1:
                game.gameObjects[upperPanelName] = new Panel({x: 0, y: 25}, {x: game.gameWidth / 2, y: 80}, "#666");
                break;
            case 2:
                game.gameObjects[upperPanelName] = new Panel({x: game.gameWidth / 2, y: 25}, {x: game.gameWidth / 2, y: 80}, "#888");
                break;
        }
        game.gameObjects[upperPanelName].buildLabelInfoText("Panel of Player: " + playerNumber, game.inputHandler);
        var labelPNumber = new Label({x: 10, y: 60}, "P" + playerNumber);
        labelPNumber.setFont("60px Arial");
        game.gameObjects[upperPanelName].addChild(labelPNumber);
        var labelPScore = new Label({x: 90, y: 30}, "Score: " + game.players[playerNumber - 1].score);
        labelPScore.setFont("20px Arial");
        game.gameObjects[upperPanelName].addChild(labelPScore);
        var labelPowerUps = new Label({x: 90, y: 60}, "Power Ups: ");
        labelPowerUps.setFont("20px Arial");
        game.gameObjects[upperPanelName].addChild(labelPowerUps);
        var powerUpsPanel = new Panel({x: 210, y: 38}, {x: 300, y: 30}, "#000");
        game.gameObjects[upperPanelName].addChild(powerUpsPanel);
    }

}

export function createMapGridPanel(game) {
    switch (game.ACTIVE_FILTER_INDEX) {
        case 0:
            drawDominatingPlayersGrid();
            break;
        case 1:
            drawQuestionCategoriesGrid();
            break;
        case 2:
            drawQuestionDifficultiesGrid();
            break;
    }
    function createDefaultGrid() {
        removeBeforeRedraw(game, game.gameObjects.mapGridPanel);
        game.gameObjects.mapGridPanel = new Panel(
            {x: 0, y: 105},
            {x: 1280, y: 400},
            "#222"
        );
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
        var powerUpsArray = getPowerUpsArray(game);
        var currentPowerUpInPlayersPanel = 0;
        for (var powerUp of powerUpsArray) {
            drawPowerUpInPlayerPanel(game.players[0], powerUp.value, currentPowerUpInPlayersPanel);
            drawPowerUpInPlayerPanel(game.players[1], powerUp.value, currentPowerUpInPlayersPanel);
            currentPowerUpInPlayersPanel++;
        }
        function drawPowerUpInPlayerPanel(player, powerUpValue, powerUpPanelIndexPosition) {
            var powerUpImage;
            if (player.powerUps[powerUpPanelIndexPosition]) {
                powerUpImage = GRID_POWER_UPS[powerUpValue].image_available;
            } else {
                powerUpImage = GRID_POWER_UPS[powerUpValue].image;
            }
            var panel = game.gameObjects[PLAYERS_UPPER_PANEL_OBJECT_NAMES + player.playerNumber].gameObjectsChildren[3];
            var powerUpImage = new UIImage({x: powerUpPanelIndexPosition * 30, y: 0}, powerUpImage, {x: 30, y: 30});
            panel.addChild(powerUpImage);
        }
    }
    function drawDominatingPlayersGrid() {
        createDefaultGrid();
        drawMapGridPowerUps();
        drawColorsForDominatingPlayers();
        
        function drawMapGridPowerUps() {
            var powerUpsArray = getPowerUpsArray(game);
            for (var powerUp of powerUpsArray) {
                drawPowerUpInGrid(powerUp.row, powerUp.col, powerUp.value);
            }
            function drawPowerUpInGrid(row, col, powerUpValue) {
                var gridPowerUp = GRID_POWER_UPS[powerUpValue];
                var powerUpImage = new UIImage({x: col * GRID_TILE_SIZE, y: row * GRID_TILE_SIZE}, gridPowerUp.image, {x: 80, y: 80});
                game.gameObjects.mapGridPanel.addChild(powerUpImage);
            }
        }

        function drawColorsForDominatingPlayers() {
            // Draw colors for each dominating player...
            var domPlayersGrid = game.mapGrid.grid.dominatingPlayer;
            for (var row = 0 ; row < GRID_DIMENSIONS.X ; row++) {
                for (var col = 0 ; col < GRID_DIMENSIONS.Y ; col++) {
                    var currGridPlayer = domPlayersGrid[row][col];
                    if(currGridPlayer !== null) {
                        var colorBuilder = "rgba(" + currGridPlayer.color.r + ", " + currGridPlayer.color.g + ", " + currGridPlayer.color.b + ", 0.5)";
                        var panelPlayer = new Panel({x: col * GRID_TILE_SIZE, y: row * GRID_TILE_SIZE}, {x: GRID_TILE_SIZE, y: GRID_TILE_SIZE}, colorBuilder);
                        game.gameObjects.mapGridPanel.addChild(panelPlayer);
                    }
                }
            }
        }
    }
    function drawQuestionCategoriesGrid() {
        createDefaultGrid();
        var categoriesGrid = game.mapGrid.grid.questionTypes;
        for(var col = 0 ; col < GRID_DIMENSIONS.X ; col++) {
            for(var row = 0 ; row < GRID_DIMENSIONS.Y ; row++) {
                var currPosition = {x: GRID_TILE_SIZE * row, y: GRID_TILE_SIZE * col};
                var defaultSize = {x: GRID_TILE_SIZE, y: GRID_TILE_SIZE};
                var currCategory = QUESTION_TYPES[categoriesGrid[col][row]];
                var catImage = new UIImage(currPosition, currCategory.image, defaultSize);
                catImage.category = currCategory;
                catImage.buildLabelInfoText(catImage.category.descriptor, game.inputHandler);
                game.gameObjects.mapGridPanel.addChild(catImage);
            }
        }
    }
    function drawQuestionDifficultiesGrid() {
        var questionDifficulties = game.mapGrid.grid.questionDifficulties;
        for(var col = 0 ; col < GRID_DIMENSIONS.X ; col++) {
            for(var row = 0 ; row < GRID_DIMENSIONS.Y ; row++) {
                var currPosition = {x: GRID_TILE_SIZE * row, y: GRID_TILE_SIZE * col};
                var defaultSize = {x: GRID_TILE_SIZE, y: GRID_TILE_SIZE};
                var qDifficulty = QUESTION_DIFFICULTIES[questionDifficulties[col][row]];
                var qDifPanel = new Panel(currPosition, defaultSize, qDifficulty.color);
                game.gameObjects.mapGridPanel.addChild(qDifPanel);
            }
        }
    }
}

export function drawMapFilterPanel(game) {
    removeBeforeRedraw(game, game.gameObjects.mapFilterPanel);
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
        var filterImage;
        if (i === game.ACTIVE_FILTER_INDEX) {
            filterImage = GRID_FILTER_OPTIONS[i].image.activated;
        } else {
            filterImage = GRID_FILTER_OPTIONS[i].image.deactivated;
        }
        var xPosition = (filterButtonStartPosX + i * filterButtonSize) + (filterButtonRightMarginX * (i + 1));
        var filterButton = Button.createButtonImageFixedSize(
            {x: xPosition, y: 5},
            filterImage,
            {x: filterButtonSize, y: filterButtonSize}
        );
        filterButton.iValue = i;
        filterButton.addClickAction(function() {
            game.ACTIVE_FILTER_INDEX = this.iValue;
            game.mustUpdateView = true;
            console.log("OK");
            console.log(game.inputHandler);
        }, game.inputHandler);
        game.gameObjects.mapFilterPanel.addChild(filterButton);

    }
}

function removeBeforeRedraw(game, motherObject) {
    if(motherObject !== undefined) {
        game.inputHandler.remove(motherObject);
        for(var gObjC of motherObject.gameObjectsChildren) {
            game.inputHandler.remove(gObjC);
        }
    }
}