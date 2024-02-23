import Missile from "./missile.js";
import Player from "./player.js";
import Point from "./point.js";

const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.height = `${window.innerHeight}px`;
canvas.style.width = `${window.innerWidth}px`;
canvas.style.background = "black";
const ctx = canvas.getContext("2d");
const mousePos = new Point(0, 0);
window.addEventListener("resize", (e) => {
  canvas.height = window.innerHeight * window.devicePixelRatio;
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.style.height = `${window.innerHeight * window.devicePixelRatio}px`;
  canvas.style.width = `${window.innerWidth * window.devicePixelRatio}px`;
});

window.addEventListener("mousemove", (e) => {
  mousePos.updatePoint(e.clientX, e.clientY);
  // console.log(mousePos);
});

let noOfMissiles = 3;
// let numMissiles = Math.ceil(Math.random() * noOfMissiles) + noOfMissiles;
let numMissiles = 1;
let missiles = Array(numMissiles)
  .fill(null)
  .map((item) => Missile.RandomMissile());
const player = new Player();
setInterval(() => {
  missiles.push(Missile.RandomMissile());
}, 5000);
function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const missilePosArray = missiles.map((missile) => missile.point);
  player.update(missilePosArray);
  player.draw(ctx);
  missiles.forEach((missile) => missile.update(player.pos));
  missiles.forEach((missile) => missile.draw(ctx));

  requestAnimationFrame(startGame);
}

document.addEventListener("startgame", () => {
  main();
});
function main() {
  const tutorialWindow = document.getElementById("tutorial-window");
  tutorialWindow.style.display = "block";
  setTimeout(() => {
    tutorialWindow.style.display = "none";
  }, 10000);
  startGame();
}

// Tutorial Stuff
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  document.dispatchEvent(new CustomEvent("startgame"));
  const introWindow = document.getElementById("intro-window");
  introWindow.style.display = "none";
});
