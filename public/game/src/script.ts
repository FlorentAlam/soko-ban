import { APPLICATION_SIZE } from "./constantes.js";
import { Application } from 'pixi.js';
import SpriteLoader from "./Loader";
import { socket } from "./socket.js";


var typeNumber = 4;
var errorCorrectionLevel = 'L';
//@ts-ignore
var qr = qrcode(typeNumber, errorCorrectionLevel);
let randomRoom = Math.floor(Math.random() * 10000);

socket.emit('createRoom', {id: randomRoom});

let home = document.getElementById('home');
socket.on('controller connected', () => {
    home.remove();
})

qr.addData(`${process.env.URL ? process.env.URL : 'http://192.168.1.16:3000'}/?roomId=${randomRoom}`);
qr.make();
document.getElementById('placeholder').innerHTML = qr.createImgTag();

let app = new Application({width: APPLICATION_SIZE, height: APPLICATION_SIZE, antialias: true});
document.body.appendChild(app.view);

new SpriteLoader(app);