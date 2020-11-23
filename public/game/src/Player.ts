import { SCALED_TILE, SPEED } from "./constantes.js";
import { levels } from "./levels";
import Object from "./MoveableObject";
// import {socket} from "./socket.js";

export default class Player extends Object{
    constructor(sprite){
        super(sprite);
        this.move = this.move.bind(this);
        this._initControls();
        requestAnimationFrame(this.move);
    }

    _initControls(){
        // const possible_movements = {
        //     "left_arrow": {x: -1},
        //     "right_arrow": {x: 1},
        //     "bottom_arrow": {y: 1},
        //     "top_arrow": {y: -1}
        // }
        const possible_movements = {
            "ArrowLeft": {x: -1},
            "ArrowRight": {x: 1},
            "ArrowDown": {y: 1},
            "ArrowUp": {y: -1}
        }
        // socket.on('clicked', (button) => {
        //     if(!this.speed.x && !this.speed.y){
        //         if(!this.isColliding({...possible_movements[button]})){
        //             for(const key in possible_movements[button]){
        //                 this.updateSpeed({[key]: possible_movements[button][key] * SPEED});
        //             }
        //         }
        //     }
        // });
        window.addEventListener('keydown', (e) => {
            if(!this._speed.x && !this._speed.y){
                if(!this.isColliding({...possible_movements[e.code]})){
                    for(const key in possible_movements[e.code]){
                        this.updateSpeed({[key]: possible_movements[e.code][key] * SPEED});
                    }
                }
            }
        })
    }
}