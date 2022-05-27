var mouseX = 0;
var mouseY = 0;

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

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  document.addEventListener("mousedown", mouseClick);
  document.addEventListener("mousemove",calculateMousePos);
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

function mouseClick() {
  console.log(Math.floor(mouseX), Math.floor(mouseY));
  var mouseTileIndex = getTileIndexAtPixelCoord(mouseX,mouseY);
  
  if( mouseTileIndex != undefined) {
    roomGrid[mouseTileIndex] = TILE_WALL;
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
  setKeyHoldState(evt.keyCode, p1, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, p1, false);
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  mouseX = evt.clientX - rect.left;
  mouseY = evt.clientY - rect.top;
}