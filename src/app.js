import {Application} from 'pixi.js';
import {Layer} from './layer/Layer';
import SpriteEntity from './core/SpriteEntity';
import $ from 'jquery';
import _ from 'underscore';
var Vue = require("vue");
/**
 * Basic wrapper around PIXI application
 */
export class App extends Application {
    constructor(width, height, options) {
        width = width || window.innerWidth;
        height = height || window.innerHeight;
        options = options || {};
        super(width, height, options);
        this.entities = [];
        this.entityId = 1;
        document.body.appendChild(this.view);
        window.addEventListener('resize', this.resize.bind(this));
        PIXI.utils.clearTextureCache();
        new Vue({
            'el': '#app',
            data: {
                entity: {},
                entities: []
            },
            methods: {
                toggleEntity: this.toggleEntity.bind(this)
            }
        });
        Vue.component('entity-details', {
            props: [
                'entity'
            ],
            template: '<div>Hier komt een titel ({{entity.name}}) en wat info?<button class="btn btn-primary" v-on:click="$emit(\'save-entity\');"</div>'
        });
        this.Vue = Vue;
        this.Vue.entities = this.entities;
    }

    /**
     * Add a entity/object to the current selected layer
     * @todo move html UI to other class
     * @param entity
     */
    addChild(entity) {
        entity.id = this.entityId++;
        entity.type = entity.type || entity.constructor.name;
        entity.name = entity.name || 'New ' + entity.type;
        this.stage.addChild(entity);
        this.entities.push(entity);
    }

    /**
     * Function after window is resized
     */
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    /**
     * Create a new layer
     */
    newLayer() {
        let layer = new PIXI.Container();
        this.addChild(layer);
    }

    /**
     * Create a new (default) entity (PIXI Sprite)
     * @todo create new base class for Sprite
     */
    newEntity() {
        let entity = new SpriteEntity();
        console.log(entity);
        this.addChild(entity);
    }

    requestTexture(event) {
        let url = prompt('Give url for image.');
        if (url === null || url === '') {
            return;
        }
        let entityDetails = $(event.target.parentElement).data('dnd');
        this.changeTextureEntity(entityDetails.id, url);
    }

    changeTextureEntity(id, textureUrl) {
        let entity = this.getEntityById(id);
        if (entity.type !== 'Sprite') {
            console.warn('No sprite. Cannot change texture.');
            return;
        }
        entity.textureUrl = textureUrl;
        if (PIXI.loader.resources.hasOwnProperty(textureUrl)) {
            entity.texture = PIXI.loader.resources[textureUrl];
            return;
        }
        PIXI.loader.add(textureUrl);
        PIXI.loader.load(function(loader, resources) {
            this.texture = PIXI.loader.resources[this.textureUrl].texture;
        }.bind(entity));
    }

    /**
     * Get the element by its ID
     * @param id
     */
    getEntityById(id) {
        return _.findWhere(this.entities, {id: id});
    }

    /**
     * Show hide a entity.
     * @param entityId the id of the entity
     */
    toggleEntity(entityId) {
        let entity = this.getEntityById(entityId);
        entity.visible = !entity.visible === true;
        console.log(entity.visible);
    }

    save() {

    }

    load(json) {

    }
}