import Engine from './src/app';
import {Sprite} from 'pixi.js';

let App = new Engine();
App.run();
// Test
let block = PIXI.Sprite.fromImage('images/box-001.png');
App.addChild(block);