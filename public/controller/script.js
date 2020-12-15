const BUTTONS = ['initial', 'left_arrow', 'right_arrow', 'top_arrow', 'bottom_arrow', 'a_button', 'b_button'];
const socket = io();

class Assets{
    constructor(){
        this.loaded = 0;
        this.assets = {};

        for(let i = 0; i < BUTTONS.length; i++){
            this.loadImages(BUTTONS[i]);
        }
    }

    loadImages = (buttonName) => {
        let img = new Image();
        img.src = `./assets/${buttonName}.jpg`;
        img.onload = () => {
            this.loaded++;
            this.assets[buttonName] = img;

            if(this.loaded === BUTTONS.length){
                new Controller(this.assets);
            }
        }
    }
}


class Controller {
    constructor(assets){
        this.domImage = document.getElementsByTagName('img')[0];
        this.controller = document.getElementById('manette');
        this.controller.buttons = {};
        this.initButtons(assets);

        window.addEventListener('pointerup', () => {
            this.domImage.src = assets.initial.src;
            socket.emit('released');
        });

        window.addEventListener('resize', () => {
            this.updateButtonsSize();
        });

        this.updateButtonsSize();
    }

    updateButtonsSize(){
        const imageSize = this.domImage.getBoundingClientRect();
        const left = document.getElementById('left_arrow');
        left.style.height = imageSize.height / 100 * 16 + 'px';
        left.style.width = imageSize.width / 100 * 10 + 'px';
        left.style.top = window.innerHeight / 2 - (imageSize.height / 100 * 16 / 2) + 'px';

        const right = document.getElementById('right_arrow');
        right.style.height = this.domImage.getBoundingClientRect().height / 100 * 16 + 'px';
        right.style.width = this.domImage.getBoundingClientRect().width / 100 * 10 + 'px';
        right.style.top = window.innerHeight / 2 - (this.domImage.getBoundingClientRect().height / 100 * 16 / 2) + 'px';

        const top = document.getElementById('top_arrow');
        top.style.height = this.domImage.getBoundingClientRect().height / 100 * 16 + 'px';
        top.style.width = this.domImage.getBoundingClientRect().width / 100 * 10 + 'px';
        top.style.top = window.innerHeight / 2 - (this.domImage.getBoundingClientRect().height / 100 * 50 / 2) + 'px';
        top.style.left = this.domImage.getBoundingClientRect().height / 100 * 27.5 + 'px';

        const bottom = document.getElementById('bottom_arrow');
        bottom.style.height = this.domImage.getBoundingClientRect().height / 100 * 16 + 'px';
        bottom.style.width = this.domImage.getBoundingClientRect().width / 100 * 10 + 'px';
        bottom.style.top = window.innerHeight / 2 + (this.domImage.getBoundingClientRect().height / 100 * 18 / 2) + 'px';
        bottom.style.left = this.domImage.getBoundingClientRect().height / 100 * 27.5 + 'px';

        const aBut = document.getElementById('a_button');
        aBut.style.height = this.domImage.getBoundingClientRect().height / 100 * 19 + 'px';
        aBut.style.width = this.domImage.getBoundingClientRect().width / 100 * 13 + 'px';
        aBut.style.top = window.innerHeight / 2 - (this.domImage.getBoundingClientRect().height / 100 * 40 / 2) + 'px';
        aBut.style.right = this.domImage.getBoundingClientRect().width / 100 * 5 + 'px';

        const bBut = document.getElementById('b_button');
        bBut.style.height = this.domImage.getBoundingClientRect().height / 100 * 19 + 'px';
        bBut.style.width = this.domImage.getBoundingClientRect().width / 100 * 13 + 'px';
        bBut.style.top = window.innerHeight / 2 + (this.domImage.getBoundingClientRect().height / 100 * 5 / 2) + 'px';
        bBut.style.right = this.domImage.getBoundingClientRect().width / 100 * 19 + 'px';
    
        
    }

    initButtons = (assets) => {
        for(const key in assets){
            this.controller.buttons = {...this.controller.buttons, [key]: new Buttons(key, this.domImage, assets[key])};
        }
    }
}

class Buttons {
    constructor(selector, domImage, img){
        if(selector !== 'initial'){
            this.button = document.getElementById(selector);
            this.button.addEventListener('pointerdown', () => {
                navigator.vibrate(40);
                domImage.src = img.src;
                socket.emit('clicked', selector);
            });
        }
        
    }
}
const params = new URLSearchParams(location.search);
socket.emit('joinRoom', {id: params.get('roomId')});

new Assets();