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

    update(deltaTime) {
        
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
    }

}