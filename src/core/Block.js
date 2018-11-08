import Entity from './Entity';
import { mix } from '../functions';

export default class Block extends mix(Entity, PIXI.Sprite) {
    constructor() {
        super();
    }
}