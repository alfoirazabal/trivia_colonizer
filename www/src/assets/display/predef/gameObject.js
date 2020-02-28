import newPositionFromRelative from "./helpers.js";

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
        });

        this.triggerClick = function(){};
        this.triggerHover = function(){};
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
    }

    addChildFixedPosition(gameObject) {
        this.gameObjectsChildren.push(gameObject);
    }

}