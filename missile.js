import Point from "./point.js";
import { followPoint, getRandomColor, getRandomEnemyQuote } from "./utils.js";
export default class Missile {
  constructor(point, width, height, velocity, color, follow) {
    this.point = point;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.color = color;
    this.angle = 0;
    this.follow = follow;
    this.messageContainer = null;
    this.velocityCap = 8;
    setInterval(() => {
      this.velocity = Math.min(this.velocityCap, this.velocity + 0.3);
    }, 2000);
  }
  static RandomMissile(follow = true) {
    return new Missile(
      Point.RandomPointFromBounds(window.innerWidth, window.innerHeight),
      20 + Math.random() * 10,
      8 + Math.random() * 4,
      3 + Math.random() * 6,
      //   0,
      getRandomColor(),
      follow
    );
  }
  update(goalPoint) {
    if (Math.random() * 700 < 1 && !this.messageContainer) {
      setTimeout(() => {
        if (this.messageContainer)
          this.messageContainer.parentElement.removeChild(
            this.messageContainer
          );
        const container = document.getElementById("container");
        const toastMessage = document.createElement("div");
        toastMessage.classList = "toast-message";
        toastMessage.style.top = this.point.y + "px";
        toastMessage.style.left = this.point.x + "px";
        toastMessage.innerText = getRandomEnemyQuote();
        container.appendChild(toastMessage);
        this.messageContainer = toastMessage;
        setTimeout(() => {
          toastMessage.parentElement.removeChild(toastMessage);
          this.messageContainer = null;
        }, 3000);
      }, 200);
    }
    if (this.follow) {
      [this.point, this.angle] = followPoint(
        this.velocity,
        this.point,
        goalPoint
      );
      if (this.messageContainer) {
        this.messageContainer.style.left = this.point.x + "px";
        this.messageContainer.style.top = this.point.y + "px";
      }
    }
  }
  draw(ctx) {
    // console.log(ctx);
    ctx.save();
    ctx.translate(this.point.x, this.point.y);
    // console.log(this.angle);
    ctx.rotate(this.angle);

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(
      this.width,
      this.height / 2,
      this.height / 4 + 2,
      -Math.PI,
      2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, this.height / 2, this.height / 2, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }
}
