import jsonData from "./data.js";
import Point from "./point.js";
function isPointInRange(pointA, pointB, maxDistance) {
  return calculateDistanceBetweenTwoPoints(pointA, pointB) <= maxDistance;
}
function areAnyPointsInRange(centerPoint, points, maxDistance) {
  return points.some((point) =>
    isPointInRange(centerPoint, point, maxDistance)
  );
}

function calculateDistanceBetweenTwoPoints(pointA, pointB) {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function followPoint(velocity, pointFrom, pointTo) {
  let dx = pointFrom.x - pointTo.x;
  let dy = pointFrom.y - pointTo.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let angle = Math.atan2(dy, dx);
  if (distance < 10) {
    return [pointFrom, angle];
  }
  //   console.log(angle);
  [dy, dx] = [Math.abs(dy), Math.abs(dx)];
  let totalDiff = dx + dy;
  let inverseRoot2 = 1 / Math.sqrt(2);
  dx = ((velocity * dx) / distance) * inverseRoot2;
  dy = ((velocity * dy) / distance) * inverseRoot2;
  dx *= pointFrom.x >= pointTo.x ? -1 : 1;
  dy *= pointFrom.y >= pointTo.y ? -1 : 1;

  return [new Point(pointFrom.x + dx, pointFrom.y + dy), angle];
}

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 155) + 100} ${
    Math.floor(Math.random() * 155) + 100
  } ${Math.floor(Math.random() * 155) + 100}/80)`;
}

function getRandomEnemyQuote() {
  const enemyQuotes = jsonData.quotes.enemy;
  return enemyQuotes[Math.floor(Math.random() * enemyQuotes.length)];
}

export {
  followPoint,
  getRandomColor,
  areAnyPointsInRange,
  getRandomEnemyQuote,
};
