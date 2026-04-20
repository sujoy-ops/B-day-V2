/* ═══════════════════════════════════════════════════════
   Birthday Surprise — app.js  (rewritten, new variables)
   ═══════════════════════════════════════════════════════ */

"use strict";

// ── DOM refs ────────────────────────────────────────────
const bodyEl           = document.querySelector("body");
const bgOverlayEl      = document.getElementById("bgOverlay");
const bgWallpaperEl    = document.getElementById("bgWallpaper");
const mainContentEl    = document.getElementById("mainContent");
const giftWrapperEl    = document.getElementById("giftWrapper");
const giftLabelEl      = document.getElementById("giftLabel");
const stickerDisplayEl = document.getElementById("activeStickerDisplay");
const greetingTextEl   = document.getElementById("greetingText");
const msgCardEl        = document.getElementById("msgCard");
const msgIntroEl       = document.getElementById("msgIntro");
const msgTapEl         = document.getElementById("msgTap");
const emojiRowEl       = document.getElementById("emojiRow");
const msgLine2El       = document.getElementById("msgLine2");
const msgLine3El       = document.getElementById("msgLine3");
const msgLine4El       = document.getElementById("msgLine4");
const msgLine5El       = document.getElementById("msgLine5");
const msgLine6El       = document.getElementById("msgLine6");
const tapHintEl        = document.getElementById("tapHint");
const nextBtnWrapperEl = document.getElementById("nextBtnWrapper");
const nextBtnEl        = document.getElementById("nextBtn");
const rejectedStickerEl= document.getElementById("rejectedSticker");
const rejectedMsgEl    = document.getElementById("rejectedMsg");

// Sticker pool elements
const stickerPool = [
  document.getElementById("stk0"),
  document.getElementById("stk1"),
  document.getElementById("stk2"),
  document.getElementById("stk3"),
  document.getElementById("stk4"),
];

// ── Audio ────────────────────────────────────────────────
const bgAudioEl   = document.getElementById("bgAudio");
const bgAudio     = new Audio(bgAudioEl.src);

// ── State ────────────────────────────────────────────────
let giftOpened       = false;   // has the gift been clicked?
let cardActive       = false;   // is the card sequence running?
let nextBtnReady     = false;   // is next button clickable?
let currentStickerIdx = 0;      // which sticker is showing
let tapSequenceStep  = 0;       // tracks card tap steps (1-5)
let tapHintVisible   = false;   // is the tap hint showing?
let emojiTapCount    = 0;       // how many emojis have been tapped

// Saved text content for TypeIt re-use
const savedIntroText = msgIntroEl.innerHTML;
const savedLine2Text = msgLine2El.innerHTML;
const savedLine3Text = msgLine3El.innerHTML;
const savedLine4Text = msgLine4El.innerHTML;
const savedLine5Text = msgLine5El.innerHTML;
const savedLine6Text = msgLine6El.innerHTML;

// Clear typed lines at start (TypeIt will fill them)
msgLine4El.innerHTML = "";
msgLine5El.innerHTML = "";
msgLine6El.innerHTML = "";

// ── SweetAlert mixins ────────────────────────────────────
const swalQuick = Swal.mixin({
  timer: 2300,
  allowOutsideClick: false,
  showConfirmButton: false,
  timerProgressBar: true,
  imageHeight: 90,
});

const swalConfirm = Swal.mixin({
  allowOutsideClick: false,
  cancelButtonColor: "#FF0040",
  imageHeight: 80,
});

// ── Initialise page ──────────────────────────────────────
mainContentEl.style.cssText = "opacity:1; margin-top:16vh";

// ── Gift click ───────────────────────────────────────────
giftWrapperEl.addEventListener("click", function onGiftClick() {
  if (giftOpened) return;
  giftOpened = true;
  giftWrapperEl.removeEventListener("click", onGiftClick);

  bgAudio.play().catch(() => {});

  giftWrapperEl.style.cssText = "transition:all .8s ease; transform:scale(10); opacity:0";
  bgWallpaperEl.style.cssText = "transform:scale(1.5);";
  giftLabelEl.style.display   = "none";

  setTimeout(collapseGiftArea, 300);
  setTimeout(askForName,       500);
});

function collapseGiftArea() {
  giftWrapperEl.style.display = "none";
  giftLabelEl.style.display   = "none";
  mainContentEl.style.cssText = "opacity:1; margin-top:0";
  bgOverlayEl.style.opacity   = "0.7";
  bgWallpaperEl.style.cssText = "transform:scale(1.5);";
}

// ── Ask for name (fixed as per original) ────────────────
async function askForName() {
  const recipientName = "¿Name?"; // ← Replace with actual name

  if (recipientName && recipientName.length < 11) {
    window.recipientName = recipientName;
    const greetingString = "Happy Birthday, " + recipientName + "! 🎂";
    startGreetingAnimation(greetingString);
  } else {
    await Swal.fire({
      title: "Your name is lovely, but it seems a bit long.",
      text: "Please enter a shorter name.",
      icon: "warning",
    });
    askForName();
  }
}

// ── Greeting typewriter ──────────────────────────────────
function startGreetingAnimation(greetingString) {
  bgOverlayEl.style.opacity      = "0";
  bgWallpaperEl.style.cssText    = "transform:scale(1);";
  stickerDisplayEl.style.display = "inline-flex";

  setTimeout(() => showSticker(0), 200);
  setTimeout(() => {
    new TypeIt("#greetingText", {
      strings: [greetingString],
      startDelay: 50,
      speed: 40,
      waitUntilVisible: true,
      afterComplete: function () {
        greetingTextEl.innerHTML = greetingString;
        setTimeout(revealCard, 200);
      },
    }).go();
  }, 500);
}

// ── Sticker helpers ──────────────────────────────────────
function showSticker(idx) {
  stickerDisplayEl.src        = stickerPool[idx].src;
  stickerDisplayEl.style.cssText =
    "display:inline-flex; opacity:1; transform:scale(1); " +
    "border-radius:50%; padding:10px; width:100px; height:100px; " +
    "background:rgba(255,255,255,0.2); box-shadow:0 4px 30px rgba(255,255,255,0.3); " +
    "border:1px solid rgba(255,255,255,0.3); transition:all 1.2s ease;";
  currentStickerIdx = idx;
}

function hideSticker() {
  stickerDisplayEl.style.cssText =
    "display:inline-flex; opacity:1; transition:all .7s ease; transform:scale(0.1);";
}

function switchSticker(idx) {
  hideSticker();
  setTimeout(() => showSticker(idx), 300);
}

// ── Reveal card ──────────────────────────────────────────
function revealCard() {
  bgWallpaperEl.style.cssText  = "transform:scale(2);";
  bgOverlayEl.style.opacity    = "0.3";
  msgCardEl.style.cssText      =
    "position:relative; opacity:1; visibility:visible; transform:scale(1); margin-top:0";
  startIntroTypewriter();
  cardActive = true;
}

function hideCard() {
  bgWallpaperEl.style.cssText = "transform:scale(2);";
  bgOverlayEl.style.opacity   = "0.3";
  msgCardEl.style.cssText     = "position:relative; transition:all .7s ease;";
}

// ── Show next button ─────────────────────────────────────
function showNextButton() {
  bgWallpaperEl.style.cssText      = "transform:scale(1);";
  nextBtnWrapperEl.style.cssText   = "opacity:1; transform:scale(1);";
  nextBtnReady = true;
}

// ── Card intro typewriter ────────────────────────────────
function startIntroTypewriter() {
  new TypeIt("#msgIntro", {
    strings: [savedIntroText],
    startDelay: 400,
    speed: 20,
    cursor: false,
    deleteSpeed: 20,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      activateTapHint();
    },
  }).go();
}

// ── Tap hint logic ───────────────────────────────────────
function activateTapHint() {
  tapHintEl.innerHTML   = "Tap to continue! 👆";
  tapHintEl.style.opacity = "0.8";
  tapHintVisible        = true;
  tapSequenceStep      += 1;
}

function resetTapHint() {
  tapHintEl.style.opacity = "0";
  tapHintVisible          = false;
}

// ── Card tap sequence ────────────────────────────────────
msgCardEl.addEventListener("click", function () {
  if (!tapHintVisible) return;

  if (tapSequenceStep === 1) { setTimeout(showEmojiTap,    400); }
  if (tapSequenceStep === 2) { startLine23Typewriter(); }
  if (tapSequenceStep === 3) { startLine4Typewriter(); }
  if (tapSequenceStep === 4) { startLine5Typewriter(); }
  if (tapSequenceStep === 5) { startLine6Typewriter(); }

  // Fade content briefly for transition effect
  msgIntroEl.style.opacity = "0";
  setTimeout(() => { msgIntroEl.style.opacity = "1"; }, 400);

  resetTapHint();
});

function showEmojiTap() {
  msgIntroEl.innerHTML = msgTapEl.innerHTML;
  emojiRowEl.style.cssText =
    "position:relative; opacity:1; transform:scale(1);";
  tapHintEl.innerHTML   = "[ Tap all the birthday icons! ]";
  tapHintEl.style.opacity = "0.8";
}

// ── Emoji tap logic ──────────────────────────────────────
["emo1","emo2","emo3","emo4"].forEach(function(id) {
  const el = document.getElementById(id);
  el.addEventListener("click", function onEmojiTap() {
    el.style.opacity = "0";
    emojiTapCount += 1;
    el.removeEventListener("click", onEmojiTap);
    checkAllEmojisTapped();
  });
});

function checkAllEmojisTapped() {
  if (emojiTapCount < 4) return;

  emojiRowEl.style.cssText = "position:relative; transform:scale(1);";
  switchSticker(1);

  // Fade + transition
  msgIntroEl.style.opacity = "0";
  setTimeout(() => { msgIntroEl.style.opacity = "1"; }, 400);

  setTimeout(startLine23Typewriter, 400);
}

// ── Typewriter chains ────────────────────────────────────
function startLine23Typewriter() {
  bgWallpaperEl.style.cssText = "transform:scale(1.5);";
  emojiRowEl.style.cssText    = "";
  msgIntroEl.innerHTML        = "";

  new TypeIt("#msgIntro", {
    strings: [savedLine2Text, savedLine3Text],
    startDelay: 800,
    speed: 50,
    cursor: true,
    deleteSpeed: 50,
    breakLines: false,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      msgIntroEl.innerHTML = savedLine3Text;
      tapSequenceStep      = 3;
      setTimeout(activateTapHint, 700);
    },
  }).go();
}

function startLine4Typewriter() {
  bgWallpaperEl.style.cssText = "transform:scale(1);";
  switchSticker(2);

  new TypeIt("#msgLine4", {
    strings: [savedLine4Text],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      msgLine4El.innerHTML = savedLine4Text;
      tapSequenceStep      = 4;
      setTimeout(activateTapHint, 700);
    },
  }).go();
}

function startLine5Typewriter() {
  bgWallpaperEl.style.cssText = "transform:scale(1.5);";
  switchSticker(3);

  new TypeIt("#msgLine5", {
    strings: [savedLine5Text],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      msgLine5El.innerHTML = savedLine5Text + " 😊";
      tapSequenceStep      = 5;
      setTimeout(activateTapHint, 700);
    },
  }).go();
}

function startLine6Typewriter() {
  bgWallpaperEl.style.cssText = "transform:scale(1);";
  switchSticker(4);

  new TypeIt("#msgLine6", {
    strings: [savedLine6Text],
    startDelay: 1,
    speed: 52,
    cursor: true,
    waitUntilVisible: true,
    lifelike: true,
    afterComplete: function () {
      msgLine6El.innerHTML = savedLine6Text;
      setTimeout(showNextButton, 400);
    },
  }).go();
}

// ── Next button — goes DIRECTLY to hollow album ──────────
nextBtnEl.addEventListener("click", function () {
  if (!nextBtnReady) return;
  // Direct navigation, no SweetAlert delay
  window.location.href = "./hollow-album/index.html";
});
