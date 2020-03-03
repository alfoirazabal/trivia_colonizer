import newPositionFromRelative from "./helpers.js";

export default class GameObject {

    static GAME_DEFAULT_INFO_LABEL;

    constructor(position) {
        this.position = position;
        this.gameObjectsChildren = [];

        const thisObj = this;

        document.addEventListener("click", function(event) {
            if(thisObj.size !== undefined) {
                const x = event.clientX;
                const y = event.clientY;
                if(thisObj.position.x <= x && thisObj.position.y <= y) {
                    const limitXObj = thisObj.position.x + thisObj.size.x;
                    const limitYObj = thisObj.position.y + thisObj.size.y;
                    if(limitXObj >= x && limitYObj >= y) {
                        thisObj.triggerClick();
                    }
                }
            }
        });

        document.addEventListener("mousemove", function(event) {
            if(thisObj.size !== undefined) {
                const x = event.clientX;
                const y = event.clientY;
                const limitXObj = thisObj.position.x + thisObj.size.x;
                const limitYObj = thisObj.position.y + thisObj.size.y;
                if(thisObj.position.x <= x && thisObj.position.y <= y) {
                    if(limitXObj >= x && limitYObj >= y) {
                        thisObj.triggerHover();
                        thisObj.triggerHoverLabelInfo();
                    }
                }
            }
        });

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

    buildLabelInfoText(labelInfoText) {
        this.labelInfoText = labelInfoText;
    }

}