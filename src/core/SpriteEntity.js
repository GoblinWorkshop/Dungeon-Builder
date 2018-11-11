import {Sprite} from 'pixi.js';

export default class SpriteEntity extends Sprite {
    constructor() {
        super();
        this.type = 'Sprite';
        this.anchor.set(0.5);
        this.interactive = true;
        this
            .on('pointerdown', function (event) {
                this.data = event.data;
                this.alpha = 0.5;
                this.dragging = true;
            })
            .on('pointerup', function () {
                this.alpha = 1;
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
            })
            .on('pointerupoutside', function () {
                this.alpha = 1;
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
            })
            .on('pointermove', function () {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent);
                    this.x = newPosition.x;
                    this.y = newPosition.y;
                }
            });
    }
}