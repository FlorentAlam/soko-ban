import { SCALED_TILE, SPEED } from "./constantes.js";
import { levels } from "./levels";
import Object from "./MoveableObject";
import SpriteFactory from "./SpriteFactory.js";
import {socket} from "./socket.js";

export default class Player extends Object{
    private _position: {[key: string]: PIXI.Sprite};
    private _positionId: number;
    private _elapsedTime: number;
    private _lastTime: number;

    constructor(sprite: PIXI.Sprite, assets: SpriteFactory){
        super(sprite);
        this.move = this.move.bind(this);
        this._lastTime = new Date().getTime();
        this._elapsedTime = 0;
        this._position = {
            char_bottom_1: assets.createSprites('char_bottom_1'),
            char_bottom_2: assets.createSprites('char_bottom_2'),
            char_bottom_3: assets.createSprites('char_bottom_3'),

            char_top_1: assets.createSprites('char_top_1'),
            char_top_2: assets.createSprites('char_top_2'),
            char_top_3: assets.createSprites('char_top_3'),

            char_left_1: assets.createSprites('char_left_1'),
            char_left_2: assets.createSprites('char_left_2'),
            char_left_3: assets.createSprites('char_left_3'),

            char_right_1: assets.createSprites('char_right_1'),
            char_right_2: assets.createSprites('char_right_2'),
            char_right_3: assets.createSprites('char_right_3')
        }
        // console.log(this._position.char_bottom_1.texture);
        // console.log(this._object);
        this._positionId = 1;
        this._initControls();
        requestAnimationFrame(this.move);
    }

    _initControls(){
        const possible_movements = {
            "left_arrow": {x: -1},
            "right_arrow": {x: 1},
            "bottom_arrow": {y: 1},
            "top_arrow": {y: -1}
        }
        // const possible_movements = {
        //     "ArrowLeft": {x: -1},
        //     "ArrowRight": {x: 1},
        //     "ArrowDown": {y: 1},
        //     "ArrowUp": {y: -1}
        // }
        socket.on('clicked', (button) => {
            if(!this._speed.x && !this._speed.y){
                if(!this.isColliding({...possible_movements[button]})){
                    for(const key in possible_movements[button]){
                        this.updateSpeed({[key]: possible_movements[button][key] * SPEED});
                    }
                }
            }
        });
        // window.addEventListener('keydown', (e) => {
        //     if(!this._speed.x && !this._speed.y){
        //         if(!this.isColliding({...possible_movements[e.code]})){
        //             for(const key in possible_movements[e.code]){
        //                 this.updateSpeed({[key]: possible_movements[e.code][key] * SPEED});
        //             }
        //         }
        //     }
        // });

        
    }

    move(){
        if(Math.abs(this._object.position.x - this._lastPosition.x) >= SCALED_TILE || Math.abs(this._object.position.y - this._lastPosition.y) >= SCALED_TILE){
            this._speed = {
                x: 0,
                y: 0
            }
            this._lastPosition.x = this._object.position.x;
            this._lastPosition.y = this._object.position.y;
        } else {
            if(this._elapsedTime >= 15){
                if(this._speed.x !== 0 || this._speed.y !== 0){
                    if(this._positionId === 3){
                        this._positionId = 1;
                    } else this._positionId++;
                    let direction = "";
                    if(this._speed.x === -SPEED) direction = "left";
                    if(this._speed.x === SPEED) direction = "right";
                    if(this._speed.y === -SPEED) direction = "top";
                    if(this._speed.y === SPEED) direction = "bottom";
                    this._object.texture = this._position[`char_${direction}_${this._positionId}`].texture;
                }
                this._elapsedTime = 0;
            }
            this._object.position.x += this._speed.x;
            this._object.position.y += this._speed.y;
        }
        this._elapsedTime++;
        requestAnimationFrame(this.move);
    }
}