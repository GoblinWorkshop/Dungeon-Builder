import {Application} from 'pixi.js';
import {Layer} from './layer/Layer';
import $ from 'jquery';
import _ from 'underscore';
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
        PIXI.utils.clearTextureCache ();
    }

    /**
     * Add a entity/object to the current selected layer
     * @todo move html UI to other class
     * @param entity
     */
    addChild(entity) {
        entity.id = this.entityId++;
        entity.type = entity.constructor.name;
        entity.name = entity.name || 'New ' + entity.type;
        this.stage.addChild(entity);
        this.entities.push(entity);

        // Move this to seperate function (in UI)
        let icon = 'far fa-folder';
        switch (entity.type) {
            case 'Sprite':
                icon = 'far fa-file';
            break;

        }
        let element = $(document.createElement('div'));
        element.data('dnd', {
            id: entity.id,
            name: entity.name,
            type: entity.type
        });
        element.addClass('entity');
        element.append(
            $(document.createElement('i'))
                .addClass('far fa-eye')
                .on('click', this.toggleEntity.bind(this))
        );
        element.append(
            $(document.createElement('i'))
                .addClass(icon)
                .on('click', this.requestTexture.bind(this))
        );
        element.append(
            $(document.createElement('span'))
                .append(entity.name)
        );
        $('#entities').append(element);
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
        let entity = new PIXI.Sprite();
        entity.anchor.set(0.5);
        entity.interactive = true;
        entity
            .on('pointerdown', function(event) {
                this.data = event.data;
                this.alpha = 0.5;
                this.dragging = true;
            })
            .on('pointerup', function() {
                this.alpha = 1;
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
            })
            .on('pointerupoutside', function() {
                this.alpha = 1;
                this.dragging = false;
                // set the interaction data to null
                this.data = null;
            })
            .on('pointermove', function() {
                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent);
                    this.x = newPosition.x;
                    this.y = newPosition.y;
                }
            });
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
     * @param event Click event. Should be the entity itself?
     */
    toggleEntity(event) {
        let entityDetails = $(event.target.parentElement).data('dnd');
        let entity = this.getEntityById(entityDetails.id);
        $(event.target).removeClass();
        if (entity.visible === true) {
            entity.visible = false;
            $(event.target).addClass('far fa-eye-slash');
        }
        else {
            entity.visible = true;
            $(event.target).addClass('far fa-eye');
        }
    }

    save() {

    }

    load(json) {

    }
}