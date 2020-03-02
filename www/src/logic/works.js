import { ALL_TRIVIA_QUESTIONS } from "../../allTriviaQuestions.triviaQuestions";

export function getRandomQuestion() {
    var randQuest = ALL_TRIVIA_QUESTIONS[Math.floor(Math.random() * ALL_TRIVIA_QUESTIONS.length)];
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
                    var aux = rand1;
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