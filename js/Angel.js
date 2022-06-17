// tuning constants
const ANGEL_MOVE_SPEED = 3.0;
const ANGEL_WONDER_SPEED = 1.05;

function angelClass() {
  // variables to keep track of position
  this.x = 150;
  this.y = 150;

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
        if( roomGrid[i] == TILE_STONED_ANGEL) {
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
  
  this.move = function() {
    //raycastP1X = this.x;
    //raycastP1Y = this.y;
    var lineBlocked = isWallBetweenPoints(this.x, this.y, p1.x, p1.y);
    if (lineBlocked) {
      if (Math.random() < 0.02) { //percentage of frame angle changes movement
        var randDir = Math.random() * 2.0 * Math.PI; 
        this.xv = Math.cos(randDir) * ANGEL_WONDER_SPEED;
        this.yv = Math.sin(randDir)* ANGEL_WONDER_SPEED;
      }
    } else {
      var distance = dist(this.x - p1.x, this.y - p1.y) ;
      if (distance < 3*TILE_W && distance > TILE_W) {
        var toPlayer = angTo(p1.x - this.x, p1.y - this.y);
        this.xv = Math.cos(toPlayer) * ANGEL_MOVE_SPEED;
        this.yv = Math.sin(toPlayer)* ANGEL_MOVE_SPEED;
      } else {
        this.xv = 0;
        this.yv = 0;
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
    var footOffset = 22;//feet at the same postion as the player and the enemy is. 
    drawBitmapCenteredAtLocationWithRotation( angelPic, this.x, this.y - footOffset, 0.0 );
  }

} // end of class