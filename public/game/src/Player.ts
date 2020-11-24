import { SCALED_TILE, SPEED, CHAR_POSITIONS } from "./constantes.js";
import Object from "./MoveableObject";
import SpriteFactory from "./SpriteFactory.js";
// import {socket} from "./socket.js";

export default class Player extends Object{
    private _position: {[key: string]: PIXI.Sprite};
    private _positionId: number;
    private _elapsedTime: number;
    private _direction: string;

    constructor(sprite: PIXI.Sprite, assets: SpriteFactory){
        super(sprite);
        
        this._initVariables(assets);
        this._initKeyboardControls();

        this.move = this.move.bind(this);
        requestAnimationFrame(this.move);
    }

    _initVariables(assets: SpriteFactory){
        this._elapsedTime = 0;
        this._position = this._initDifferentsPositions(assets);
        this._direction = "";
        this._positionId = 1;
    }

    _initDifferentsPositions(assets: SpriteFactory){
        let positions = {};
        for(let i = 0; i < CHAR_POSITIONS.length; i++){
            for(let j = 1; j < 4; j++){
                positions[`char_${CHAR_POSITIONS[i]}_${j}`] = assets.createSprites(`char_${CHAR_POSITIONS[i]}_${j}`);
            }
        }
        return positions;
    }

    // This is for debug only
    _initKeyboardControls(){
        const possible_movements = {
            "ArrowLeft": {x: -1},
            "ArrowRight": {x: 1},
            "ArrowDown": {y: 1},
            "ArrowUp": {y: -1}
        }

        window.addEventListener('keydown', (e) => {
            if(!this._speed.x && !this._speed.y){
                if(!this.isColliding({...possible_movements[e.code]})){
                    for(const key in possible_movements[e.code]){
                        this.updateSpeed({[key]: possible_movements[e.code][key] * SPEED});
                    }
                }
            }
        });
    }
    _initControls(){
        // const possible_movements = {
        //     "left_arrow": {x: -1},
        //     "right_arrow": {x: 1},
        //     "bottom_arrow": {y: 1},
        //     "top_arrow": {y: -1}
        // }
        
        // socket.on('clicked', (button) => {
            // if(!this._speed.x && !this._speed.y){
            //     if(!this.isColliding({...possible_movements[button]})){
            //         for(const key in possible_movements[button]){
            //             this.updateSpeed({[key]: possible_movements[button][key] * SPEED});
            //         }
            //     }
            // }
        // });
    }

    _setDirection(){
        // Refactored version, unreadable
        // this._direction = (this._speed.x ? DIRECTIONS.x[this._speed.x] : DIRECTIONS.y[this._speed.y]);
        if(this._speed.x === -SPEED) this._direction = "left";
        if(this._speed.x === SPEED) this._direction = "right";
        if(this._speed.y === -SPEED) this._direction = "top";
        if(this._speed.y === SPEED) this._direction = "bottom";
    }

    _setTexture(){
        this._setDirection();
        this._object.texture = this._position[`char_${this._direction}_${this._positionId}`].texture;
    }

    _resetSpeed(){
        this._speed = { x: 0, y: 0 }
        this._lastPosition.x = this._object.position.x;
        this._lastPosition.y = this._object.position.y;
    }

    move(){
        let positionDelta = {
            x: Math.abs(this._object.position.x - this._lastPosition.x),
            y: Math.abs(this._object.position.y - this._lastPosition.y)
        }
        if(positionDelta.x >= SCALED_TILE || positionDelta.y >= SCALED_TILE){
            this._resetSpeed();
        } else {
            if(this._elapsedTime >= 15){
                if(this._speed.x !== 0 || this._speed.y !== 0){
                    
                    if(this._positionId === 3){
                        this._positionId = 1;
                    } else this._positionId++;
                    
                    this._setTexture();
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