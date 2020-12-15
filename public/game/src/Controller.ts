import { socket } from "./socket";

type Point = {x: number, y: number};
type Controls = { [key: string]: Point};

export default class Controller{
    constructor(){
        this._initController();
    }

    _initController(){
        let movements: Controls = {
            left_arrow: {x: -1, y: 0},
            right_arrow: {x: 1, y: 0},
            bottom_arrow: {x: 0, y: 1},
            top_arrow: {x: 0, y: -1},
        }
        socket.on('clicked', (value) => {
            if(movements[value]) window.dispatchEvent(new CustomEvent('move', {detail: {...movements[value]}}));
        });
        socket.on('released', () => {
            window.dispatchEvent(new CustomEvent('stop'));
        })
    } 
}