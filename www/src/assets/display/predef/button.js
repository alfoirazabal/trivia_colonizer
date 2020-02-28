import GameObject from "./gameObject.js";

const DEFAULT_BUTTON_TEXT_SIZE = 12;    //12px
const DEFAULT_BUTTON_HORIZONTAL_MARGIN = 10;    //10px

export class Button extends GameObject {
    
    constructor(position, image, text, size) {
        super(position);

        const thisObj = this;

        this.hovering = false;
        document.addEventListener("mousemove", function(event) {
            const x = event.clientX;
            const y = event.clientY;
            if(thisObj.position.x <= x && thisObj.position.y <= y) {
                const limitXObj = thisObj.position.x + thisObj.size.x;
                const limitYObj = thisObj.position.y + thisObj.size.y;
                if(limitXObj >= x && limitYObj >= y) {
                    thisObj.triggerHover();
                    this.hovering = true;
                }
            } else {
                this.hovering = false;
            }
        });

        this.color = "#fff";
        this.textColor = "#000";

        if( size === null ){
            this.size = {};
        } else {
            this.size = size;
        }

        this.hoverColBackground = "#4f4";
        this.hoverColForeground = "#911";

        if(image === null) {
            this.buttonType = "text";
        } else if (text === null) {
            this.buttonType = "image";
        } else {
            this.buttonType = "imageText";
        }
        instanciateButton(this);

        function instanciateButton(button) {
            switch(button.buttonType) {
                case "text":
                    button.text = text;
                    // Size will be calculated based on text length
                    break;
                case "image":
                    button.image = image;
                    button.size = size;
                    break;
                case "imageText":
                    button.image = image;
                    button.text = text;
                    // Size will be calculated based on text length
            }
        }

        this.triggerClick = function(){};
        this.triggerHover = function(){};

    }

    update(deltaTime) {

    }

    setButtonWidth(width) {
        this.size.x = width;
    }

    setButtonHeight(height) {
        this.size.y = height;
    }

    setHoverColors(colorForeground, colorBackground) {
        this.hoverColForeground = colorForeground;
        this.hoverColBackground = colorBackground;
    }

    draw(ctx) {
        // BUG: this.hovering is never true inside this method
        ctx.font = DEFAULT_BUTTON_TEXT_SIZE + "px Arial";
        if (this.hovering) {
            ctx.fillStyle = this.hoverColBackground;
        } else {
            ctx.fillStyle = this.color;
        }
        if(this.size.x === undefined){
            this.size.x = ctx.measureText(this.text).width + 
                    DEFAULT_BUTTON_HORIZONTAL_MARGIN * 2;
        }
        if(this.size.y === undefined) {
            this.size.y = DEFAULT_BUTTON_TEXT_SIZE * 2;
        }
        ctx.fillRect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
        if (this.hovering) {
            ctx.fillStyle = this.hoverColForeground;
        } else {
            ctx.fillStyle = this.textColor;
        }
        ctx.fillText(
            this.text,
            this.position.x + DEFAULT_BUTTON_TEXT_SIZE,
            this.position.y + DEFAULT_BUTTON_TEXT_SIZE + 
                    (DEFAULT_BUTTON_TEXT_SIZE / 2)
        );
    }
    
    static createButtonText(position, text, size) {
        return new Button(position, null, text, size);
    }

}