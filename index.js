var http = require("http");
var engines = require("consolidate");
var BP = require("body-parser");
var express = require("express");
var app = express();
var room,
  count = 0;
var roomz = [];
var idRoom = [];

app.use(BP.urlencoded({ extended: true }));

app.engine("html", engines.mustache);
app.use(express.static("public"));

var server = http.createServer(app);
server.listen(process.env.PORT || 8080, function () {
  console.log("Server Is Up");
});

app.get("/play", function (req, res) {
  res.render("game.html");
});

app.get("/join", function (req, res) {
  res.render("join.html");
});

app.get("/", function (req, res) {
  res.render("roolz.html");
});

var io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  console.log("Cunectid");
  socket.on("createRoom", (rom) => {
    room = rom;
    if (!roomz.hasOwnProperty(room)) {
      roomz[room] = 1;
      socket.join(room);
      idRoom[socket.id] = room;
      socket.emit("fuust", "g");
    } else if (roomz[room] < 2) {
      socket.join(room);
      idRoom[socket.id] = room;
      socket.emit("secind", "g");
      roomz[room] = roomz[room] + 1;
    } else socket.emit("eruu", "e");
    console.log(roomz);
  });
  socket.on("newPlayer", (naym) => {
    // console.log(naym + " joind " + room);
  });
  socket.on("ges", (data) => {
    // io.in(room).emit('ges', ges)
    socket.broadcast.to(data.rom).emit("ges", data.guess);
  });
  socket.on("sub", (data) => {
    socket.broadcast.to(data.rom).emit("sub", data.gesser);
  });
  socket.on("curect", (q) => {
    socket.broadcast.to(q).emit("curect", "j");
  });
  socket.on("code", (s) => {
    socket.broadcast.to(s).emit("code", "g");
  });
  socket.on("fuust", (y) => {
    socket.broadcast.to(y.rom).emit("secindPlay", y.bool);
  });
  socket.on("disconnect", (p) => {
    roomz[idRoom[socket.id]] = roomz[idRoom[socket.id]] - 1;
    console.log(roomz);
    if (isEmpty(io.sockets.adapter.rooms)) roomz = [];
  });
});

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
