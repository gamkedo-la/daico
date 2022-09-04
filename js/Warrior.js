// tuning constants
const PLAYER_MOVE_SPEED = 3.0;
const PLAYER_DODGE_DIST = 150.0;
const PLAYER_DODGE_AFTERIMAGE_COUNT = 100;
const PLAYER_DODGE_AFTERIMAGE_EXTENSION_LENGTH = 200;
const FRAMES_BETWEEN_HEART_LOSS = 30;
const PLAYER_SPRITE_FRAME_W = 50;
const PLAYER_SPRITE_FRAME_H = 50;
const FRAMES_PER_FOOTPRINT = 8;
const FRAMES_FOR_DODGE = 10;
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
  this.previousX = this.x;
  this.previousY = this.y;
  this.moveDist = PLAYER_MOVE_SPEED;
 this.animFrame =0;
 this.animDelay = 3;

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;
  this.framesSinceKeyReleaseNorth = 0;
  this.framesSinceKeyReleaseEast = 0;
  this.framesSinceKeyReleaseWest = 0;
  this.framesSinceKeyReleaseSouth = 0;
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
    this.diamondsHeld = 0;
    this.greenGemsHeld = 0;
    this.redGemsHeld = 0;
    this.blueGemsHeld = 0;
    this.potionsHeld = 0;
    this.vialsHeld = 0;
    this.rocksHeld = 0;
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
    var lineBlockedAt = whereIsWallBetweenPoints(this.x, this.y, nextX, nextY);
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    var walkIntoTileType = lineBlockedAt.tileKind; // assume wall when tile is missing
    var intoDoor = (walkIntoTileType == TILE_DOOR);
    var intoItem = tileTypePickUp(walkIntoTileType);
    var doorIdx = walkIntoTileIndex;
    var bumpedType = walkIntoTileType;
    if(tileTypeBlocksPlayer(walkIntoTileType) || intoDoor) {
      nextX = lineBlockedAt.x;
      nextY = lineBlockedAt.y;
    }
    this.previousX = this.x;
    this.previousY = this.y;
    
    walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    walkIntoTileType = TILE_WALL; // assume wall when tile is missing
    if (walkIntoTileIndex != undefined) { walkIntoTileType = roomGrid[walkIntoTileIndex]; }
    if(intoDoor){
      console.log("door dash detected");
      walkIntoTileType = TILE_DOOR;
      walkIntoTileIndex = lineBlockedAt.idxBlockedAt;
      nextX = lineBlockedAt.x;
      nextY = lineBlockedAt.y;
    } else if(intoItem) {
      console.log("item dash detected");
      walkIntoTileType = bumpedType;
      walkIntoTileIndex = lineBlockedAt.idxBlockedAt;
      nextX = lineBlockedAt.x;
      nextY = lineBlockedAt.y;
      this.x = nextX;
      this.y = nextY;
    }
    switch( walkIntoTileType ) {
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        if (this.footprintDelay>0) { this.footprintDelay--; } else { footprint_fx(this.x,this.y); this.footprintDelay = FRAMES_PER_FOOTPRINT; }
        break;
      case TILE_GOAL:
        document.getElementById("debugText").innerHTML = this.myName + " won";
        this.reset();
        goal_fx(this.x,this.y);
        break;
      case TILE_DOOR:
        if(this.keysHeld > 0) {
          this.keysHeld--; // one less key
          document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          door_fx(this.x,this.y);
        }
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_MAGIC_DOOR:
        roomIndex = 1;
       loadLevel(roomList[roomIndex]);
          break;
      case TILE_MAGIC_DOOR2:
        roomIndex = 2;
       loadLevel(roomList[roomIndex]);
          break;
      case TILE_KEY:
        this.keysHeld++; // gain key
        document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;
        removeTileAndUpdateMinimap(walkIntoTileIndex);
        key_fx(this.x,this.y);
        break;
      case TILE_POTION:
        console.log(this.potionsHeld);
        if(heartHeld < 5) {
          console.log(heartHeld);
         heartHeld++;
        } else { this.potionsHeld++;}
        removeTileAndUpdateMinimap(walkIntoTileIndex);
        potion_fx(this.x,this.y);
        break;
      case TILE_ROCK:
        this.rocksHeld++;
        if(this.rocksHeld <= 99) {
          this.rocksHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          rock_fx(this.x,this.y);
        }
        break;
      case TILE_DIAMOND:
        this.diamondsHeld++;
        if(this.diamondsHeld <= 3) {
          this.diamondsHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;

      case TILE_BLUE_GEM:
        this.blueGemsHeld++;
        if(this.blueGemsHeld <= 3) {
          this.blueGemsHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;
      case TILE_RED_GEM:
        this.redGemsHeld++;
        if(this.redGemsHeld <= 3) {
          this.redGemsHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;
      case TILE_GREEN_GEM:
        this.greenGemsHeld++;
        if(this.greenGemsHeld <= 3) {
          this.greenGemsHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;
      case TILE_VIAL:
        this.vialsHeld++;
        if(this.vialsHeld <= 99) {
          this.vialsHeld++; // one more item
          //heartHalfFull++;
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;

      case TILE_STONED_ANGEL:
          break;       
      case TILE_WALL:
      default:
        bump_wall_fx(this.x,this.y);
        // any other tile type number was found... do nothing, for now
        break;
    }
  }
  this.angelBump = function() {
    if(this.greenGemsHeld>= 1 && this.blueGemsHeld>=1 && this.redGemsHeld>=1 ) {
      angel_fx(this.x,this.y);
      return true;
    } 
    return false;
  }
  this.move = function() {    
    //raycastP2X = this.x;
    //raycastP2Y = this.y;

    playerLeftSide = this.x - playerWidth/2;
    playerTopSide = this.y - playerWidth/2;
    if (heartLossDelay > 0) {
      heartLossDelay--;
    }

    // to allow "wall sliding"
    // (diagonal movement not getting stuck)
    // we check horiz and vert movement individually
    let isWalking = false;
    this.moveDist = PLAYER_MOVE_SPEED;
    if (this.keyHeld_East) {
      if(this.framesSinceKeyReleaseEast >=1 && this.framesSinceKeyReleaseEast < FRAMES_FOR_DODGE){
        this.moveDist = PLAYER_DODGE_DIST;
      }
      this.testMove(this.x+this.moveDist,this.y);
      this.facingLeft = false;
      isWalking = true;
      this.framesSinceKeyReleaseEast = 0;
    } else {
      this.framesSinceKeyReleaseEast++;
    }

    
    if (this.keyHeld_West) {
      if(this.framesSinceKeyReleaseWest >=1 && this.framesSinceKeyReleaseWest < FRAMES_FOR_DODGE){
        this.moveDist = PLAYER_DODGE_DIST;
      }
      this.testMove(this.x-this.moveDist,this.y);
      this.facingLeft = true;
      isWalking = true;
      this.framesSinceKeyReleaseWest = 0;
    }else {
      this.framesSinceKeyReleaseWest++;
    }
    
    if (this.keyHeld_North) {
      if(this.framesSinceKeyReleaseNorth >=1 && this.framesSinceKeyReleaseNorth < FRAMES_FOR_DODGE){
        this.moveDist = PLAYER_DODGE_DIST;
      }
      this.testMove(this.x,this.y-this.moveDist);
      isWalking = true;
      this.framesSinceKeyReleaseNorth = 0;
    }else {
      this.framesSinceKeyReleaseNorth++;
    }
    
    if (this.keyHeld_South) {
      if(this.framesSinceKeyReleaseSouth >=1 && this.framesSinceKeyReleaseSouth < FRAMES_FOR_DODGE){
        this.moveDist = PLAYER_DODGE_DIST;
      }
      this.testMove(this.x,this.y+this.moveDist);
      isWalking = true;
      this.framesSinceKeyReleaseSouth = 0;
    }else {
      this.framesSinceKeyReleaseSouth++;
    }

    if (isWalking && this.animDelay-- < 0) {
      this.animDelay = 3;
      this.animFrame++;
      if (this.animFrame >= 4) {
        this.animFrame = 0;
      }
    }
        
  }
  
  this.attack = function () {
    attack_fx(this.x,this.y,this.facingLeft);
    for (var i=enemyList.length-1;i>=0; i--) { // backward since we splice from it
      var disX = Math.abs(enemyList[i].x - this.x);
      var disY = Math.abs(enemyList[i].y - this.y);
      if (disX + disY < 50) {
        for (var ii=characterDrawOrder.length;ii>=0; ii--) {
          if (characterDrawOrder[ii] == enemyList[i]) {
            characterDrawOrder.splice(ii,1);
            enemy_hit_fx(enemyList[i].x,enemyList[i].y);
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
  
  this.playerHit = function(damage) {

    // removed particles because this function fires every frame in the main menu
    //damage_fx(this.x,this.y); 

    //if(!editorMode){
        if(heartLossDelay > 0){
            return;
        } else {
            heartLossDelay = FRAMES_BETWEEN_HEART_LOSS;
        }

        if (heartHeld >= 0) {
            //hitSound.play();
            damage ? heartHeld -= damage : heartHeld--;
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
    if (heartLossDelay > 0 && heartLossDelay % 2 == 0) {
        return;
    }

    if (this.moveDist >= PLAYER_DODGE_DIST) {
        const diffX = Math.abs(this.x - this.previousX);
        const diffY = Math.abs(this.y - this.previousY);

        let eachX = (diffX + diffX > 0 ? PLAYER_DODGE_AFTERIMAGE_EXTENSION_LENGTH : 0) / PLAYER_DODGE_AFTERIMAGE_COUNT;
        let eachY = (diffY + diffY > 0 ? PLAYER_DODGE_AFTERIMAGE_EXTENSION_LENGTH : 0) / PLAYER_DODGE_AFTERIMAGE_COUNT;
        
        if (this.keyHeld_West) { 
            eachX = Math.abs(eachX)
            eachY = 0;
        }
        else if (this.keyHeld_East) {
            eachX = -Math.abs(eachX);
            eachY = 0;
        }
        else if (this.keyHeld_North) {
            eachX = 0;
            eachY = Math.abs(eachY);
        }
        else if (this.keyHeld_South) {
            eachX = 0;
            eachY = -Math.abs(eachY);
        }

        for (let i = 1; i <= PLAYER_DODGE_AFTERIMAGE_COUNT; i++) {
            this.drawWarrior(this.x + eachX * i, this.y + eachY * i, 1 - (i / PLAYER_DODGE_AFTERIMAGE_COUNT));
        }
    }
    this.drawWarrior();
  }

  this.drawWarrior = (x = this.x, y = this.y, alpha = 1) => {
    const _drawImage = (_x = x, _y = y, _alpha = alpha, left = this.facingLeft ? -1 : 1) => {
      canvasContext.globalAlpha = _alpha;
      canvasContext.drawImage(this.myBitmap,
        PLAYER_SPRITE_FRAME_W*this.animFrame,PLAYER_SPRITE_FRAME_H*1, // corner of sprite. multiple sprite frames of W and H will be different frames.
        PLAYER_SPRITE_FRAME_W, PLAYER_SPRITE_FRAME_H,
        left * (_x - PLAYER_SPRITE_FRAME_W/2),  _y  - VERTICAL_OFFSET_OF_FEET, // corner of sprite. multiple sprite frames of W and H will be different frames.
        left * PLAYER_SPRITE_FRAME_W, PLAYER_SPRITE_FRAME_H);       
    }

    if (this.facingLeft) {
      canvasContext.save();
      canvasContext.scale(-1, 1);
      _drawImage();
      canvasContext.restore();
    } else {
      _drawImage();
    }
  }

} // end of class
