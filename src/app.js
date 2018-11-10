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
                .addClass('far fa-folder')
        );
        element.append(entity.name);
        $('#entities').append(element);
    }

    /**
     * Function after window is resized
     */
    resize() {
        this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    newLayer() {
        let layer = new PIXI.Container();
        this.addChild(layer);
    }

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
}