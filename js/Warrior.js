// tuning constants
const PLAYER_MOVE_SPEED = 3.0;
const FRAMES_BETWEEN_HEART_LOSS = 30;
const PLAYER_SPRITE_FRAME_W = 50;
const PLAYER_SPRITE_FRAME_H = 50;
heartLossDelay = 0;
var heartHeld = 5;
var playerWidth = 30;
var playerHeight = 30;
var playerLeftSide = 75 - playerWidth/2;
var playerTopSide = 75 - playerWidth/2;

function warriorClass() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;
 this.animFrame =0;
 this.animDelay = 3;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;

  this.facingLeft = false;

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
    this.itemsHeld = 0;
    //if(this.homeX == undefined) {
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
    //} // end of if position not saved yet
    
    this.x = this.homeX;
    this.y = this.homeY;
    heartLossDelay = 2 * FRAMES_BETWEEN_HEART_LOSS;
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
      case TILE_MAGIC_DOOR:
        roomIndex = 1;
       loadLevel(roomList[roomIndex]);
          break;
      case TILE_KEY:
        this.keysHeld++; // gain key
        document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;
        roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
        break;
      case TILE_POTION:
        if(this.itemsHeld <= 3) {
          this.itemsHeld++; // one more item
          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
        }
      case TILE_ROCK:
        if(this.itemsHeld <= 3) {
          this.itemsHeld++; // one more item
          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
        }
      case TILE_DIAMOND:
        if(this.itemsHeld <= 3) {
          this.itemsHeld++; // one more item
          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove door
        }
      case TILE_STONED_ANGEL:
        if(this.itemsHeld >= 3) {
          this.itemsHeld = 0; // one more item
          roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove stoned angel
          roomGrid[walkIntoTileIndex] = TILE_LIVING_ANGEL;
        }  
          break;       
      case TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }

  this.move = function() {
    if (this.animDelay-- < 0) {
      this.animDelay = 3;
      this.animFrame++;
      if (this.animFrame >= 4) {
        this.animFrame = 0;
      } 
    }
    // to allow "wall sliding"
    // (diagonal movement not getting stuck)
    // we check horiz and vert movement individually
    
    //raycastP2X = this.x;
    //raycastP2Y = this.y;

    playerLeftSide = this.x - playerWidth/2;
    playerTopSide = this.y - playerWidth/2;
    if (heartLossDelay > 0) {
      heartLossDelay--;
    }
    this.facingLeft = false;
    if (this.keyHeld_East) this.testMove(this.x+PLAYER_MOVE_SPEED,this.y);
    if (this.keyHeld_West) {
      this.testMove(this.x-PLAYER_MOVE_SPEED,this.y);
      this.facingLeft = true;
    }
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

  this.collisionCheck = function(against) {
    if( against.x > playerLeftSide &&
      against.x < playerLeftSide + playerWidth &&
      against.y > playerTopSide &&
      against.y < playerTopSide + playerHeight){
      against.playerCollide();
    }
  }
  
  this.playerHit = function() {
    //if(!editorMode){
        if(heartLossDelay > 0){
            return;
        } else {
            heartLossDelay = FRAMES_BETWEEN_HEART_LOSS;
        }

        if (heartHeld >= 0) {
            //hitSound.play();
            heartHeld--;
        }
        if (heartHeld == 1){
            //alarmSound.play();
        }

    if (heartHeld < 0){
      //deathSound.play();
      //gameState = STATE_GAME_OVER;
      gameIsOver = true;
    }
  //}
}
  this.draw = function() {
    //drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );

    if (this.facingLeft) {
      canvasContext.save();
      canvasContext.scale(-1, 1);
      canvasContext.drawImage(this.myBitmap,
        PLAYER_SPRITE_FRAME_W*this.animFrame,PLAYER_SPRITE_FRAME_H*1, // corner of sprite. multiple sprite frames of W and H will be different frames.
        PLAYER_SPRITE_FRAME_W, PLAYER_SPRITE_FRAME_H,
        -(this.x - PLAYER_SPRITE_FRAME_W/2),  this.y - PLAYER_SPRITE_FRAME_H/2, // corner of sprite. multiple sprite frames of W and H will be different frames.
        -PLAYER_SPRITE_FRAME_W, PLAYER_SPRITE_FRAME_H);       
      canvasContext.restore();
    } else {
      canvasContext.drawImage(this.myBitmap, 
        PLAYER_SPRITE_FRAME_W*this.animFrame,PLAYER_SPRITE_FRAME_H*1, // corner of sprite. multiple sprite frames of W and H will be different frames.
        PLAYER_SPRITE_FRAME_W, PLAYER_SPRITE_FRAME_H,
        (this.x - PLAYER_SPRITE_FRAME_W/2),  this.y - PLAYER_SPRITE_FRAME_H/2,
        PLAYER_SPRITE_FRAME_W, PLAYER_SPRITE_FRAME_H);  
    }
  }

} // end of class