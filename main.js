import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();

// Your existing code...
let gameseq = [];
let userseq = [];
let btns = ["cayan", "red", "orange", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game started");
    started = true;
    levelUp();
  }

});

function GameFlash(btn) {
  btn.classList.add("flash")

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);

}

function userFlash(btn) {
  btn.classList.add("userFlash")

  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);

}

function levelUp() {

  userseq = [];

  level++;
  h2.innerText = `Level ${level}`;


  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);

  gameseq.push(randColor);
  console.log(gameseq);

  GameFlash(randBtn);
}

function checkAns(idx) {

  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelUp, 1000);
    }
    console.log("Same Value");
  } else {
    h2.innerHTML = `Game over!! Your high score is <b>${level}</b> <br> Press any key to Start again.....`;
    document.querySelector("body").style.backgroundColor = "red";

    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";

    }, 300);
    reset();
  }

}

function ButtonPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userseq.push(userColor);

  checkAns(userseq.length - 1);
}


let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
  btn.addEventListener("click", ButtonPress);
}


function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;

}
