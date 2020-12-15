const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(isMobile);
app.use('/game', express.static(__dirname + "/public/game/dist"));
app.use('/controller', express.static(__dirname + "/public/controller"));

const io = require('socket.io')(http);

function isMobile(req, res, next) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(req.headers["user-agent"])) {
      if(!res.req.originalUrl.includes('controller')) res.redirect("/controller/?roomId=" + req.query.roomId);
    } else {
      if(!res.req.originalUrl.includes('game')) res.redirect("/game");
    }
    next();
}

io.on('connection', socket => {
    socket.on('createRoom', (id) => {
      socket.join(id.id);
    });
    socket.on('joinRoom', (id) => {
      socket.join(parseInt(id.id));
      io.in(parseInt(id.id)).emit('controller connected');
    })
    socket.on('clicked', (button) => {
      console.log(socket.rooms);
      io.emit('clicked', button);
    });
    socket.on('released', () => {
      io.emit('released');
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log("open localhost:3000");
});