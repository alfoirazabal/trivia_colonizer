import GameObject from "../src/assets/display/predef/gameObject.js";

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
                if(
                    this.clickableObjects[i].position.x <= x && 
                    this.clickableObjects[i].position.y <= y
                ) {
                    const limitXObj = this.clickableObjects[i].position.x + 
                        this.clickableObjects[i].size.x;
                    const limitYObj = this.clickableObjects[i].position.y + 
                        this.clickableObjects[i].size.y;
                    if(limitXObj >= x && limitYObj >= y) {
                        this.clickableObjects[i].triggerClick();
                        ran = true;
                    }
                }
            }
        }
    }

    runHoverOnGameObject(event) {
        var ran = false;
        for(var i = 0 ; !ran && i < this.hoverableObjects.length ; i++) {
            if(this.hoverableObjects[i].size !== undefined) {
                const x = event.clientX;
                const y = event.clientY;
                const limitXObj = this.hoverableObjects[i].position.x + 
                    this.hoverableObjects[i].size.x;
                const limitYObj = this.hoverableObjects[i].position.y + 
                    this.hoverableObjects[i].size.y;
                if(this.hoverableObjects[i].position.x <= x && 
                    this.hoverableObjects[i].position.y <= y
                ) {
                    if(limitXObj >= x && limitYObj >= y) {
                        this.hoverableObjects[i].triggerHover();
                        this.hoverableObjects[i].triggerHoverLabelInfo();
                        ran = true;
                    }
                }
            }
        }
        if(!ran) {
            GameObject.GAME_DEFAULT_INFO_LABEL.text = "";
        }
    }

    remove(object) {
        this.clickableObjects = 
            this.clickableObjects.filter(e => e !== object);
        this.hoverableObjects = 
            this.hoverableObjects.filter(e => e !== object);
    }

}