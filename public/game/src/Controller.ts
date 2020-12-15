type Point = {x: number, y: number};
type Controls = { [key: string]: Point};

export default class Controller{
    constructor(){
        this._initController();
    }

    _initController(){
        let movements: Controls = {
            ArrowLeft: {x: -1, y: 0},
            ArrowRight: {x: 1, y: 0},
            ArrowDown: {x: 0, y: 1},
            ArrowUp: {x: 0, y: -1},
        }
        window.addEventListener('keydown', (e) => {
            if(movements[e.code]) window.dispatchEvent(new CustomEvent('move', {detail: {...movements[e.code]}}));
        });
        window.addEventListener('keyup', () => {
            window.dispatchEvent(new CustomEvent('stop'));
        });
    } 
}