// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var enemyList = [];
var p1 = new warriorClass();
var angel = new angelClass();


var mainMenu;
var mainMenuActive = true;


window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  mainMenu = new MainMenu();

  loadImages();
}

function loadingDoneSoStartGame() {
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);

  p1.init(playerPic, "Blue");
  var foundAnotherEnemy;
  do {
    var e1 = new enemyClass();
    foundAnotherEnemy = e1.reset();
    if (foundAnotherEnemy) {
      enemyList.push(e1);
    }
  } while (foundAnotherEnemy);

  initInput();
}

function moveEverything() {
  angel.move();
  p1.move();
  for (var i=0;i<enemyList.length; i++) {
    enemyList[i].move();
  }
}

function dist(dx, dy) {
  return Math.sqrt(dx*dx+dy*dy);
}
function angTo(dx,dy){
  return Math.atan2(dy,dx);
}

function drawEverything() {

  if (mainMenuActive)
  {
      mainMenu.Draw();
      return;
  }

  drawRoom();
  drawHealthUI();
  p1.draw();
  angel.draw();
  for (var i=0;i<enemyList.length; i++) {
    enemyList[i].draw();
  }
  colorRect(0, canvas.height - 15, canvas.width , 15, 'black');
  if (editorMode) {
    editorDraw();
    colorText("In EDITOR MODE, press Tab to toggle. CTRL to export the edited level in console", 0, canvas.height, 20, 'red');
  } else {
    colorText("Press Tab to activate editor", 0, canvas.height, 20, 'red');
  }
}
