import { SCALED_TILE } from "./constantes";

type Point = {
    x: number,
    y: number
}

export class GameObject{
    protected _object: PIXI.Sprite;
    public gridPos: Point;

    constructor(sprite){
        this._object = sprite;
        this.gridPos = {x: this._object.position.x / SCALED_TILE, y: this._object.position.y / SCALED_TILE};
    }
}