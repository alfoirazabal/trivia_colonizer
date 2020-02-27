import Panel from "./panel.js";
import newPositionFromRelative from "./helpers.js";
import Button from "./button.js";

export default class GameObject {

    constructor(position) {
        this.position = position;
    }

    update(deltaTime) {
        // Nothing to Update
    }

    draw(ctx) {
        // Nothing to Draw
    }

    hover() {
        // Overridable
    }

    click() {
        // Overridable
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
        return newButtonImage;
    }

    createChildButtonText(relativePosition, text) {
        const newPosition = 
                newPositionFromRelative(this.position, relativePosition);
        const newButtonText = new Button(newPosition, null, text, null);
        return newButtonText;
    }

    createChildButtonImageText(relativePosition, image, text) {
        const newPosition = 
                newPositionFromRelative(this.position, relativePosition);
        const newButtonImageText = new Button(newPosition, image, text, null);
        return newButtonImageText;
    }

    createChildLabel(relativePosition, text) {
        const newPosition = 
                newPositionFromRelative(this.position, relativePosition);
        //const newLabel = new Label(newPosition, text);
        //return newPosition;
    }

    createChildPanel(relativePosition, size, color) {
        const newPosition =
                newPositionFromRelative(this.position, relativePosition);
        const newPanel = new Panel(newPosition, size, color);
        return newPanel;
    }

}