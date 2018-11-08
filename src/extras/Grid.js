import Sprite from 'pixi.js';

export default class Grid {
    constructor(width, height, app) {
        let grid = new PIXI.Graphics();
        grid.beginFill(0xff9900);
        grid.drawRect(0, 0, width, height);
        grid.endFill();
        let texture = new PIXI.Sprite(app.renderer.generateTexture(grid));
        return new PIXI.extras.TilingSprite(texture, 500, 500);
    }
}