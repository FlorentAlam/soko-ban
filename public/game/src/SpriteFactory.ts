import tiles from "./tiles.js";
import { Texture, Rectangle, BaseTexture, Sprite } from 'pixi.js';

export default class SpriteFactory{
    private _texture: Texture;

    constructor(texture: Texture){
        this._texture = texture;
    }

    createSprites(name:string){
        const rect = new Rectangle(tiles[name].position.x, tiles[name].position.y, tiles[name].width, tiles[name].height);
        const texture = new Texture(this._texture as unknown as BaseTexture, rect);
        let sprite = new Sprite(texture);
        return sprite;
    }
}