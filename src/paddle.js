export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.width = 150;
    this.height = 30;
    this.maxSpeed = 7;
    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = +this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    //if (!deltaTime) return;
    // 이런 식으로 timestamp 확인(그런데 걍 애니메이션이 아니므로 여기서는 삭제)

    //this.position.x += 5 / deltaTime;
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }
}
