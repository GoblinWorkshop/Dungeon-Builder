import {Container, Application} from 'pixi.js';

/**
 * The application.
 */
export default class extends PIXI.Application {
    constructor(width, height, options) {
        width = width || window.innerWidth;
        height = height || window.innerHeight;
        options = options || {
            autoResize: true,
            background: 0xff9900
        };
        super(width, height, options);
        // Might wanna do this dynamic or user created
        this.layers = {
            dm: new PIXI.Container(),
            players: new PIXI.Container(),
            background: new PIXI.Container()
        };
        this.stage.addChild(this.layers.dm);
        this.stage.addChild(this.layers.players);
        this.stage.addChild(this.layers.background);
        document.body.appendChild(this.view);
        window.addEventListener('resize', this.resize.bind(this));
    }

    /**
     * Function after window is resized
     */
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    run() {

    }

    /**
     * Add an entity to the scene.
     * @param entity
     * @param to
     */
    addEntity(entity, to) {
        this.layers.players.addChild(entity);
    }
}