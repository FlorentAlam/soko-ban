import Controller from "./Controller";
import { FixedObject } from "./FixedObject";
import { GameObject } from "./GameObject";
import { MovingObject } from "./MovingObject";
import { Player } from "./Player";

export default class Game{
    private _objects: GameObject[];
    private _player: Player;
    private _controller: Controller;

    constructor(){
        this._objects = [];
        this._controller = new Controller();
        this._initController();
    }

    _initController(){
        window.addEventListener('move', (e: CustomEvent) => {
            if(!this._player.isMoving){
                this._player.orientation = e.detail;
                if(this.checkNextCase()) this._player.isMoving = true;
            }
        });
        // window.addEventListener('stop', () => {
        //     this._player.isMoving = false;
        // })
    }

    add(object: GameObject){ this._objects.push(object); }

    set player(player: Player){ this._player = player; }

    checkNextCase(){
        const player_orientation = this._player.orientation;
        const player_position = this._player.gridPos;
        for(let i = 0; i < this._objects.length; i++){
            if((this._objects[i].gridPos.x === player_position.x + (this._player.isGrabbing ? -player_orientation.x : player_orientation.x)) && (this._objects[i].gridPos.y === player_position.y + (this._player.isGrabbing ? -this._player.orientation.y : player_orientation.y))){
                if(this._objects[i] instanceof FixedObject){
                    return false;
                } else if(this._objects[i] instanceof MovingObject){
                    for(let j = 0; j < this._objects.length; j++){
                        if(this._player.isGrabbing){
                            if((this._objects[j].gridPos.x === player_position.x - (-player_orientation.x)) && (this._objects[j].gridPos.y === player_position.y - (-player_orientation.y))){
                                return false;
                            } else if((this._objects[j].gridPos.x === player_position.x + player_orientation.x) && (this._objects[j].gridPos.y === player_position.y + player_orientation.y)){
                                console.log("test");
                                return false;
                            }
                        } else {
                            if((this._objects[j].gridPos.x === player_position.x + (player_orientation.x * 2)) && (this._objects[j].gridPos.y === player_position.y + (player_orientation.y * 2))){
                                return false;
                            }
                        }
                        
                    }

                    (this._objects[i] as MovingObject).orientation = this._player.orientation;
                    (this._objects[i] as MovingObject).setPosition();
                    (this._objects[i] as MovingObject).startMovement();
                    // return true;
                }
            }
        }
        this._player.setPosition();
        return true;
    }
}