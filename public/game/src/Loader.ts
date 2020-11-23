import SpriteFactory from "./SpriteFactory";
import Level from "./Level";
import { TILE_SCALE } from "./constantes.js";
// import * as PIXI from 'pixi.js';
import { Loader, Application } from 'pixi.js';

export default class SpriteLoader{
    private _app: Application;
    private _loader: Loader;
    public assets: SpriteFactory

    constructor(app: Application){
        this._app = app;
        this._loader = new Loader();
        this.assets = undefined;

        this._loader.add('map', './assets/sokoban.png');

        this._loader.load((loader, resources) => {
            this.assets = new SpriteFactory(resources.map.texture);
        });

        this._loader.onComplete.add(() => {
            let level = new Level(this.assets);
            for(let i = 0; i < level.items.length; i++){
                level.items[i].scale.set(TILE_SCALE);
                this._app.stage.addChild(level.items[i]);
            }
        });
    }
}