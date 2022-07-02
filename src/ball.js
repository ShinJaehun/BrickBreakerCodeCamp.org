import { detectCollision } from "./collisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.game = game;

    this.size = 16;
    this.reset();
  }

  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 4, y: -2 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    //console.log(this.game.paddle.position.x);
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }

    // ball이 paddle에만 충돌하는게 아니라 brick에도 충돌하니까
    // CV하지 말고 collisionDetection을 처리하는 클래스를 새로 만들자.
    /*
    let bottomOfBall = this.position.y + this.size;
    let topOfPaddle = this.game.paddle.position.y;
    let leftSideOfPaddle = this.game.paddle.position.x;
    // 이런건 오류를 내줬으면 좋겠는데...
    // this.game.paddle.x라고 해도 오류를 뱉지는 않음
    // 물론 정상 동작하지는 않음.

    let rightSideOfPaddle =
      this.game.paddle.position.x + this.game.paddle.width;

    if (
      bottomOfBall >= topOfPaddle &&
      this.position.x >= leftSideOfPaddle &&
      this.position.x + this.size <= rightSideOfPaddle
    ) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
    */
  }
}
