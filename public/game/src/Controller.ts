import { socket } from "./socket";

type Point = {x: number, y: number};
type Controls = { [key: string]: Point};

export default class Controller{
    constructor(){
        this._initController();
        // this._initKeyboardController();
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
            if(value === 'a_button') window.dispatchEvent(new CustomEvent('grab'));
            if(value === 'b_button') window.dispatchEvent(new CustomEvent('release'));
        });
        socket.on('released', () => {
            window.dispatchEvent(new CustomEvent('stop'));
        })
    } 

    // _initKeyboardController(){
    //     let movements: Controls = {
    //         ArrowLeft: {x: -1, y: 0},
    //         ArrowRight: {x: 1, y: 0},
    //         ArrowDown: {x: 0, y: 1},
    //         ArrowUp: {x: 0, y: -1},
    //     }

        

    //     window.addEventListener('keydown', (e) => {
    //         if(movements[e.code]) window.dispatchEvent(new CustomEvent('move', {detail: {...movements[e.code]}}));
    //         if(e.code === 'KeyQ') window.dispatchEvent(new CustomEvent('grab'));
    //         if(e.code === 'KeyW') window.dispatchEvent(new CustomEvent('release'));
    //     });
    //     window.addEventListener('keyup', (e) => {
    //         window.dispatchEvent(new CustomEvent('stop'));
    //     });
    // }
}