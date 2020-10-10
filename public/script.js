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
    naym,
    guesser,
    sub,
    ges,
    aaft,
    a = 0;
var put = document.querySelectorAll("td");
while (a < put.length) {
    if (!put[a].className.includes("noGray"))
        put[a].innerHTML =
            '<img class="butin" src="' +
            'https://www.freeiconspng.com/uploads/glossy-button-black-icon-10.png"' +
            ">";
    a++;
}
var ol = document.getElementsByTagName("*");
a = 0;
while (a < ol.length) {
    if (ol[a].className !== "ceep") ol[a].style.visibility = "hidden";
    a++;
}
socit.on("connect", function() {
    // console.log("Chaynd");
});


function createRoom() {
    room = document.querySelector("input").value;
    naym = document.querySelector("#naym").value;
    socit.emit("createRoom", room);
    socit.emit("newPlayer", naym);
}

socit.on('goUhed', y => {
    document.querySelector('#error').style.visibility = 'hidden';
    choozMode();
})

socit.on('curect', r => {
    reset(false)
})

socit.on('eruu', g => {
    document.querySelector('#error').style.visibility = '';
})

function choozMode() {
    var hydz = document.querySelectorAll(".hyd");
    a = 0;
    while (a < hydz.length) {
        hydz[a].style.visibility = "";
        a++;
    }
}
function play() {
    var radz = document.querySelectorAll(".rad");
    if (radz[0].checked)
        guesser = true;
    else
        guesser = false;
    var rim = document.querySelectorAll("input");
    var rim2 = document.querySelectorAll("button");
    var rim3 = document.querySelectorAll(".dil");
    a = 0;
    while (a < rim.length) {
        rim[a].remove();
        if (rim2[a] != null) rim2[a].remove();
        if (rim3[a] != null) rim3[a].remove();
        a++;
    }
    a = 0;
    var ol = document.getElementsByTagName("*");
    while (a < ol.length) {
        if (ol[a].className !== "cept") ol[a].style.visibility = "";
        a++;
    }
    reset(false);
}
function init() {
    cursor = {};
    cursor["black"] = "https://i.ibb.co/vQ7Y3qn/blac.png";
    cursor["blue"] = "https://i.ibb.co/MgWxBLg/blue.png";
    cursor["gray"] = "https://i.ibb.co/sWn0D77/gray.png";
    cursor["green"] = "https://i.ibb.co/6bPPKdJ/green.png";
    cursor["orange"] = "https://i.ibb.co/zxVNVz0/orinj.png";
    cursor["pink"] = "https://i.ibb.co/840Gzj7/pingc.png";
    cursor["purple"] = "https://i.ibb.co/Tr63hSD/purple.png";
    cursor["red"] = "https://i.ibb.co/n3Y4cV1/red.png";
    cursor["redPin"] = "https://i.ibb.co/DQX2XFf/redPin.png";
    cursor["wytPin"] = "https://i.ibb.co/VVnQBPX/wytPin.png";
    imijiz = {};
    imijiz["black"] = "https://i.ibb.co/9372X2b/blac.png";
    imijiz["blue"] = "https://i.ibb.co/5vp1V3S/blue.png";
    imijiz["gray"] = "https://i.ibb.co/vLk8szF/gray.png";
    imijiz["green"] = "https://i.ibb.co/QYxm7Jb/green.png";
    imijiz["orange"] = "https://i.ibb.co/d62Cm05/orinj.png";
    imijiz["pink"] = "https://i.ibb.co/tbqP8qP/pingc.png";
    imijiz["purple"] = "https://i.ibb.co/Jn62B7v/purple.png";
    imijiz["red"] = "https://i.ibb.co/QHt1CDv/red.png";
    imijiz["redPin"] = "https://i.imgur.com/nBsXJBa.png";
    imijiz["wytPin"] =
        "https://www.iconspng.com/uploads/glossy-circle/glossy-circle.png";
}

init();

socit.on("ges", (guess) => {
    if (guess[1] === ' ') {
        num = guess[0];
        col = guess.substring(2)
    }
    else {
        num = guess[0] + guess[1];
        col = guess.substring(3)
    }
    var numd = parseInt(num)
    if (numd != 111 && numd != 112 && numd!=113 && !(numd > 10 && numd < 17)) {
        if (col === 'redPin' || col === 'wytPin')
            document.getElementById(num).innerHTML = '<img id="pinz" src="' + imijiz[col] + '">';
        else
            document.getElementById(num).innerHTML = '<img src="' + imijiz[col] + '">';
    }
});

function clict() {
    var wich = this.id.toString();
    var thisWun = document.getElementById(wich);
    var cul = thisWun.getAttribute("data-colour");
    if (thisWun.className === "noBorder") {
        thisWun.firstElementChild.style.border = "2px solid black";
        thisWun.firstElementChild.style.borderRadius = "50%";
    }
    if (
        (parseInt(this.id) > 9 && parseInt(this.id) < 18) ||
        parseInt(this.id) === 111 ||
        parseInt(this.id) === 112 || parseInt(this.id) === 113
    ) {
        if (old != null) old.firstElementChild.style.border = "none";
        old = thisWun;
        colour = cul;
        ges = wich + " " + colour;
        socit.emit("ges", {guess:ges, rom:room});
        if (cul != "redPin" && cul != "wytPin") {
            var cursed = "url(" + cursor[colour] + "),move";
            document.querySelector("body").style.cursor = cursed;
        } else if (cul === "redPin")
            document.querySelector("body").style.cursor =
                "url(" + "https://i.ibb.co/jkNJSQy/red-Cursor.png" + "),move";
        else
            document.querySelector("body").style.cursor =
                "url(" + "https://i.ibb.co/dgw525d/wyt-Cursor.png" + "),move";
    } else {
        ges = wich + " " + colour;
        socit.emit("ges", {guess:ges, rom:room});
        if (colour != "redPin" && colour != "wytPin")
            thisWun.innerHTML = '<img src="' + imijiz[colour] + '">';
        else thisWun.innerHTML = '<img id="pinz" src="' + imijiz[colour] + '">';
    }
}
var all = document.querySelectorAll("td");
a = 0;
while (a < all.length) {
    if (all[a].id != "111" && all[a].id != "112" && all[a].id != '113') all[a].setAttribute("id", a);
    all[a].addEventListener("click", clict);
    a++;
}
function reset(sent) {
    if (sent)
        socit.emit('curect', room);
    guesser = !guesser;
    var butinz = document.querySelectorAll('td');
    a = 0;
    while (a < butinz.length) {
        var butID = parseInt(butinz[a].id)
        if (butID > 2 && (butID < 11 || butID > 18) && butID < 110)
            butinz[a].innerHTML = '<img class="butin" src="' +
                'https://www.freeiconspng.com/uploads/glossy-button-black-icon-10.png"' +
                ">";
        a++;
    }
    if (guesser === true) {
        if (document.querySelector("#submitMayc") != null)
            document.querySelector("#submitMayc").style.visibility = 'hidden';
        count = 0;
        document.querySelector("#colz").style.visibility = ''
        document.querySelector("#RW").style.visibility = 'hidden'
        document
            .getElementById("00")
            .insertAdjacentHTML(
                "afterend",
                '<img class="noBac" class="noGray" id="submitGes" onclick="submit()" src="https://i.ibb.co/ck0G1KW/subMit.png">'
            );
        sub = document.querySelector("#submitGes");
    } else {
        console.log('swicht')
        if (document.querySelector("#submitGes") != null)
            document.querySelector("#submitGes").style.visibility = 'hidden';
        count = -1;
        document.querySelector("#colz").style.visibility = 'hidden'
        document.querySelector("#RW").style.visibility = ''
        imij = document.createElement("img");
        imij.setAttribute("src", "https://i.ibb.co/ck0G1KW/subMit.png");
        imij.setAttribute("id", "submitMayc");
        imij.setAttribute("class", "noBac");
        imij.setAttribute("onclick", "submit()");
        document.getElementById('113').innerHTML = "<img class='noBac' id='curect' src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-6/177800/270-512.png'>"
        // document
        //   .querySelector("span")
        //   .insertBefore(imij, document.getElementById("000"));
    }
    var col=document.querySelectorAll("td");
    a=11;
    while(a<19){
        col[a].firstElementChild.setAttribute('class', 'noBac')
        a++;
    }
}
document.querySelector("#RW").style.cursor = "pointer";

function submit() {
    if (guesser)
        document.querySelector("#submitGes").style.visibility = 'hidden';
    else
        document.querySelector("#submitMayc").style.visibility = 'hidden';
    console.log('sent')
    socit.emit("sub", {gesser: guesser, rom:room})
}

socit.on("sub", sub => {
    count++;
    if (sub != guesser) {
        if (guesser) {
            aaft = document.getElementById("0" + count.toString());
            aaft.insertAdjacentHTML(
                "afterend",
                '<img id="submitGes" class="noBac" onclick="submit()" src="https://i.ibb.co/ck0G1KW/subMit.png">'
            );
            sub = document.querySelector("#submitGes");
            document.querySelector("#submitGes").style.visibility = '';
        }
        else {
            imij.remove();
            document
                .querySelector("span")
                .insertBefore(imij, document.getElementById("00" + count.toString()));
            imij = document.querySelector("#submitMayc");
            document.querySelector("#submitMayc").style.visibility = '';
        }
    }
})
