// tuning constants
const ENEMY_MOVE_SPEED = 3.0;
function enemyClass() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;
  this.lastSeenPlayerX = 0;
  this.lastSeenPlayerY = 0;
  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false;
  this.keyHeld_South = false;
  this.keyHeld_West = false;

  // key controls used for this
  this.setupControls = function(northKey,eastKey,southKey,westKey) {
    this.controlKeyForNorth = northKey;
    this.controlKeyForEast = eastKey;
    this.controlKeyForSouth = southKey;
    this.controlKeyForWest = westKey;
  }

  
  
  this.reset = function() {
    if(this.homeX == undefined) {
      for(var i=0; i<roomGrid.length; i++) {
        if( roomGrid[i] == TILE_ENEMY) {
          var tileRow = Math.floor(i/ROOM_COLS);
          var tileCol = i%ROOM_COLS;
          this.homeX = tileCol * TILE_W + 0.5*TILE_W;
          this.homeY = tileRow * TILE_H + 0.5*TILE_H;
          this.x = this.homeX;
          this.y = this.homeY;
          roomGrid[i] = TILE_GROUND;
          return true; // found it, so no need to keep searching 
        } // end of if
      } // end of for
    } // end of if position not saved yet
    
    this.x = this.homeX;
    this.y = this.homeY;
    return false;
  } // end of reset
  
  this.attack = function () {
    for (var i=enemyList.length-1;i>=0; i--) { // backward since we splice from it
      var disX = Math.abs(p1.x - this.x);
      var disY = Math.abs(p1.y - this.y);
      if (disX + disY < 50) {
        p1.playerHit();
      }
    }
  }

  this.move = function() {
    if (dist(this.x - p1.x, this.y - p1.y) < 3*TILE_W) {
      var lineBlocked = isWallBetweenPoints(this.x, this.y, p1.x, p1.y);
      if(lineBlocked) {
        if (dist(this.x - this.lastSeenPlayerX, this.y - this.lastSeenPlayerY) > 10) {
          var toLast = angTo(this.lastSeenPlayerX - this.x, this.lastSeenPlayerY - this.y);
          this.xv = Math.cos(toLast);
          this.yv = Math.sin(toLast);
        } else {
          this.xv = 0;
          this.yv = 0;
        }
  
      } else { 
        this.lastSeenPlayerX = p1.x;
        this.lastSeenPlayerY = p1.y;
        var toPlayer = angTo(p1.x - this.x, p1.y - this.y);
        this.xv = Math.cos(toPlayer);
        this.yv = Math.sin(toPlayer);
      }
    }
    var nextX = this.x + this.xv;
    var nextY =  this.y + this.yv;
    
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL;
    
    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    }
    
    switch( walkIntoTileType ) {
      case TILE_KEY:
      case TILE_GROUND:
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_DOOR:
      case TILE_WALL:
      default:
        // any other tile type number was found... do nothing, for now
        break;
    }
  }
  
  this.draw = function() {
    drawBitmapCenteredAtLocationWithRotation( enemyPic, this.x, this.y, 0.0 );
  }

} // end of class