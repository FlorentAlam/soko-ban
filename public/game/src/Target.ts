import { Sprite } from "pixi.js";
import { GameObject } from "./GameObject";

export default class Target extends GameObject{
    constructor(sprite: Sprite){
        super(sprite);
    }
}