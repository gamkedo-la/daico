// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var enemyList = [];
var p1 = new warriorClass();


window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
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
  drawRoom();
  
  p1.draw();
  for (var i=0;i<enemyList.length; i++) {
    enemyList[i].draw();
  }
}