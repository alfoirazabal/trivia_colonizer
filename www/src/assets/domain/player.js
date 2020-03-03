export default class Player {

    constructor(game, color) {
        this.game = game;
        this.score = 0;
        this.powerUps = [
            false, false, false, false, false,
            false, false, false, false, false
        ];
        this.color = color;
    }

}