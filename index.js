var http = require("http");
var engines = require("consolidate");
var BP = require("body-parser");
var express = require("express");
var app = express();
var room = 0;

app.use(BP.urlencoded({ extended: true }));

app.engine("html", engines.mustache);
app.use(express.static("public"));

var server = http.createServer(app);
server.listen(8080, process.env.PORT, function () {
  console.log("Server Is Up");
});

app.get("/", function (req, res) {
  res.render("game.html");
});

var io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  console.log("Cunectid");
  socket.on("createRoom", (rom) => {
    room = rom;
    socket.join(room);
    console.log(socket.rooms);
  });
  socket.on("newPlayer", (naym) => {
    console.log(naym + " joind " + room);
  });
  socket.on("ges", (ges) => {
    console.log(room);
    io.in(room).emit('ges', ges)
    // socket.broadcast.to(room).emit("ges", ges);
  });
});
