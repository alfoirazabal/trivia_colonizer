import GameObject from "./gameObject.js";

export class Label extends GameObject {

    constructor(position, text) {

        super(position);

        this.text = text;

        this.font = "12px Arial";

        this.color = "#fff";

    }

    update(deltaTime) {
        
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(
            this.text, this.position.x, this.position.y
        );
    }

    setFont(newFont) {
        this.font = newFont;
    }

    setColor(newColor) {
        this.color = newColor;
    }

}