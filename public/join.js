var socit = io();
var room, guesser;

socit.on("connect", function () {
  console.log("Connected to server");
});

function createRoom() {
  room = document.querySelector("input[name='roomNaym']").value;
  if (!room) {
    alert("Please enter a room name!");
    return;
  }
  socit.emit("createRoom", room);
  socit.emit("newPlayer", room); // Only send room, not name
}

socit.on("fuust", (y) => {
  document.querySelector("#error").style.visibility = "hidden";
  choozMode();
});

socit.on("secind", (y) => {
  document.querySelector("#edit").style.visibility = "";
  document.querySelector("#edit").innerHTML = "Waiting for opponent to choose role...";
});

socit.on("secindPlay", (bool) => {
  guesser = !bool;
  play(false);
});

socit.on("eruu", (g) => {
  document.querySelector("#error").style.visibility = "";
});

socit.on("disconnect", (p) => {
  socit.emit("chec", p);
});

function choozMode() {
  var hydz = document.querySelectorAll(".role-selection");
  for (let i = 0; i < hydz.length; i++) {
    hydz[i].style.visibility = "";
  }
}

function play(bool) {
  room = document.querySelector("input[name='roomNaym']").value;
  if (!room) {
    alert("Please enter a room name!");
    return;
  }
  if (bool) {
    var radz = document.querySelectorAll(".rad");
    if (radz[0].checked) guesser = true;
    else guesser = false;
    socit.emit("fuust", { bool: guesser, rom: room });
  }
  // Redirect to the game page with room info only
  window.location.href = `/play?room=${encodeURIComponent(room)}&role=${guesser ? 'maker' : 'guesser'}`;
} 