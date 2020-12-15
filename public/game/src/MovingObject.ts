import { SCALED_TILE, SPEED } from "./constantes";
import { GameObject } from "./GameObject";

type Point = {
    x: number,
    y: number
};

export class MovingObject extends GameObject{
    private _isMoving: boolean;
    private _lastPosition: Point;
    private _orientation: Point;

    constructor(sprite){
        super(sprite);
        this._isMoving = false;
        this._lastPosition = {
            x: this._object.position.x,
            y: this._object.position.y
        }
        this.move = this.move.bind(this);
        requestAnimationFrame(this.move);
    }

    get orientation(){
        return this._orientation;
    }
    set orientation(orientation: Point){
        this._orientation = orientation;
    }

    setPosition(){
        this.gridPos.x += this._orientation.x;
        this.gridPos.y += this._orientation.y
    }

    startMovement(){
        this._isMoving = true;
    }

    calculateDelta(){
        let delta = {
            x: Math.abs(this._lastPosition.x - this._object.position.x),
            y: Math.abs(this._lastPosition.y - this._object.position.y)
        }
        return delta;
    }

    move(){
        if(this._isMoving){
            let delta = this.calculateDelta();
            if(delta.x >= SCALED_TILE || delta.y >= SCALED_TILE){
                this._isMoving = false;
                this._lastPosition.x = this._object.position.x;
                this._lastPosition.y = this._object.position.y;
            } else {
                this._object.position.x += this._orientation.x * SPEED;
                this._object.position.y += this._orientation.y * SPEED;
            }
        }
        requestAnimationFrame(this.move);
    }
}