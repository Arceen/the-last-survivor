export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  updatePoint(x, y) {
    this.x = x;
    this.y = y;
  }
  static RandomPointFromBounds(w, h) {
    return new Point(Math.random() * w, Math.random() * h);
  }
}
