import GameObject from "./gameObject.js";

export default class Panel extends GameObject {

    constructor(position, size, color) {
        super(position);

        this.size = size;

        if(color === undefined || color === null) {
            this.color = "rgba(0, 0, 0, 1)";
        } else {
            this.color = color;
        }

        this.gameObjectsChildren = [];

    }

    update(deltaTime) {
        for(let gameObjectChild of this.gameObjectsChildren) {
            gameObjectChild.update(deltaTime);
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        for(let gameObjectChild of this.gameObjectsChildren) {
            gameObjectChild.draw(ctx);
        }
    }

}