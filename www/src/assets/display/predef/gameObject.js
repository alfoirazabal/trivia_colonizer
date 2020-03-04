import newPositionFromRelative from "./helpers.js";

export default class GameObject {

    static GAME_DEFAULT_INFO_LABEL;

    constructor(position) {
        this.position = position;
        this.gameObjectsChildren = [];

        const thisObj = this;

        this.triggerClick = function(){};
        this.triggerHover = function(){};
        this.triggerHoverLabelInfo = function() {   
            if (thisObj.labelInfoText !== undefined) {
                GameObject.GAME_DEFAULT_INFO_LABEL.text = thisObj.labelInfoText;
            } else {                
                GameObject.GAME_DEFAULT_INFO_LABEL.text = "";
            }
        }
    }

    update(deltaTime) {
        // Nothing to Update
    }

    draw(ctx) {
        // Nothing to Draw
    }

    addChild(gameObject) {
        gameObject.position = newPositionFromRelative(
                this.position, gameObject.position
        );
        this.gameObjectsChildren.push(gameObject);
        return gameObject;
    }

    addChildFixedPosition(gameObject) {
        this.gameObjectsChildren.push(gameObject);
    }

    buildLabelInfoText(labelInfoText, inputHandler) {
        inputHandler.hoverableObjects.push(this);
        this.labelInfoText = labelInfoText;
    }

    addClickAction(func, inputHandler) {
        inputHandler.clickableObjects.push(this);
        this.triggerClick = func;
    }

    addHoverAction(func, inputHandler) {
        inputHandler.hoverableObjects.push(this);
        this.triggerHover = func;
    }

}