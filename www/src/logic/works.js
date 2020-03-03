import { ALL_TRIVIA_QUESTIONS } from "../../allTriviaQuestions.triviaQuestions";
import { QUESTION_DIFFICULTIES, GRID_DIMENSIONS } from "../assets/domain/mapGrid/mapGrid.js";
import { QUESTION_TYPES } from "../assets/domain/mapGrid/questionTypes.js";

export function getRandomQuestionFiltered(difficulty, category) {
    var qDifficulty = QUESTION_DIFFICULTIES[difficulty].name;
    var qCategories = [];
    if (QUESTION_TYPES[category].subCategories.length === 0) {
        qCategories.push(QUESTION_TYPES[category].descriptor);
    } else {
        for(var qSubCat of QUESTION_TYPES[category].subCategories) {
            qCategories.push(qSubCat.descriptor);
        }
    }
    var filteredQuestions = ALL_TRIVIA_QUESTIONS.filter(e => {
        if (qCategories.includes(e.category) && e.difficulty === qDifficulty) {
            return true;
        } else {
            return false;
        }
    });
    var qFromFiltered = getQuestionFromFiltered(filteredQuestions);
    return qFromFiltered;
}

export function getRandomQuestion() {
    return getQuestionFromFiltered(ALL_TRIVIA_QUESTIONS);
}

export function getPowerUpsArray(game) {
    const powerUpsArray = [];
    for(var col = 0 ; col < GRID_DIMENSIONS.Y ; col++) {
        for(var row = 0 ; row < GRID_DIMENSIONS.X ; row++) {
            var powerUpValue = game.mapGrid.grid.powerUpsGrid[row][col];
            if (powerUpValue !== null) {
                powerUpsArray.push({
                    value: powerUpValue,
                    row,
                    col
                });
            }
        }
    }
    return powerUpsArray;
}

function getQuestionFromFiltered(triviaQuestions) {
    var randQuest = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    var randQuestionText = randQuest.question.split("&quot;").join("\"").split("&#039;").join("'");
    var answerValues = [];
    var correctAnswerIndex;
    if (randQuest.incorrect_answers.length === 1) {  // True or False
        correctAnswerIndex = Math.floor(Math.random() * 2);
        for(var i = 0 ; i < 2 ; i++) {
            if (i === correctAnswerIndex) {
                answerValues[i] = randQuest.correct_answer;
            } else {
                answerValues[i] = randQuest.incorrect_answers[0];
            }
        }
    } else {    // 4 Possible Answers
        var nBtnCorrectAnswer = Math.floor(Math.random() * 4);
        var currentIncorrectAnswerIndex = 0;
        var currentIncorrectAnswerIndexes = (() => {
            // Mixing of Fischer-Yates
            var randInd = [0, 1, 2];
            for(var i = 0 ; i < randInd.length ; i++) {
                for(var j = i ; j < randInd.length ; j++) {
                    var randIndex1 = Math.floor(Math.random() * randInd.length);
                    var randIndex2 = Math.floor(Math.random() * randInd.length);
                    var rand1 = randInd[randIndex1];
                    var rand2 = randInd[randIndex2];
                    randInd[randIndex1] = rand2;
                    randInd[randIndex2] = rand1;                   
                }
            }
            return randInd;
        })();
        for(var i = 0 ; i < 4 ; i++) {
            if (i === nBtnCorrectAnswer) {
                correctAnswerIndex = i;
                answerValues.push(randQuest.correct_answer);
            } else {
                answerValues.push(randQuest.incorrect_answers[currentIncorrectAnswerIndexes[currentIncorrectAnswerIndex]]);
                currentIncorrectAnswerIndex++;
            }
        }
    }
    var question = {
        theQuestion: randQuestionText,
        theAnswers : answerValues,
        correctAnswerIndex
    };
    return question;
}