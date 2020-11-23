import { SCALED_TILE, SPEED } from "./constantes.js";
import { levels } from "./levels";

export default class MoveableObject{
    protected _object: PIXI.Sprite;
    protected _grid_pos: {x: number, y: number};
    protected _speed: {x: number, y: number};
    protected _lastPosition: {x: number, y: number};

    constructor(sprite){
        this._object = sprite;
        this._grid_pos = {
            x: this._object.position.x / SCALED_TILE,
            y: this._object.position.y / SCALED_TILE,
        }
        this._speed = {
            x: 0,
            y: 0
        }
        this._lastPosition = {
            x: this._object.position.x,
            y: this._object.position.y
        }

        this.move = this.move.bind(this);
        requestAnimationFrame(this.move);
    }

    updateSpeed(speed: {x?: number, y?: number}){
        levels[0][this._grid_pos.y][this._grid_pos.x] = 0;
        this._speed = {...this._speed, ...speed};
        levels[0][this._grid_pos.y + this._speed.y / SPEED][this._grid_pos.x + this._speed.x / SPEED] = this;
        for(const key in speed){ this._grid_pos[key] += (speed[key] / SPEED)}
        
    }

    isColliding(speed: {x?: number, y?: number}){
        const nextPosition = levels[0][this._grid_pos.y + (speed.y || 0)][this._grid_pos.x + (speed.x || 0)];
        if(nextPosition !== 0){
            if(nextPosition instanceof Object){
                const nextNextPosition = levels[0][this._grid_pos.y + (speed.y * 2 || 0)][this._grid_pos.x + (speed.x * 2 || 0)];
                if(nextNextPosition === 0 || nextNextPosition === 't'){
                    for(const key in speed){
                        (nextPosition as MoveableObject).updateSpeed({[key]: speed[key] * SPEED});
                    }
                }
            }
            return true;
        } else return false;
    }

    move(){
        if(Math.abs(this._object.position.x - this._lastPosition.x) >= SCALED_TILE || Math.abs(this._object.position.y - this._lastPosition.y) >= SCALED_TILE){
            this._speed = {
                x: 0,
                y: 0
            }
            this._lastPosition.x = this._object.position.x;
            this._lastPosition.y = this._object.position.y;
        }
        this._object.position.x += this._speed.x;
        this._object.position.y += this._speed.y;
        requestAnimationFrame(this.move);
    }
}