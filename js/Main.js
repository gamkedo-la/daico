// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
var characterDrawOrder = [];

var enemyList = [];
var p1 = new warriorClass();
var angel = new angelClass();

var mainMenu;
var mainMenuActive = false;

var splashMenu;
var splashMenuActive = true;
var pauseScreen;

//for deltaTime
let now;
let previousNow;
const TIME_SCALE = 100;

let batManager;

let ratManager;

var isGamePaused = false;
var editorMode = false;
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  mainMenu = new MainMenu();
  splashMenu = new Splash();
  pauseScreen = new PauseScreen();

  //for deltaTime
  previousNow = performance.now();

  loadImages();
}

function loadingDoneSoStartGame() {
  loadLevel(roomDungeon);
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      if (!isGamePaused) {
        moveEverything();
      }
      drawEverything();
    }, 1000/framesPerSecond);

  
  initInput();

  batManager = new BatManager();
  batManager.Initialize();

  ratManager = new RatManager();
  ratManager.Initialize();
}



function moveEverything() {
  angel.move();
  //for deltaTime
  now = performance.now();
  deltaTime = now-previousNow;
  previousNow = now;

  if (mainMenuActive)
  {
    batManager.UpdateBatImageIndices();
    batManager.MoveBats();
    ratManager.MoveRats();
  }

  p1.move();
  for (var i=0;i<enemyList.length; i++) {
    enemyList[i].move();
  }

    for(var i = 0; i < enemyList.length; i++){
      p1.collisionCheck(enemyList[i]);
    }
}



function dist(dx, dy) {
  return Math.sqrt(dx*dx+dy*dy);
}
function angTo(dx,dy){
  return Math.atan2(dy,dx);
}



function drawEverything() {
  if(splashMenuActive){
    splashMenu.Draw();
    return;
  }

  if (mainMenuActive)
  {
      mainMenu.Draw();
      batManager.DrawBats();
      ratManager.DrawRats();
      return;
  }
  cameraPan();
  drawRoom();
  /*p1.draw();
  angel.draw();
  for (var i=0;i<enemyList.length; i++) {
    enemyList[i].draw();
  }*/
  characterDrawOrder.sort(sortDrawY);
  for (var i=0;i<characterDrawOrder.length; i++) {
    characterDrawOrder[i].draw();
  }
  endCameraPan();
  drawHealthUI();
  colorRect(0, canvas.height - 15, canvas.width , 15, 'black');
  if (editorMode) {
    editorDraw();
    colorText("In EDITOR MODE, press Tab to toggle. CTRL to export the edited level in console", 0, canvas.height, 20, 'red');
  } else {
    colorText("Press Tab to activate editor", 0, canvas.height, 20, 'red');
  }
  /*var raycastColor;
  var lineBlocked = isWallBetweenPoints(raycastP1X, raycastP1Y, raycastP2X, raycastP2Y);
  if (lineBlocked) {
    raycastColor = "red";
  } else {
    raycastColor = "lime";
  }
  colorLine(raycastP1X, raycastP1Y, raycastP2X, raycastP2Y, raycastColor);*/

  if (isGamePaused) {
    pauseScreen.draw();
  }
}

function sortDrawY(a,b) {
  return a.y - b.y;
}
