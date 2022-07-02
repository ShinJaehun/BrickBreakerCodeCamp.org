import Game from "/src/game";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

/*
ctx.clearRect(0, 0, 800, 600);
// 항상 이렇게 그려놓고 지워야 이동하는 것처럼 보임
ctx.fillStyle = '#f00';
ctx.fillRect(20, 20, 100, 100);
ctx.fillStyle = '#00f';
ctx.fillRect(300, 200, 50, 50);
*/

// paddel도 ball의 위치를 알아야 하고,
// ball도 paddle의 위치를 알아야 해서
// 매개변수로 넘기지 말고 이 부분을 리팩토링하기로 한다.
//let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
//let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

//new InputHandler(paddle);

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
//game.start();
//menu 만들면서 바로 시작하지 않도록...

/*
while(true){
  // 이런 식으로 게임 루프를 처리하고 싶지만 
  // 모든 시스템이 같은 속도로 동작하지 않기 때문에(?)
  // 이렇게 해서는 안된다고 함...
  // 그리고 걍 브라우저에서 RangeError가 나오네요...
  paddle.draw(ctx);
}
*/

let lastTime = 0;

// images
//let imgBall = document.getElementById("img_ball");

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  /*
  paddle.update(deltaTime);
  paddle.draw(ctx);

  ball.update(deltaTime);
  ball.draw(ctx);
*/

  game.update(deltaTime);
  game.draw(ctx);

  //ctx.drawImage(imgBall, 10, 10, 16, 16);

  requestAnimationFrame(gameLoop);
  // 이게 프레임을 구해서 timestamp를 알려주는 거 같음
  // 다시 gameLoop를 돌리는데 다음 프레임의 timestamp를 구해서
}

//gameLoop();
requestAnimationFrame(gameLoop);
//gameLoop() 대신 이렇게 해야 올바른 timestamp를 구할 수 있다고 함
