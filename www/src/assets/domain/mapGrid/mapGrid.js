import { QUESTION_TYPES } from "./questionTypes.js";
import { GRID_POWER_UPS } from "./gridPowerUps.js";

export const GRID_DIMENSIONS = {
    X: 5,
    Y: 16
};

export const GRID_TILE_SIZE = 80;   //80px x 80px

export const GRID_POSITION_COLORS = ["#444", "#333"];

export const QUESTION_DIFFICULTIES = {
    0: {name: "easy", color: "#0f0"},
    1: {name: "medium", color: "#ff0"},
    2: {name: "hard", color: "#f00"}
};

export const TOTAL_N_OF_POWER_UPS = 10; // On the Grid

export default class MapGrid {

    constructor(game) {
        this.game = game;
        var dominatingPlayer = this.createDominatingPlayersGrid();
        var questionTypes = this.createQuestionTypesGrid();
        var questionDifficulties = this.createQuestionDifficultiesGrid();
        var powerUpsGrid = this.createPowerUpsGrid();
        this.grid = {
            dominatingPlayer,
            questionTypes,
            questionDifficulties,
            powerUpsGrid
        }
    }

    createDominatingPlayersGrid() {
        var grid = [];
        for(var row = 0 ; row < GRID_DIMENSIONS.X ; row++) {
            var currentRow = [];
            for(var col = 0 ; col < GRID_DIMENSIONS.Y ; col++) {
                currentRow.push(0);
            }
            grid.push(currentRow);
        }
        return grid;
    }

    createQuestionTypesGrid() {
        var grid = [];
        for(var row = 0 ; row < GRID_DIMENSIONS.X ; row++) {
            var currentRow = [];
            for(var col = 0 ; col < GRID_DIMENSIONS.Y ; col++) {
                var typeIndex = Math.floor(
                        Math.random() * Object.keys(QUESTION_TYPES).length
                );
                currentRow.push(typeIndex);
            }
            grid.push(currentRow);
        }
        return grid;
    }

    createQuestionDifficultiesGrid() {
        var grid = [];
        var currentDifficulty = 0;
        var difficultyIncrement = 1;
        for(var row = 0 ; row < GRID_DIMENSIONS.X ; row++) {
            var currentRow = [];
            for(var col = 0 ; col < GRID_DIMENSIONS.Y ; col++) {
                currentRow.push(currentDifficulty);
            }
            grid.push(currentRow);
            if (currentDifficulty === 
                    Object.keys(QUESTION_DIFFICULTIES).length - 1) {
                difficultyIncrement = -1;
            } else if (currentDifficulty === 0) {
                difficultyIncrement = 1;
            }
            currentDifficulty += difficultyIncrement;
        }
        return grid;
    }

    createPowerUpsGrid() {
        var grid = [];
        var gridPowerUps = [];
        for(var i = 0 ; i < TOTAL_N_OF_POWER_UPS ; i++) {
            var currPowerUp = {x: -1, y: -1};
            var currPowerUpValueInGrid = null;
            while(currPowerUpValueInGrid !== undefined) {
                var randX = Math.floor(Math.random() * GRID_DIMENSIONS.X);
                var randY = Math.floor(Math.random() * GRID_DIMENSIONS.Y);
                currPowerUp = {x: randX, y: randY};
                currPowerUpValueInGrid = gridPowerUps.find(e => {
                    return (
                        e.x === currPowerUp.x &&
                        e.y === currPowerUp.y
                    );
                });
            }
            gridPowerUps.push(currPowerUp);
        }
        for(var row = 0 ; row < GRID_DIMENSIONS.X ; row++) {
            var currRow = [];
            for(var col = 0 ; col < GRID_DIMENSIONS.Y ; col++) {
                var powerUpInPos = gridPowerUps.find(e => {
                    return (e.x === row && e.y === col);
                });
                if(powerUpInPos !== undefined) {
                    var powerUpKeys = Object.keys(GRID_POWER_UPS);
                    var randKeyIndex = Math.floor(Math.random() * powerUpKeys.length);
                    currRow[col] = randKeyIndex;
                } else {
                    currRow[col] = null;
                }
            }
            grid.push(currRow);
        }
        return grid;
    }

}