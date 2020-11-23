import { SCALED_TILE, TILE_QUANTITY } from "./constantes.js";
import { levels } from "./levels";
import MoveableObject from "./MoveableObject";
import Player from "./Player";
import SpriteFactory from "./SpriteFactory";

export default class Level {
    private _assets: SpriteFactory;
    public items: PIXI.Sprite[];

    constructor(assets: SpriteFactory){
        this._assets = assets;
        this.items = [];

        this._initLevel(0);
    }

    _initLevel(level_number: number){
        for(let i = 0; i < TILE_QUANTITY; i++){
            for(let j = 0; j < TILE_QUANTITY; j++){
                this.create({x: j * SCALED_TILE, y: i * SCALED_TILE}, 'sol_1');
            }
        }
        for(let i = 0; i < TILE_QUANTITY; i++){
            for(let j = 0; j < TILE_QUANTITY; j++){
                if(levels[level_number][i][j] === 't'){
                    this.create({x: j * SCALED_TILE, y: i * SCALED_TILE}, 'target_blue');
                }
            }
        }
        for(let i = 0; i < TILE_QUANTITY; i++){
            for(let j = 0; j < TILE_QUANTITY; j++){
                if(levels[level_number][i][j] === 1){
                    this.create({x: j * SCALED_TILE, y: i * SCALED_TILE}, 'caisse_red');
                } else if(levels[level_number][i][j] === 'c'){
                    this.create({x: j * SCALED_TILE, y: i * SCALED_TILE}, 'char_bottom_1');
                } else if(levels[level_number][i][j] === 2){
                    this.create({x: j * SCALED_TILE, y: i * SCALED_TILE}, 'caisse_blue');
                }
            }
        }
    }

    create(position: {x: number, y: number}, name: string){
        let sprite: PIXI.Sprite = this._assets.createSprites(name);
        sprite.position.x = position.x;
        sprite.position.y = position.y;
        this.items.push(sprite);

        if(name === "char_bottom_1"){
            levels[0][sprite.position.y / SCALED_TILE][sprite.position.x / SCALED_TILE] = new Player(sprite);
        }
        if(name === "caisse_blue"){
            levels[0][sprite.position.y / SCALED_TILE][sprite.position.x / SCALED_TILE] = new MoveableObject(sprite);
        }
    }
}