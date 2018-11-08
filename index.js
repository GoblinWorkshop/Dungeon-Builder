import Engine from './src/app';
import {Block} from './src/core';

let App = new Engine();
App.run();
// Test
let block = Block.fromImage('images/box-001.png');
App.addEntity(block);