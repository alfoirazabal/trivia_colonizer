export default class InputHandler {

    constructor(game) {
        this.game = game;

        var inputHandler = this;

        this.clickableObjects = [];
        this.hoverableObjects = [];

        document.addEventListener("keydown", function(event) {
            switch(event.keyCode) {
            }
        });

        document.addEventListener("click", function(event) {
            inputHandler.runClickOnGameObject(event);
        });

        document.addEventListener("mousemove", function(event) {
            inputHandler.runHoverOnGameObject(event);
        });

    }

    runClickOnGameObject(event) {
        var ran = false;
        for(var i = 0 ; !ran && i < this.clickableObjects.length ; i++) {
            if(this.clickableObjects[i].size !== undefined) {
                const x = event.clientX;
                const y = event.clientY;
                if(this.clickableObjects[i].position.x <= x && this.clickableObjects[i].position.y <= y) {
                    const limitXObj = this.clickableObjects[i].position.x + this.clickableObjects[i].size.x;
                    const limitYObj = this.clickableObjects[i].position.y + this.clickableObjects[i].size.y;
                    if(limitXObj >= x && limitYObj >= y) {
                        this.clickableObjects[i].triggerClick();
                        ran = true;
                    }
                }
            }
        }
    }

    runHoverOnGameObject(event) {
        for(var hoverableObject of this.hoverableObjects) {
            if(hoverableObject.size !== undefined) {
                const x = event.clientX;
                const y = event.clientY;
                const limitXObj = hoverableObject.position.x + hoverableObject.size.x;
                const limitYObj = hoverableObject.position.y + hoverableObject.size.y;
                if(hoverableObject.position.x <= x && hoverableObject.position.y <= y) {
                    if(limitXObj >= x && limitYObj >= y) {
                        hoverableObject.triggerHover();
                        hoverableObject.triggerHoverLabelInfo();
                    }
                }
            }
        }
    }

    remove(object) {
        this.clickableObjects = this.clickableObjects.filter(e => e !== object);
        this.hoverableObjects = this.hoverableObjects.filter(e => e !== object);
        console.log(this.clickableObjects.map(e => e.position));
        console.log(this.hoverableObjects.map(e => e.position));
    }

}