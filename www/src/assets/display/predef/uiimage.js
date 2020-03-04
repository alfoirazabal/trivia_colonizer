import GameObject from "./gameObject.js";

export default class UIImage extends GameObject {

    constructor(position, image, size) {

        super(position);

        this.image = image;
        this.size = size;

        if (this.image === undefined || this.image === null) {
            this.image = document.getElementById("img_undef_icon");
        }

        if (this.size === undefined || this.size === null) {
            this.size = {
                x: this.image.width,
                y: this.image.height
            };
        }

    }

    setTransparency(transparency) {
        this.transparency = 0.5;
    }

    update(deltaTime) {
        
    }

    draw(ctx) {
        if(!this.transparency !== undefined) {
            ctx.globalAlpha = 0.5;
        }
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
        ctx.globalAlpha = 1;
    }

}