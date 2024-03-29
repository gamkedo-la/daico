var introCountdown = 400; // frames until the intro is turned off
var intro = 
    ["Defying the manor's landlord, you're willing to ",
    "leave your dark realm of comfort to rescue the angel. ",
    "One that has been kept in the lowest cells and",
    "locked by a key that can be only combined from",
    "three items in different hazardous places."];

var introSpeedUp = false;

const VERTICAL_OFFSET_OF_FEET = PLAYER_SPRITE_FRAME_H * 0.8;
// save the canvas for dimensions, and its 2d context for drawing to it
const minimapX = 40;
const minimapY = 40;


var showMinimap = true;
var canvas, canvasContext;
var characterDrawOrder = [];

var enemyList = [];
var enemyAttackList = [];
var p1 = new warriorClass();
var angel = new angelClass();
var bossDefeatedYet = false; // note: not yet safely reloading on game reset

var mainMenu;
var mainMenuActive = false;

var splashMenu;
var splashMenuActive = true;
var pauseScreen;
var gameIsOver;
var gameIsWon;

//for deltaTime
let now;
let previousNow;
const TIME_SCALE = 100;

let batManager;

let ratManager;

var isGamePaused = false;
var editorMode = false;
var isInventoryOn = false;
var isHelpOn = false;

var bossFightMusic = new SoundOverlapsClass("audio/boss-fight");
var bossFight2Music = new SoundOverlapsClass("audio/boss-fight-v2");
var daicoMusic = new SoundOverlapsClass("audio/DAICO_MUSIC");
var doorSound = new SoundOverlapsClass("audio/door");
var attackSound = new SoundOverlapsClass("audio/enemyattack");
var enemyHitSound = new SoundOverlapsClass("audio/EnemyHit");
var enemyDeadSound = new SoundOverlapsClass("audio/enemydead");
var hurtSound = new SoundOverlapsClass("audio/hurt");
var menuSound = new SoundOverlapsClass("audio/menudir");
var pickItemSound = new SoundOverlapsClass("audio/pickitem");
var gameOverSound = new SoundOverlapsClass("audio/gameover");
var startSound = new SoundOverlapsClass("audio/Start");
var alarmSound = new SoundOverlapsClass("audio/alarm");

var daicoFont = new FontFace("daicoFont", 'url(fonts/Deutsch.ttf)');

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  miniMapCanvas = document.createElement('canvas');
  miniMapCanvas.width = MINIMAP_TILE_SIZE*ROOM_COLS;
  miniMapCanvas.height = MINIMAP_TILE_SIZE*ROOM_ROWS;
  miniMapCanvasContext = miniMapCanvas.getContext('2d');
  mainMenu = new MainMenu();
  splashMenu = new Splash();
  pauseScreen = new PauseScreen();
  gameOverScreen = new GameOverScreen();
  gameWinScreen = new GameWinScreen();
  //for deltaTime
  previousNow = performance.now();

  daicoFont.load().then(function(font){
    // with canvas, if this is ommited won't work
    document.fonts.add(font);  
    document.body.style.fontFamily = 'daicoFont, Arial';    
  }).catch(function(error) {
      // error occurred
  });  

  loadImages();
}

function loadingDoneSoStartGame() {
  loadLevel(roomDungeon);
  
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      if (!isGamePaused && !gameIsOver) {
        moveEverything();
      }
      particles.update(); // fade particles out even when paused
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

    for (var i=enemyAttackList.length-1; i>=0; i--) {
      enemyAttackList[i].move();
      if (enemyAttackList[i].readyToRemove()) {
        enemyAttackList.splice(i, 1);
      }
    }

    for(var i = 0; i < enemyAttackList.length; i++){
      p1.collisionCheck(enemyAttackList[i]);
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

  particles.draw();

  /*p1.draw();
  angel.draw();
  for (var i=0;i<enemyList.length; i++) {
    enemyList[i].draw();
  }*/
  characterDrawOrder.sort(sortDrawY);
  for (var i=0;i<characterDrawOrder.length; i++) {
    characterDrawOrder[i].draw();
  }
  for (var i=0;i<enemyAttackList.length; i++) {
    enemyAttackList[i].draw();
  }
  endCameraPan();
  drawHealthUI();
  if (showMinimap == true) {
    drawMiniMap(minimapX,minimapY);
  }
  colorRect(0, canvas.height - 15, canvas.width , 15, 'black');
  if (editorMode) {
    editorDraw();
    colorText("In EDITOR MODE, press Tab to toggle. CTRL to export the edited level in console", 0, canvas.height, 20, 'red');
  } else {
    //colorText("Press Tab to activate editor", 0, canvas.height, 20, 'red');
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
  if (gameIsOver)
  {gameOverScreen.draw();
  }
  if (gameIsWon)
  {gameWinScreen.draw();
  }
  if(isInventoryOn) {
    drawItemsUI();
  }
  if(isHelpOn) {
    drawHelp();
  }
  if(introCountdown > 0) {
    introCountdown -= introSpeedUp ? 20 : 1;
    drawIntro();
  }
}

function drawIntro() {
    var introX = 200;
    var introY = 400 + introCountdown/2;
    var introH = 30;
    for (let i=0; i<intro.length; i++) {
        colorText(intro[i],introX,introY,20,"black");
        colorText(intro[i],introX-1,introY-1,20,"white");
        introY += introH;
    }
}

function sortDrawY(a,b) {
  return a.y - b.y;
}
