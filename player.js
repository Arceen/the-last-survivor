import Point from "./point.js";
import { areAnyPointsInRange } from "./utils.js";
export default class Player {
  constructor(initPosition = null, velocityCap = 5) {
    this.pos = initPosition
      ? initPosition
      : Point.RandomPointFromBounds(window.innerWidth, window.innerHeight);
    this.velocityCap = velocityCap;
    this.width = 10;
    this.height = 10;
    this.velocity = 8;
    this.color = "cyan";
    this.angle = 0;
    this.isMissileClose = false;
    this.missileDangerDistanceBorder = this.width * 10;
    this.animationCycle = 0;
    this.animationCycleMax = 10;
    this.missileHeadSize = 2;
    this.posHistory = [];
    this.direction = {
      up: false,
      left: false,
      right: false,
      bottom: false,
    };
    setInterval(() => {
      this.animationCycle = ++this.animationCycle % this.animationCycleMax;
    }, 50);
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyA" || e.code === "ArrowLeft") {
        this.direction.left = true;
      }
      if (e.code === "KeyS" || e.code === "ArrowDown") {
        this.direction.down = true;
      }
      if (e.code === "KeyD" || e.code === "ArrowRight") {
        this.direction.right = true;
      }
      if (e.code === "KeyW" || e.code === "ArrowsUp") {
        this.direction.up = true;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.code === "KeyA" || e.code === "ArrowLeft") {
        this.direction.left = false;
      }
      if (e.code === "KeyS" || e.code === "ArrowDown") {
        this.direction.down = false;
      }
      if (e.code === "KeyD" || e.code === "ArrowRight") {
        this.direction.right = false;
      }
      if (e.code === "KeyW" || e.code === "ArrowUp") {
        this.direction.up = false;
      }
    });
  }
  update(missilePosArray) {
    this.isMissileClose = areAnyPointsInRange(
      this.pos,
      missilePosArray,
      this.missileDangerDistanceBorder + this.missileHeadSize
    );
    const shouldVelocitySlow =
      (this.direction.left ^ this.direction.right) +
        (this.direction.up ^ this.direction.down) ===
      2;
    const velocity = shouldVelocitySlow
      ? (this.velocity * Math.sqrt(2)) / 2
      : this.velocity;
    if (this.direction.left) {
      this.pos.x -= velocity;
    }
    if (this.direction.down) {
      this.pos.y += velocity;
    }
    if (this.direction.right) {
      this.pos.x += velocity;
    }
    if (this.direction.up) {
      this.pos.y -= velocity;
    }

    this.posHistory.push({ x: this.pos.x, y: this.pos.y });
    if (this.posHistory.length > 20) {
      this.posHistory.shift();
    }
  }
  draw(ctx) {
    // console.log(ctx);
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);

    ctx.fillStyle = "orange";

    ctx.strokeStyle = this.isMissileClose ? "red" : "green";
    ctx.fillStyle = `rgb(255 50 50 / ${20 + (this.animationCycle + 1) * 2}%)`;
    ctx.beginPath();
    ctx.arc(
      0,
      this.width / 2,
      this.missileDangerDistanceBorder,
      0,
      Math.PI * 2
    );

    if (this.isMissileClose) {
      ctx.fill();
    }
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(0, this.width / 2, this.width / 2, 0, Math.PI * 2);

    ctx.fill();
    ctx.closePath();

    // ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
    ctx.beginPath();
    const trailBaseColorPercent = 50;
    // ctx.strokeStyle = `rgb(255 255 255 / ${trailBaseColorPercent}%)`;
    ctx.lineWidth = 2;

    if (!this.isMissileClose) {
      console.log(this.posHistory);
    }
    for (let i = 0; i < this.posHistory.length; i++) {
      //   ctx.strokeStyle = `rgb(255 255 255 / ${trailBaseColorPercent + 4 * i}%)`;

      if (i) {
        ctx.strokeStyle = `rgb(255 255 255 / ${
          trailBaseColorPercent + (this.posHistory.length - i - 1) * 2
        }%)`;
        ctx.lineTo(this.posHistory[i].x, this.posHistory[i].y + this.width / 2);
      } else {
        ctx.moveTo(this.posHistory[i].x, this.posHistory[i].y + this.width / 2);
      }
    }
    ctx.lineTo(this.pos.x, this.pos.y + this.width / 2);
    ctx.stroke();
  }
}
