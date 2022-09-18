// tuning constants
const PLAYER_MOVE_SPEED = 3.0;
const PLAYER_DODGE_DIST = 150.0;
const PLAYER_DODGE_AFTERIMAGE_COUNT = 100;
const PLAYER_DODGE_AFTERIMAGE_EXTENSION_LENGTH = 200;
const PLAYER_DODGE_AFTERIMAGE_FADE_OUT_FRAMES = 12; // how long trails persist after a dodge
const PLAYER_DODGE_MAX_ALPHA = 0.5; // start less than opaque
const PLAYER_DODGE_STEPSIZE = PLAYER_DODGE_AFTERIMAGE_EXTENSION_LENGTH / PLAYER_DODGE_AFTERIMAGE_COUNT;
const FRAMES_BETWEEN_HEART_LOSS = 30;
const PLAYER_SPRITE_FRAME_W = 50;
const PLAYER_SPRITE_FRAME_H = 50;
const FRAMES_PER_FOOTPRINT = 8;
const FRAMES_FOR_DODGE = 10;

var keysHeld = 0;
var itemsHeld = 0;
var diamondsHeld = 0;
var greenGemsHeld = 0;
var redGemsHeld = 0;
var blueGemsHeld = 0;
var potionsHeld = 0;
var smallPotionsHeld = 0;
var vialsHeld = 0;
var rocksHeld = 0;

var heartLossDelay = 0;
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
  this.afterimageFramesRemaining = 0;
  this.dodge_eachX = 0;
  this.dodge_eachY = 0;
  
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
    heartLossDelay = 2 * FRAMES_BETWEEN_HEART_LOSS;
    this.x = this.homeX;
    this.y = this.homeY;
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
      //console.log("door dash detected");
      walkIntoTileType = TILE_DOOR;
      walkIntoTileIndex = lineBlockedAt.idxBlockedAt;
      nextX = lineBlockedAt.x;
      nextY = lineBlockedAt.y;
    } else if(intoItem) {
      //console.log("item dash detected");
      walkIntoTileType = bumpedType;
      walkIntoTileIndex = lineBlockedAt.idxBlockedAt;
      nextX = lineBlockedAt.x;
      nextY = lineBlockedAt.y;
      this.x = nextX;
      this.y = nextY;
    }
    switch( walkIntoTileType ) {
      case TILE_GROUND:
        case TILE_GROUND:
          case TILE_GROUND_2: 
          case TILE_GROUND_3:
          case TILE_GROUND_4:
          case TILE_GROUND_5:
          case TILE_GROUND_6:
          case TILE_LAVA_FLOOR:  
          case TILE_SURFACE_FLOOR: 
          case TILE_SURFACE_FLOOR2:        
        this.x = nextX;
        this.y = nextY;
        if (this.footprintDelay>0) { this.footprintDelay--; } else { footprint_fx(this.x,this.y); this.footprintDelay = FRAMES_PER_FOOTPRINT; }
        break;
      case TILE_DOOR:
        doorSound.play();
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
        doorSound.play();
        roomIndex = 0;
       loadLevel(roomList[roomIndex]);
       gameplayMusic.startOrStopMusic();
      gameplayMusic = BackgroundMusicClass("audio/DAICO_MUSIC");
       this.x = TILE_W * 8 +25;
       this.y = TILE_H * 1 + 25;
       moveAngelToPlayer();
          break;
      case TILE_MAGIC_DOOR2:
        doorSound.play();
        roomIndex = 1;
       loadLevel(roomList[roomIndex]);
       gameplayMusic.startOrStopMusic();
       gameplayMusic = BackgroundMusicClass("audio/boss-fight-v2");
       this.x = TILE_W * 4 + 25;
       this.y = TILE_H * 24 + 25;
       moveAngelToPlayer();
          break;
      case TILE_MAGIC_DOOR3:
        if(diamondsHeld >= 1 && !angel.isStone) {
          doorSound.play();
          roomIndex = 2;
         loadLevel(roomList[roomIndex]);
         gameplayMusic.startOrStopMusic();
         gameplayMusic = BackgroundMusicClass("audio/DAICO_MUSIC");
         this.x = TILE_W * 8 + 25;
         this.y = TILE_H * 20 + 25;
        } 
       
          break;
      case TILE_GATE:
          gameWinScreen.draw();
        goal_fx(this.x,this.y);
        break;  
      case TILE_KEY:
        pickItemSound.play();
        this.keysHeld++; // gain key
        document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;
        removeTileAndUpdateMinimap(walkIntoTileIndex);
        key_fx(this.x,this.y);
        break;
        case TILE_POTION:
          pickItemSound.play();
          if(heartHeld < 4) {
           heartHeld++;
          } else { potionsHeld++;}
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          potion_fx(this.x,this.y);
          break;
        case TILE_SMALL_POTION:
          pickItemSound.play();
          if(heartHeld < 4) {
            heartHeld += 0.5;
          } else { smallPotionsHeld++;}
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          potion_fx(this.x,this.y);
          break;
      case TILE_ROCK:
        pickItemSound.play();
        if(rocksHeld <= 99) {
          rocksHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          rock_fx(this.x,this.y);
        }
        break;
      case TILE_DIAMOND:
        pickItemSound.play();
        if(diamondsHeld <= 3) {
          diamondsHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;

      case TILE_BLUE_GEM:
        pickItemSound.play();
        blueGemsHeld++;
        if(blueGemsHeld <= 3) {
          blueGemsHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;
      case TILE_RED_GEM:
        pickItemSound.play();
        redGemsHeld++;
        if(redGemsHeld <= 3) {
          redGemsHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;
      case TILE_GREEN_GEM:
        pickItemSound.play();
        greenGemsHeld++;
        if(greenGemsHeld <= 3) {
          greenGemsHeld++; // one more item
          removeTileAndUpdateMinimap(walkIntoTileIndex);
          diamond_fx(this.x,this.y);
        }
        break;
      case TILE_VIAL:
        pickItemSound.play();
        vialsHeld++
         removeTileAndUpdateMinimap(walkIntoTileIndex);
         potion_fx(this.x,this.y);
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
    if(greenGemsHeld>= 1 && blueGemsHeld>=1 && redGemsHeld>=1 ) {
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
        this.afterimageFramesRemaining = PLAYER_DODGE_AFTERIMAGE_FADE_OUT_FRAMES;
        this.dodge_eachX = -PLAYER_DODGE_STEPSIZE; 
        this.dodge_eachY = 0
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
        this.afterimageFramesRemaining = PLAYER_DODGE_AFTERIMAGE_FADE_OUT_FRAMES;
        this.dodge_eachX = PLAYER_DODGE_STEPSIZE; 
        this.dodge_eachY = 0
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
        this.afterimageFramesRemaining = PLAYER_DODGE_AFTERIMAGE_FADE_OUT_FRAMES;
        this.dodge_eachX = 0; 
        this.dodge_eachY = PLAYER_DODGE_STEPSIZE;
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
        this.afterimageFramesRemaining = PLAYER_DODGE_AFTERIMAGE_FADE_OUT_FRAMES;
        this.dodge_eachX = 0; 
        this.dodge_eachY = -PLAYER_DODGE_STEPSIZE;
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
    enemyHitSound.play();
    for (var i=enemyList.length-1;i>=0; i--) { // backward since we splice from it
      var disX = Math.abs(enemyList[i].x - this.x);
      var disY = Math.abs(enemyList[i].y - this.y);
      if (disX + disY < 50 && enemyList[i].isGhost == false) {
        enemyDeadSound.play();
        enemy_hit_fx(enemyList[i].x,enemyList[i].y);
        if (enemyList[i].isBoss) {
          for (var ii=characterDrawOrder.length;ii>=0; ii--) {
            if (characterDrawOrder[ii] == enemyList[i]) {
              characterDrawOrder.splice(ii,1);
            }
          }
          enemyList.splice(i,1);
          GameWinScreen.draw();
        } else {
          enemyList[i].turnGhost();
        }
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
            hurtSound.play();
            damage ? heartHeld -= damage : heartHeld--;
        }
        if (heartHeld == 1){
            alarmSound.play();
        }

    if (heartHeld < 0){
      gameOverSound.play();
      gameIsOver = true;
    }
  //}
}
  this.draw = function() {
    //drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0.0 );
    if (heartLossDelay > 0 && heartLossDelay % 2 == 0) {
        return;
    }

    // fade out afterimages for a while after we are done dodging
    if (this.afterimageFramesRemaining > 0) {
        let alphaMax = PLAYER_DODGE_MAX_ALPHA * this.afterimageFramesRemaining/PLAYER_DODGE_AFTERIMAGE_FADE_OUT_FRAMES;
        for (let i = 1; i <= PLAYER_DODGE_AFTERIMAGE_COUNT; i++) {
            let alpha = alphaMax * (1-(i/PLAYER_DODGE_AFTERIMAGE_COUNT)); 
            this.drawWarrior(this.x+this.dodge_eachX*i, this.y+this.dodge_eachY*i, alpha);
        }
        this.afterimageFramesRemaining--;
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
