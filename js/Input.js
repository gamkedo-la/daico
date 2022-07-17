var mouseX = 0;
var mouseY = 0;
var editorTileIndex = 0;
var editorMode = true;

// keyboard keycode constants, determined by printing out evt.keyCode from a key handler
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_LETTER_SPACE = 32;
const KEY_CTRL = 17;
const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_LEFT_BRACKET = 219;
const KEY_RIGHT_BRACKET = 221;
const KEY_LETTER_M = 77;
const KEY_LETTER_P = 80;
const KEY_LETTER_R = 82;
var mainMenuMusic;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  document.addEventListener("mousedown", mouseClick);
  document.addEventListener("mousemove",calculateMousePos);
  document.addEventListener("wheel", mouseWheel);
	/*document.addEventListener("mouseup", function() {
		prevEditedTileIndex = -1;
		bMouseDown = false;
	});

		document.addEventListener("wheel", function(evt) {
			isMouseWheel = true;
			wheelDir = Math.sign(evt.deltaY);
		});*/
  p1.setupControls(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW,KEY_LEFT_ARROW, KEY_LETTER_SPACE);
}

function mouseWheel(evt){
  editorTileIndex +=  Math.sign(evt.deltaY);
  if (editorTileIndex < 0) {
    editorTileIndex = 0;
  }
  if (editorTileIndex > TILE_LAST) {
    editorTileIndex = 0;
  }
}
function mouseClick() {
  if(editorMode == false) {
    return;
  }
  editorClick();

}
function editorKeyCheck(keyCode) {
  switch (keyCode) {
    case KEY_LEFT_BRACKET:
      raycastP1X = mouseX;
      raycastP1Y = mouseY;
      break;
    case KEY_RIGHT_BRACKET:
      raycastP2X = mouseX;
      raycastP2Y = mouseY;
      break;
    case KEY_CTRL:
      exportLevel();
      break;
  }
  
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if(thisKey == thisPlayer.controlKeyForNorth) {
    thisPlayer.keyHeld_North = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForEast) {
    thisPlayer.keyHeld_East = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForSouth) {
    thisPlayer.keyHeld_South = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForWest) {
    thisPlayer.keyHeld_West = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForAttack && setTo == false) {
    thisPlayer.attack();
  }
}

function keyPressed(evt) {
  if (splashMenuActive)
  {
    splashMenuActive = false;
    mainMenuActive = true;
    mainMenuMusic = BackgroundMusicClass("audio/menudir");
  } else if (mainMenuActive)
  {
    if (evt.keyCode == KEY_ENTER)
    {
      mainMenuActive = false;
      mainMenuMusic.startOrStopMusic();
      BackgroundMusicClass("audio/DAICO_MUSIC");
    }
    return;
  }

  switch (evt.keyCode) {
    case KEY_LETTER_M:
      // M key to mute music
      startOrStopMusic();
      
      break;

    case KEY_LETTER_P:
      // P key to pause game
      isGamePaused = !isGamePaused;
      console.log("Game is paused");
      break;

    case KEY_LETTER_R:
        if(gameIsOver) {
          gameIsOver = !gameIsOver;
          p1.reset();
          for (var i=0;i<enemyList.length; i++) {
            enemyList[i].reset();
          }
          
          angel.reset();
          heartHeld = 4;
        }
        break;
    }

  setKeyHoldState(evt.keyCode, p1, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  if (editorMode) {
    editorKeyCheck(evt.keyCode);
  }
  switch (evt.keyCode) {
    case KEY_TAB:
      editorMode = !editorMode;
      if (editorMode == false) {
        roomList[roomIndex] = JSON.parse(JSON.stringify(roomGrid));
        loadLevel(roomList[roomIndex]);
      } else {
        roomGrid =  JSON.parse(JSON.stringify(roomList[roomIndex]));
        enemyList = [];
        loadLevel(roomList[roomIndex]);
        //player should also be removed
      }
      break;
  }
  setKeyHoldState(evt.keyCode, p1, false);
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
}

function exportLevel(){
  var currentLevel = JSON.stringify(roomGrid);
   console.log(currentLevel);
};
