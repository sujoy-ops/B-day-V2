function initengahan() {
  kadoIn.style = "display:none";
  ket.style = "display:none";
  Content.style = "opacity:1;margin-top:0";
  bodyblur.style = "opacity:.7";
  wallpaper.style = "transform: scale(1.5);";
}

async function mulainama() {
  bodyblur.style = "opacity:0";
  wallpaper.style = "transform: scale(1);";
  fotostiker.style = "display:inline-flex;";
  setTimeout(ftmuncul, 200);
  setTimeout(kethalo, 500);
}

function ftmuncul() {
  const srcs = [deffotostiker, fotostiker1.src, fotostiker2.src, fotostiker3.src, fotostiker4.src];
  fotostiker.src = srcs[ftganti] || deffotostiker;
  fotostiker.style = "display:inline-flex;opacity:1;transform:scale(1)";
}

function fthilang() {
  fotostiker.style = "display:inline-flex;opacity:1;transition:all .7s ease;transform:scale(.1)";
}

function jjfoto() {
  fotostiker.style.animation = "rto .8s infinite alternate";
}

function bqmuncul() {
  bq.style = "position:relative;opacity:1;visibility:visible;transform: scale(1);margin-top:0";
  mulaiketik1();
  fungsi = 1;
}

function bqhilang() {
  wallpaper.style = "transform: scale(2);";
  bodyblur.style = "opacity:.3";
  bq.style = "position:relative;transition:all .7s ease;";
}

function kethalo() {
  new TypeIt("#halo", {
    strings: [vketikhalo],
    startDelay: 50,
    speed: 40,
    waitUntilVisible: true,
    afterComplete: function () {
      halo.innerHTML = vketikhalo;
      setTimeout(bqmuncul, 200);
    },
  }).go();
}

function tombol() {
  wallpaper.style = "transform: scale(1);";
  Tombol.style = "opacity:1;transform: scale(1);";
  fungsi = 1;
}

// Next button — goes DIRECTLY to hollow album, no extra dialogs
document.getElementById("By").onclick = function () {
  if (fungsi === 1 || fungsi === 2) {
    window.location = "./hollow-album/index.html";
  }
};

// Helper kept in case referenced elsewhere, but no longer called by Next
function menuju() {
  window.location = "./hollow-album/index.html";
}

const vketik1 = kalimat.innerHTML;
kalimat.innerHTML = "";

function mulaiketik1() {
  new TypeIt("#kalimat", {
    strings: [vketik1],
    startDelay: 400,
    speed: 20,
    cursor: false,
    deleteSpeed: 20,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      aktiopsL();
    },
  }).go();
}

let opsLclick = 0, opsLcheck = 0;
const defopsL = opsL.innerHTML;

document.getElementById("bq").onclick = function () {
  if (opsLclick === 1) {
    if (opsLcheck === 1) setTimeout(aktipesan1, 400);
    if (opsLcheck === 2) mulaiketik3();
    if (opsLcheck === 3) mulaiketik4();
    if (opsLcheck === 4) mulaiketik5();
    if (opsLcheck === 5) kethalo2();
    otomatis();
    opsL.style.opacity = "0";
    opsLclick = 0;
  }
};

function aktiopsL() {
  opsL.innerHTML = defopsL;
  opsL.style.opacity = ".8";
  opsLclick = 1;
  opsLcheck += 1;
}

function gantiopsL() {
  opsL.innerHTML = "[ Tap one of the birthday icons! ]";
  opsL.style.opacity = ".8";
}

function otomatis() {
  kalimat.style = "opacity:0";
  setTimeout(otolanj, 400);
}

function otolanj() {
  kalimat.style = "opacity:1";
}

function aktipesan1() {
  kalimat.innerHTML = pesan1.innerHTML;
  kolombaru.style = "position:relative;opacity:1;transform:scale(1);";
}

const vketik2 = pesan2.innerHTML;
const vketik3 = pesan3.innerHTML;

function aktipesan2() {
  wallpaper.style = "transform: scale(1.5);";
  kolombaru.style = "";
  kalimat.innerHTML = "";
  new TypeIt("#kalimat", {
    strings: [vketik2, vketik3],
    startDelay: 800,
    speed: 50,
    cursor: true,
    deleteSpeed: 50,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      kalimat.innerHTML = vketik3;
      setTimeout(aktipesan4, 700);
    },
  }).go();
}

const vketik4 = pesan4.innerHTML;
pesan4.innerHTML = "";

function aktipesan4() {
  wallpaper.style = "transform: scale(1);";
  fthilang();
  ftganti = 2;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan4", {
    strings: [vketik4],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      pesan4.innerHTML = vketik4;
      setTimeout(aktipesan5, 700);
    },
  }).go();
}

const vketik5 = pesan5.innerHTML;
pesan5.innerHTML = "";

function aktipesan5() {
  wallpaper.style = "transform: scale(1.5);";
  fthilang();
  ftganti = 3;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan5", {
    strings: [vketik5],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      pesan5.innerHTML = vketik5 + " 😊";
      setTimeout(aktipesan6, 700);
    },
  }).go();
}

const vketik6 = pesan6.innerHTML;
pesan6.innerHTML = "";

function aktipesan6() {
  wallpaper.style = "transform: scale(1);";
  fthilang();
  ftganti = 4;
  setTimeout(ftmuncul, 300);
  new TypeIt("#pesan6", {
    strings: [vketik6],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      pesan6.innerHTML = vketik6;
      setTimeout(tombol, 400);
    },
  }).go();
}

let slov = 0;
["lv1","lv2","lv3","lv4"].forEach(id => {
  document.getElementById(id).onclick = function () {
    this.style = "opacity:0";
    slov += 1;
    this.onclick = null;
    checkslov();
  };
});

function checkslov() {
  if (slov === 4) {
    kolombaru.style = "position:relative;transform:scale(1)";
    fthilang();
    ftganti = 1;
    setTimeout(ftmuncul, 300);
    otomatis();
    setTimeout(aktipesan2, 400);
  }
}
