export default class Player {

    constructor(game, playerNumber, colorR, colorG, colorB) {
        this.game = game;
        this.score = 0;
        this.powerUps = [
            false, false, false, false, false,
            false, false, false, false, false
        ];
        this.playerNumber = playerNumber;
        this.color = {
            r: colorR,
            g: colorG,
            b: colorB
        };
    }

}