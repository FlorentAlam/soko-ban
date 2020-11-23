import { APPLICATION_SIZE } from "./constantes.js";
import { Application } from 'pixi.js';
import SpriteLoader from "./Loader";

// const socket = io();

let app = new Application({width: APPLICATION_SIZE, height: APPLICATION_SIZE, antialias: true});
document.body.appendChild(app.view);

new SpriteLoader(app);