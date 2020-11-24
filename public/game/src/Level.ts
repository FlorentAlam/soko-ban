import { MAP_VALUE_ASSOC, SCALED_TILE, TILE_QUANTITY } from "./constantes.js";
import { levels } from "./levels";
import MoveableObject from "./MoveableObject";
import Player from "./Player";
import SpriteFactory from "./SpriteFactory";

export default class Level {
    private _assets: SpriteFactory;
    private _level: number;
    public items: PIXI.Sprite[];

    constructor(assets: SpriteFactory){
        this._assets = assets;
        this.items = [];
        this._level = 0;
        this._initLevel();
    }

    _initLevel(){
        this._loopMap(this._populateFloor.bind(this));
        this._loopMap(this._populateTarget.bind(this));
        this._loopMap(this._populateLastLayer.bind(this));
    }

    _loopMap(fn: (i: number, j: number) => void){
        for(let i = 0; i < TILE_QUANTITY; i++){
            for(let j = 0; j < TILE_QUANTITY; j++){
                fn(i, j);
            }
        }
    }

    _populateFloor(i: number, j: number){
        this._create({x: j * SCALED_TILE, y: i * SCALED_TILE}, 'sol_1');
    }
    _populateTarget(i: number, j: number){
        if(levels[this._level][i][j] === 'tb'){
            this._create({x: j * SCALED_TILE, y: i * SCALED_TILE}, MAP_VALUE_ASSOC.tb);
        }
    }
    _populateLastLayer(i: number, j: number){
        let mapValue = levels[this._level][i][j];
        if(mapValue && mapValue !== 'tb'){
            this._create({x: j * SCALED_TILE, y: i * SCALED_TILE}, MAP_VALUE_ASSOC[mapValue]);
        }
    }

    _create(position: {x: number, y: number}, name: string){
        let sprite: PIXI.Sprite = this._assets.createSprites(name);
        sprite.position.x = position.x;
        sprite.position.y = position.y;
        this.items.push(sprite);

        if(name === "char_bottom_1"){
            levels[0][sprite.position.y / SCALED_TILE][sprite.position.x / SCALED_TILE] = new Player(sprite, this._assets);
        }
        if(name === "caisse_blue"){
            levels[0][sprite.position.y / SCALED_TILE][sprite.position.x / SCALED_TILE] = new MoveableObject(sprite);
        }
    }
}