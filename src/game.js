import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
//import Brick from "/src/brick";

//import { buildLevel, level1 } from "/src/levels";
import { buildLevel, level0, level1, level2 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);

    this.lives = 3;
    this.gameObjects = [];
    this.bricks = [];

    this.levels = [level0, level1, level2];
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    //menu도 만들어지고 그러면서 start()는 게임 실행만 처리하기로...
    //this.gamestate = GAMESTATE.MENU;
    //this.paddle = new Paddle(this);
    //this.ball = new Ball(this);

    //let brick = new Brick(this, { x: 20, y: 20 });
    //this.gameObjects = [this.ball, this.paddle, brick];

    /*
    let bricks = [];
    for (let i = 0; i < 10; i++) {
      bricks.push(new Brick(this, { x: i * 52, y: 30 }));
    }
    this.gameObjects = [this.ball, this.paddle, ...bricks];
    */

    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL

      /*
      this.gamestate !== GAMESTATE.MENU ||
      this.gamestate !== GAMESTATE.NEWLEVEL
      마지막에 이 오류 찾느라 고생했는데 ||가 아니라 &&지!!
      */
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    //new InputHandler(this.paddle, this);
    //menu 만들면서 이 부분도 constructor로 이동...

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      //console.log("new level!");
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    //this.paddle.update(deltaTime);
    //this.ball.update(deltaTime);
    //this.gameObjects.forEach((object) => object.update(deltaTime));
    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(ctx) {
    //this.paddle.draw(ctx);
    //this.ball.draw(ctx);
    //this.gameObjects.forEach((object) => object.draw(ctx));
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      //진짜 어의 없는게 ctx.fillstyle = 뭐 이런식으로 해도
      // 오류 없이 실행은 된다. 물론 이상한 색으로 채워지는게 문제긴 해도...
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      //진짜 어의 없는게 ctx.fillstyle = 뭐 이런식으로 해도
      // 오류 없이 실행은 된다. 물론 이상한 색으로 채워지는게 문제긴 해도...
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("게임오버", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      //진짜 어의 없는게 ctx.fillstyle = 뭐 이런식으로 해도
      // 오류 없이 실행은 된다. 물론 이상한 색으로 채워지는게 문제긴 해도...
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "스페이스 키를 누르면 시작해요",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
