import {Application} from 'pixi.js';
import {Layer} from './layer';

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
        this.entityId = 1;
        this.currentLayer = 'players';
        // Might wanna do this dynamic or user created
        this.layers = {
            dm: new Layer(),
            players: new Layer(),
            background: new Layer()
        };
        this.stage.addChild(this.layers.dm);
        this.stage.addChild(this.layers.players);
        this.stage.addChild(this.layers.background);
        document.getElementById('main').appendChild(this.view);
        this.initUi();
        this.initEvents();
    }

    /**
     * Create menu items
     */
    initUi() {
        let menu = document.createElement('ul');
        menu.setAttribute('id', 'menu');
        menu.setAttribute('class', 'side-bar');
        for (let layer in this.layers) {
            if (!this.layers.hasOwnProperty(layer)) {
                continue;
            }
            let layerElement = document.createElement('li');
            layerElement.setAttribute('class', 'menu-layer');
            layerElement.innerHTML = '<i class="far fa-eye"></i> <i class="far fa-folder-open"></i> ' + layer;
            let labelElement = document.createElement('ul');
            labelElement.setAttribute('class', 'menu-entities');
            labelElement.setAttribute('id', 'ui-layer-' + layer);
            layerElement.appendChild(labelElement);
            menu.appendChild(layerElement);
        }
        document.getElementById('menu').appendChild(menu);
    }

    initEvents() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    /**
     * Add a entity/object to the current selected layer
     * @param entity
     */
    addChild(entity) {
        entity.id = this.entityId++;
        entity.name = 'New entity';
        let liElement = document.createElement('li');
        liElement.setAttribute('id', 'layer-' + entity.id);
        liElement.innerHTML = entity.name;
        document.getElementById('ui-layer-' + this.currentLayer).appendChild(liElement);
        this.layers[this.currentLayer].addChild(entity);
    }

    /**
     * Function after window is resized
     */
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    run() {

    }
}