import Panel from "./panel.js";
import newPositionFromRelative from "./helpers.js";

const DEFAULT_BUTTON_TEXT_SIZE = 12;    //12px
const DEFAULT_BUTTON_HORIZONTAL_MARGIN = 10;    //10px

export default class GameObject {

    constructor(position) {
        this.position = position;
        this.gameObjectsChildren = [];

        const thisObj = this;

        document.addEventListener("click", function(event) {
            const x = event.clientX;
            const y = event.clientY;
            if(thisObj.position.x <= x && thisObj.position.y <= y) {
                const limitXObj = thisObj.position.x + thisObj.size.x;
                const limitYObj = thisObj.position.y + thisObj.size.y;
                if(limitXObj >= x && limitYObj >= y) {
                    thisObj.triggerClick();
                }
            }
        })

        this.triggerClick = function(){};
        this.triggerHover = function(){};
    }

    update(deltaTime) {
        // Nothing to Update
    }

    draw(ctx) {
        // Nothing to Draw
    }

    createChildGameObject(relativePosition) {
        const newPosition = 
                newPositionFromRelative(this.position, relativePosition);
        const newGameObject = new GameObject(newPosition);
        return newGameObject;
    }

    createChildButtonImage(relativePosition, image, size) {
        const newPosition = 
                newPositionFromRelative(this.position, relativePosition);
        const newButtonImage = new Button(newPosition, image, null, size);
        this.gameObjectsChildren.push(newButtonImage);
        return newButtonImage;
    }

    createChildButtonText(relativePosition, text, size) {
        const newPosition = 
                newPositionFromRelative(this.position, relativePosition);
        const newButtonText = new Button(newPosition, null, text, size);
        this.gameObjectsChildren.push(newButtonText);
        return newButtonText;
    }

    createChildButtonImageText(relativePosition, image, text) {
        const newPosition = 
                newPositionFromRelative(this.position, relativePosition);
        const newButtonImageText = new Button(newPosition, image, text, size);
        this.gameObjectsChildren.push(newButtonImageText);
        return newButtonImageText;
    }

    createChildLabel(relativePosition, text) {
        const newPosition = 
                newPositionFromRelative(this.position, relativePosition);
        //const newLabel = new Label(newPosition, text);
        //return newPosition;
    }

    createChildPanel(relativePosition, size, color) {
        const newPos = newPositionFromRelative(this.position, relativePosition);
        const newPanel = new Panel(newPos, size, color);
        this.gameObjectsChildren.push(newPanel);
        return newPanel;
    }

}

export class Button extends GameObject {
    
    constructor(position, image, text, size) {
        super(position);

        this.color = "#fff";
        this.textColor = "#000";

        this.size = {};

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

    draw(ctx) {
        ctx.font = DEFAULT_BUTTON_TEXT_SIZE + "px Arial";
        ctx.fillStyle = this.color;
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
        ctx.fillStyle = this.textColor;
        ctx.fillText(
            this.text,
            this.position.x + DEFAULT_BUTTON_TEXT_SIZE,
            this.position.y + DEFAULT_BUTTON_TEXT_SIZE + 
                    (DEFAULT_BUTTON_TEXT_SIZE / 2)
        );
    }

}