// tuning constants
const PLAYER_MOVE_SPEED = 3.0;
const FRAMES_BETWEEN_HEART_LOSS = 30;
var heartHeld = 5;
var hea
function warriorClass() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;

  // key controls used for this
  this.setupControls = function(northKey,eastKey,southKey,westKey, attackKey) {
    this.controlKeyForNorth = northKey;
    this.controlKeyForEast = eastKey;
    this.controlKeyForSouth = southKey;
    this.controlKeyForWest = westKey;
    this.controlKeyForAttack = attackKey;
  }

  this.init = function(whichGraphic,whichName) {
    this.myBitmap = whichGraphic;
    this.myName = whichName;
    this.reset();
  }
  
  this.reset = function() {
    this.keysHeld = 0;
    if(this.homeX == undefined) {
      for(var i=0; i<roomGrid.length; i++) {
        if( roomGrid[i] == TILE_PLAYER) {
          var tileRow = Math.floor(i/ROOM_COLS);
          var tileCol = i%ROOM_COLS;
          this.homeX = tileCol * TILE_W + 0.5*TILE_W;
          this.homeY = tileRow * TILE_H + 0.5*TILE_H;
          roomGrid[i] = TILE_GROUND;
          break; // found it, so no need to keep searching 
        } // end of if
      } // end of for
    } // end of if position not saved yet
    
    this.x = this.homeX;
    this.y = this.homeY;

  } // end of reset
  
  this.testMove = function(nextX,nextY) {
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL; // assume wall when tile is missing
    if (walkIntoTileIndex != undefined) { walkIntoTileType = roomGrid[walkIntoTileIndex]; }
    switch( walkIntoTileType ) {
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GOAL:
        document.getElementById("debugText").innerHTML = this.myName + " won";
        this.reset();
        break;
      case TILE_DOOR:
        if(this.keysHeld > 0) {
          this.keysHeld--; // one less key
          document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;
          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
        }
        break;
      case TILE_KEY:
        this.keysHeld++; // gain key
        document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;
        roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
        break;
      case TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }

  this.move = function() {

    // to allow "wall sliding"
    // (diagonal movement not getting stuck)
    // we check horiz and vert movement individually
    
    if (this.keyHeld_East) this.testMove(this.x+PLAYER_MOVE_SPEED,this.y);
    if (this.keyHeld_West) this.testMove(this.x-PLAYER_MOVE_SPEED,this.y);
    if (this.keyHeld_North) this.testMove(this.x,this.y-PLAYER_MOVE_SPEED);
    if (this.keyHeld_South) this.testMove(this.x,this.y+PLAYER_MOVE_SPEED);
        
  }
  
  this.attack = function () {
    for (var i=enemyList.length-1;i>=0; i--) { // backward since we splice from it
      var disX = Math.abs(enemyList[i].x - this.x);
      var disY = Math.abs(enemyList[i].y - this.y);
      if (disX + disY < 50) {
        for (var ii=characterDrawOrder.length;ii>=0; ii--) {
          if (characterDrawOrder[ii] == enemyList[i]) {
            characterDrawOrder.splice(ii,1);
          }
        }
        enemyList.splice(i,1);
      }
    }
  }

  this.playerHit = function() {
    console.log("HITT");
    if(!editorMode){
        if(heartLossDelay > 0){
            return;
        } else {
            HearthLossDelay = FRAMES_BETWEEN_HEART_LOSS;
        }

        if (this.powerUpMode() == false) {
            hitSound.play();
            heartHeld--;
        }
        if (HeartHeld == 0){
            alarmSound.play();
        }

    if (heartHeld < 0){
      deathSound.play();
      gameState = STATE_GAME_OVER;
      gameIsOver = true;
    }
  }
}
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );
  }

} // end of class