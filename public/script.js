// Moved from inline HTML script
const spa = document.getElementById('spa');
const colzTable = document.getElementById('colz');

colzTable.parentNode.removeChild(colzTable);

for (let i = 9; i >= 0; i--) {
  const feedbackTableId = `00${i}`;
  const guessTableId = `0${i}`;

  const feedbackTable = document.createElement('table');
  feedbackTable.id = feedbackTableId;
  feedbackTable.innerHTML = `
    <tr>
      <td align="center"><img src="#" style="visibility: hidden;" class="cept" /></td>
      <td align="center"><img src="#" style="visibility: hidden;" class="cept" /></td>
    </tr>
    <tr>
      <td align="center"><img src="#" style="visibility: hidden;" class="cept" /></td>
      <td align="center"><img src="#" style="visibility: hidden;" class="cept" /></td>
    </tr>
  `;

  const guessTable = document.createElement('table');
  guessTable.id = guessTableId;
  guessTable.className = 'after';
  guessTable.innerHTML = `
    <tr>
      <td align="center"><img src="#" style="visibility: hidden;" class="cept" /></td>
      <td align="center"><img src="#" style="visibility: hidden;" class="cept" /></td>
      <td align="center"><img src="#" style="visibility: hidden;" class="cept" /></td>
      <td align="center"><img src="#" style="visibility: hidden;" class="cept" /></td>
    </tr>
  `;

  spa.appendChild(feedbackTable);
  spa.appendChild(guessTable);

  if (i === 9) {
    spa.appendChild(colzTable);
  }

  if (i > 0) {
    const br = document.createElement('br');
    spa.appendChild(br);
  }
}

var socit = io();
var room,
  colour,
  old,
  num,
  col,
  count,
  cursor,
  imijiz,
  imij,
  code,
  naym,
  guesser,
  sub,
  ges,
  aaft,
  a = 0;

// Initialize room and player info from URL parameters
function initializeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  room = urlParams.get('room');
  const role = urlParams.get('role');
  
  if (room && role) {
    guesser = role === 'guesser';
    // Join the room automatically
    socit.emit("createRoom", room);
    // Set up initial game state UI
    setupInitialGameState();
  } else {
    // Redirect to join page if parameters are missing
    window.location.href = '/join';
  }
}

function setupInitialGameState() {
  if (guesser === true) {
    // CodeGuesser - waiting for opponent to set code
    document.querySelector("#not").innerHTML = "Waiting for opponent to set code...";
    document.querySelector("#cowd").style.visibility = "hidden";
    document.querySelector("#colz").style.visibility = "";
    document.querySelector("#RW").style.visibility = "hidden";
    count = 0;
  } else {
    // CodeMaker - set code now
    document.querySelector("#not").innerHTML = "Set code now!";
    document.querySelector("#cowd").style.visibility = "";
    document.querySelector("#colz").style.visibility = "";
    document.querySelector("#RW").style.visibility = "";
    
    // Create submit button for CodeMaker
    code = document.createElement("img");
    code.setAttribute("src", "https://i.ibb.co/ck0G1KW/subMit.png");
    code.setAttribute("id", "kode");
    code.setAttribute("class", "noBac");
    code.setAttribute("onclick", "submitCode()");
    
    imij = document.createElement("img");
    imij.setAttribute("src", "https://i.ibb.co/ck0G1KW/subMit.png");
    imij.setAttribute("id", "submitMayc");
    imij.setAttribute("class", "noBac");
    imij.setAttribute("onclick", "submit()");
    
    document.getElementById("113").innerHTML =
      "<img class='noBac' id='curect' src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-6/177800/270-512.png'>";
    
    document.querySelector("body").insertBefore(code, document.getElementById("RW"));
    
    count = -1;
  }
  
  // Set up color cells
  col = document.querySelectorAll("td");
  a = 16;
  while (a < 24) {
    col[a].firstElementChild.setAttribute("class", "noBac");
    a++;
  }
}

var put = document.querySelectorAll("td");
while (a < put.length) {
  if (!put[a].className.includes("noGray"))
    put[a].innerHTML =
      '<img class="butin" src="' +
      'https://www.freeiconspng.com/uploads/glossy-button-black-icon-10.png"' +
      ">";
  a++;
}

socit.on("connect", function () {
  console.log("Connected to server");
  initializeFromURL();
});

socit.on("ges", (guess) => {
  if (guess[1] === " ") {
    num = guess[0];
    col = guess.substring(2);
  } else {
    num = guess[0] + guess[1];
    col = guess.substring(3);
  }
  var numd = parseInt(num);
  if (
    numd != 111 &&
    numd != 112 &&
    numd != 113 &&
    numd != 114 &&
    !(numd > 11 && numd < 20)
  ) {
    console.log(col);
    if (col === "redPin" || col === "wytPin")
      document.getElementById(num).innerHTML =
        '<img id="pinz" src="' + imijiz[col] + '">';
    else if (col === "trash")
      document.getElementById(num).innerHTML =
        '<img class="butin" src="' + imijiz[col] + '">';
    else
      document.getElementById(num).innerHTML =
        '<img src="' + imijiz[col] + '">';
  }
});

socit.on("code", (l) => {
  document.querySelector("#not").innerHTML = "Make your guess!";
  document
    .getElementById("00")
    .insertAdjacentHTML(
      "afterend",
      '<img class="noBac" class="noGray" id="submitGes" onclick="submit()" src="https://i.ibb.co/ck0G1KW/subMit.png">'
    );
  col = document.querySelectorAll("td");
  a = 16;
  while (a < 24) {
    col[a].firstElementChild.setAttribute("class", "noBac");
    a++;
  }
});

socit.on("curect", (r) => {
  document.querySelector("#not").innerHTML =
    "You guessed the code in " + (count + 1) + " turns!";
  setTimeout(reset, 3000, false);
});

socit.on("disconnect", (p) => {
  socit.emit("chec", p);
});

function init() {
  cursor = {};
  cursor["black"] = "https://i.ibb.co/vQ7Y3qn/blac.png";
  cursor["blue"] = "https://i.ibb.co/MgWxBLg/blue.png";
  cursor["gray"] = "https://i.ibb.co/4TnymWj/yelow.png";
  cursor["green"] = "https://i.ibb.co/6bPPKdJ/green.png";
  cursor["orange"] = "https://i.ibb.co/zxVNVz0/orinj.png";
  cursor["pink"] = "https://i.ibb.co/840Gzj7/pingc.png";
  cursor["purple"] = "https://i.ibb.co/Tr63hSD/purple.png";
  cursor["red"] = "https://i.ibb.co/n3Y4cV1/red.png";
  cursor["redPin"] = "https://i.ibb.co/DQX2XFf/redPin.png";
  cursor["wytPin"] = "https://i.ibb.co/VVnQBPX/wytPin.png";
  cursor["trash"] = "https://i.ibb.co/vCtQZqBy/trash.png";

  imijiz = {};
  imijiz["black"] = "https://i.ibb.co/9372X2b/blac.png";
  imijiz["blue"] = "https://i.ibb.co/5vp1V3S/blue.png";
  imijiz["gray"] = "https://i.ibb.co/vd832YK/yelow.png";
  imijiz["green"] = "https://i.ibb.co/QYxm7Jb/green.png";
  imijiz["orange"] = "https://i.ibb.co/d62Cm05/orinj.png";
  imijiz["pink"] = "https://i.ibb.co/tbqP8qP/pingc.png";
  imijiz["purple"] = "https://i.ibb.co/Jn62B7v/purple.png";
  imijiz["red"] = "https://i.ibb.co/QHt1CDv/red.png";
  imijiz["redPin"] = "https://i.imgur.com/nBsXJBa.png";
  imijiz["wytPin"] = "https://i.ibb.co/vYt93Tb/glosee.png";
  imijiz["trash"] = "https://www.freeiconspng.com/uploads/glossy-button-black-icon-10.png";
}

init();

function clict() {
  // set id of code
  var wich = this.id.toString();
  var thisWun = document.getElementById(wich);
  var cul = thisWun.getAttribute("data-colour");
  if (thisWun.className.includes("noBorder")) {
    thisWun.firstElementChild.style.border = "2px solid black";
    thisWun.firstElementChild.style.borderRadius = "50%";
  }
  if (
    (parseInt(this.id) > 11 && parseInt(this.id) < 20) ||
    parseInt(this.id) === 111 ||
    parseInt(this.id) === 112 ||
    parseInt(this.id) === 113 ||
    parseInt(this.id) === 114
  ) {
    if (old != null) old.firstElementChild.style.border = "none";
    old = thisWun;
    colour = cul;
    ges = wich + " " + colour;
    socit.emit("ges", { guess: ges, rom: room });
    console.log(cul);
    if (cul === "redPin") {
      document.querySelector("body").style.cursor =
        "url(" + "https://i.ibb.co/jkNJSQy/red-Cursor.png" + "),move";
    } else if (cul === "wytPin") {
      document.querySelector("body").style.cursor =
        "url(" + "https://i.ibb.co/dgw525d/wyt-Cursor.png" + "),move";
    } else if (cul === "trash") {
      console.log('reecht')
      document.querySelector("body").style.cursor =
        "url(" + cursor["trash"] + "),move";
    } else {
      var cursed = "url(" + cursor[colour] + "),move";
      document.querySelector("body").style.cursor = cursed;
    }
  } else {
    ges = wich + " " + colour;
    socit.emit("ges", { guess: ges, rom: room });
    if (colour != "redPin" && colour != "wytPin" && colour != "trash")
      thisWun.innerHTML = '<img src="' + imijiz[colour] + '">';
    else if (colour === "trash")
      thisWun.innerHTML = '<img class="butin" src="' + imijiz[colour] + '">';
    else thisWun.innerHTML = '<img id="pinz" src="' + imijiz[colour] + '">';
  }
}
var all = document.querySelectorAll("td");
console.log("new test");
a = 0;
var d = 0;
while (a < all.length) {
  if (
    all[a].id != "111" &&
    all[a].id != "112" &&
    all[a].id != "113" &&
    all[a].id != "114" &&
    !all[a].className.includes("code")
  )
    all[a].setAttribute("id", d);
  all[a].addEventListener("click", clict);
  if (!all[a].className.includes("code")) d++;
  a++;
}
function reset(sent) {
  if (sent) {
    socit.emit("curect", room);
    document.querySelector("#not").innerHTML =
      "He guessed the code in " + (count + 1) + " turn(s)!";
    setTimeout(function () {
      guesser = !guesser;
      var butinz = document.querySelectorAll("td");
      a = 0;
      while (a < butinz.length) {
        var butID = parseInt(butinz[a].id);
        if (butID > 3 && (butID < 12 || butID > 19) && butID < 110)
          butinz[a].innerHTML =
            '<img class="butin" src="' +
            'https://www.freeiconspng.com/uploads/glossy-button-black-icon-10.png"' +
            ">";
        a++;
      }
      if (guesser === true) {
        document.querySelector("#not").innerHTML =
          "Waiting for opponent to set code...";
        if (document.querySelector("#submitMayc") != null)
          document.querySelector("#submitMayc").style.visibility = "hidden";
        count = 0;
        document.querySelector("#cowd").style.visibility = "hidden";
        document.querySelector("#colz").style.visibility = "";
        document.querySelector("#RW").style.visibility = "hidden";
        sub = document.querySelector("#submitGes");
      } else {
        document.querySelector("#not").innerHTML = "Set code now!";
        document.querySelector("#cowd").style.visibility = "";
        if (document.querySelector("#submitGes") != null)
          document.querySelector("#submitGes").style.visibility = "hidden";
        count = -1;
        document.querySelector("#RW").style.visibility = "";
        code = document.createElement("img");
        code.setAttribute("src", "https://i.ibb.co/ck0G1KW/subMit.png");
        code.setAttribute("id", "kode");
        code.setAttribute("class", "noBac");
        code.setAttribute("onclick", "submitCode()");

        imij = document.createElement("img");
        imij.setAttribute("src", "https://i.ibb.co/ck0G1KW/subMit.png");
        imij.setAttribute("id", "submitMayc");
        imij.setAttribute("class", "noBac");
        imij.setAttribute("onclick", "submit()");
        document.getElementById("113").innerHTML =
          "<img class='noBac' id='curect' src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-6/177800/270-512.png'>";
        // document
        //   .querySelector("span")
        //   .insertBefore(imij, document.getElementById("000"));
        document
          .querySelector("body")
          .insertBefore(code, document.getElementById("RW"));
      }
      col = document.querySelectorAll("td");
      a = 16;
      while (a < 24) {
        col[a].firstElementChild.setAttribute("class", "noBac");
        a++;
      }
    }, 3000);
  } else {
    guesser = !guesser;
    var butinz = document.querySelectorAll("td");
    a = 0;
    while (a < butinz.length) {
      var butID = parseInt(butinz[a].id);
      if (butID > 3 && (butID < 12 || butID > 19) && butID < 110)
        butinz[a].innerHTML =
          '<img class="butin" src="' +
          'https://www.freeiconspng.com/uploads/glossy-button-black-icon-10.png"' +
          ">";
      a++;
    }
    if (guesser === true) {
      document.querySelector("#not").innerHTML =
        "Waiting for opponent to set code...";
      if (document.querySelector("#submitMayc") != null)
        document.querySelector("#submitMayc").style.visibility = "hidden";
      count = 0;
      document.querySelector("#cowd").style.visibility = "hidden";
      document.querySelector("#colz").style.visibility = "";
      document.querySelector("#RW").style.visibility = "hidden";
      sub = document.querySelector("#submitGes");
    } else {
      document.querySelector("#not").innerHTML = "Set code now!";
      document.querySelector("#cowd").style.visibility = "";
      if (document.querySelector("#submitGes") != null)
        document.querySelector("#submitGes").style.visibility = "hidden";
      count = -1;
      document.querySelector("#RW").style.visibility = "";
      code = document.createElement("img");
      code.setAttribute("src", "https://i.ibb.co/ck0G1KW/subMit.png");
      code.setAttribute("id", "kode");
      code.setAttribute("class", "noBac");
      code.setAttribute("onclick", "submitCode()");

      imij = document.createElement("img");
      imij.setAttribute("src", "https://i.ibb.co/ck0G1KW/subMit.png");
      imij.setAttribute("id", "submitMayc");
      imij.setAttribute("class", "noBac");
      imij.setAttribute("onclick", "submit()");
      document.getElementById("113").innerHTML =
        "<img class='noBac' id='curect' src='https://i.ibb.co/YfF49Wd/2176530.png'>";
      // document
      //   .querySelector("span")
      //   .insertBefore(imij, document.getElementById("000"));
      document
        .querySelector("body")
        .insertBefore(code, document.getElementById("RW"));
    }
    col = document.querySelectorAll("td");
    a = 16;
    while (a < 24) {
      col[a].firstElementChild.setAttribute("class", "noBac");
      a++;
    }
  }
}

function submit() {
  if (guesser) {
    document.querySelector("#not").innerHTML =
      "Waiting for opponent to set pins...";
    document.querySelector("#submitGes").style.visibility = "hidden";
  } else {
    document.querySelector("#submitMayc").style.visibility = "hidden";
    document.querySelector("#not").innerHTML =
      "Waiting for opponent to set guess...";
  }
  console.log("sent");
  socit.emit("sub", { gesser: guesser, rom: room });
}

function submitCode() {
  document.querySelector("#not").innerHTML =
    "Waiting for opponent to set guess...";
  document.getElementById("kode").remove();
  document.querySelector("#colz").style.visibility = "hidden";
  socit.emit("code", room);
}

socit.on("sub", (sub) => {
  count++;
  if (sub != guesser) {
    if (guesser) {
      document.querySelector("#not").innerHTML = "Make your guess!";
      aaft = document.getElementById("0" + count.toString());
      aaft.insertAdjacentHTML(
        "afterend",
        '<img id="submitGes" class="noBac" onclick="submit()" src="https://i.ibb.co/ck0G1KW/subMit.png">'
      );
      sub = document.querySelector("#submitGes");
      document.querySelector("#submitGes").style.visibility = "";
    } else {
      document.querySelector("#not").innerHTML = "Set pins now!";
      imij.remove();
      document
        .querySelector("span")
        .insertBefore(imij, document.getElementById("00" + count.toString()));
      imij = document.querySelector("#submitMayc");
      document.querySelector("#submitMayc").style.visibility = "";
    }
  }
});

document.querySelector("#RW").style.cursor = "pointer";
