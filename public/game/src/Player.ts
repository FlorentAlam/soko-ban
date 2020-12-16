import { CHAR_POSITIONS, SCALED_TILE, SPEED } from "./constantes";
import { GameObject } from "./GameObject";
import SpriteFactory from "./SpriteFactory";

type Point = {
    x: number,
    y: number
}

export class Player extends GameObject{
    private _orientation: Point;
    public isMoving: boolean;
    private _lastPosition: Point;
    public isGrabbing: boolean;
    // private _spritePosition: {[key: string]: PIXI.Sprite};
    // private _elapsedTime: number;
    // private _spriteWalkCycle: number;
    // private _direction: string;
    // public hasToStop: boolean;

    constructor(sprite: PIXI.Sprite, assets: SpriteFactory){
        super(sprite);
        this._orientation = {x: 0, y: -1};
        this.isMoving = false;
        this.isGrabbing = false;
        // this._spritePosition = this._initDifferentsPositions(assets);
        // this._elapsedTime = 0;
        // this._spriteWalkCycle = 1;
        // this._direction = "bottom";
        // this.hasToStop = true;
        this._lastPosition = {
            x: this.gridPos.x * SCALED_TILE,
            y: this.gridPos.y * SCALED_TILE
        }

        this._initGrabbingEvents();

        this.move = this.move.bind(this);
        requestAnimationFrame(this.move);
    }

    _initGrabbingEvents(){
        window.addEventListener('grab', () => {
            this.isGrabbing = true;
        });
        window.addEventListener('release', () => {
            this.isGrabbing = false;
        })
    }

    // _initDifferentsPositions(assets: SpriteFactory){
    //     let positions = {};
    //     for(let i = 0; i < CHAR_POSITIONS.length; i++){
    //         for(let j = 1; j < 4; j++){
    //             positions[`char_${CHAR_POSITIONS[i]}_${j}`] = assets.createSprites(`char_${CHAR_POSITIONS[i]}_${j}`);
    //         }
    //     }
    //     return positions;
    // }

    get orientation(){
        return this._orientation;
    }
    set orientation(orientation: Point){
        this._orientation = orientation;
    }
    setPosition(){
        this.gridPos.x += this._orientation.x;
        this.gridPos.y += this._orientation.y;
        // this._setDirection();
    }

    calculateDelta(){
        let delta = {
            x: Math.abs(this._lastPosition.x - this._object.position.x),
            y: Math.abs(this._lastPosition.y - this._object.position.y)
        }
        return delta;
    }

    // _setDirection(){
    //     if(this._orientation.x === -1) this._direction = "left";
    //     if(this._orientation.x === 1) this._direction = "right";
    //     if(this._orientation.y === -1) this._direction = "top";
    //     if(this._orientation.y === 1) this._direction = "bottom";
    // }

    // _setWalkCycle(){
    //     if(this._elapsedTime >= 10 || this._elapsedTime === 0){
    //         this._spriteWalkCycle = this._spriteWalkCycle >= 3 ? 1 : this._spriteWalkCycle + 1;
    //         this._object.texture = this._spritePosition[`char_${this._direction}_${this._spriteWalkCycle}`].texture;
    //         this._elapsedTime = 0;
    //     }
    // }

    move(){
        if(this.isMoving){
            // this._setWalkCycle();
            let delta = this.calculateDelta();
            if(delta.x >= SCALED_TILE || delta.y >= SCALED_TILE){
                this.isMoving = false;
                this._lastPosition.x = this._object.position.x;
                this._lastPosition.y = this._object.position.y;
            } else {
                this._object.position.x += this._orientation.x * SPEED;
                this._object.position.y += this._orientation.y * SPEED;
            }
            // this._elapsedTime++;
        }
        
        requestAnimationFrame(this.move);
    }
}