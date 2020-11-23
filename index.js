const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(isMobile);
app.use('/game', express.static(__dirname + "/public/game/dist"));
app.use('/controller', express.static(__dirname + "/public/controller"));

function isMobile(req, res, next) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(req.headers["user-agent"])) {
      if(!res.req.originalUrl.includes('controller')) res.redirect("/controller");
    } else {
      if(!res.req.originalUrl.includes('game')) res.redirect("/game");
    }
    next();
}

const io = require('socket.io')(http);

io.on('connection', socket => {
    socket.on('clicked', (button) => {
      io.emit('clicked', button);
    });
    socket.on('released', () => {
      io.emit('released');
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log("open localhost:3000");
});