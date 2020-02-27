import GameObject from "./gameObject.js";
import newPositionFromRelative from "./helpers.js";

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

    createChildPanel(relativePosition, size, color) {
        const newPos = newPositionFromRelative(this.position, relativePosition);
        const newPanel = new Panel(newPos, size, color);
        this.gameObjectsChildren.push(newPanel);
        return newPanel;

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