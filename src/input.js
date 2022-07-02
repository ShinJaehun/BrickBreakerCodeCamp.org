export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      //alert(event.keyCode);
      switch (event.keyCode) {
        case 37:
          //alert("move left");
          paddle.moveLeft();
          break;
        case 39:
          //alert("move right");
          paddle.moveRight();
          break;

        case 27:
          game.togglePause();
          break;

        case 32:
          game.start();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      //alert(event.keyCode);
      switch (event.keyCode) {
        case 37:
          //alert("move left");
          //paddle.stop();
          if (paddle.speed < 0) paddle.stop();
          //그냥 paddle.stop()보다 자연스럽게 정지됨
          // 정말?
          break;
        case 39:
          //alert("move right");
          //paddle.stop();
          if (paddle.speed > 0) paddle.stop();
          break;
        default:
          break;
      }
    });
  }
}
