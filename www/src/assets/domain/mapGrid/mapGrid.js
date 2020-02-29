import { QUESTION_TYPES } from "./questionTypes.js";

export const GRID_DIMENSIONS = {
    X: 5,
    Y: 16
};

export const QUESTION_DIFFICULTIES = {
    0: {name: "easy", color: "#0f0"},
    1: {name: "medium", color: "#ff0"},
    2: {name: "hard", color: "#f00"}
};

export default class MapGrid {

    constructor(game) {
        this.game = game;
        this.grid = {
            dominatingPlayer = createDominatingPlayersGrid(),
            questionTypes = createQuestionTypesGrid(),
            questionDifficulties = createQuestionDifficultiesGrid()
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

}