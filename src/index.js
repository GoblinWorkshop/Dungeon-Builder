import * as PIXI from 'pixi.js';
import * as Viewport from 'pixi-viewport';

// add the viewport to the stage
let WIDTH = 1000;
let HEIGHT = 1000;
let app = new PIXI.Application();
let viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: WIDTH,
    worldHeight: HEIGHT,

    interaction: app.renderer.interactio
});
document.body.appendChild(app.view);

app.stage.addChild(viewport);

viewport
    .drag()
    .pinch()
    .wheel()
    .clamp({
        direction: 'all'
    })
    .bounce();
function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    viewport.resize(window.innerWidth, window.innerHeight, WIDTH, HEIGHT)
}


window.addEventListener('resize', resize);
resize();

// add a red box
let sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
sprite.tint = 0xff0000;
sprite.width = sprite.height = 10;
sprite.position.set(10, 10);
let sprite2 = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
sprite.tint = 0xff0000;
sprite.width = sprite.height = 10;
sprite.position.set(WIDTH-10, HEIGHT-10);