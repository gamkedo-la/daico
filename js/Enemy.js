// tuning constants
const ENEMY_MOVE_SPEED = 3.0;
const REVIVE_ENEMY_TIME_FRAME = 30;
const ENEMY_GHOST_MULTIPLIER = 0.4;
function enemyClass() {
  // variables to keep track of position
  this.x = 75;
  this.y = 75;
  this.lastSeenPlayerX = 0;
  this.lastSeenPlayerY = 0;
  this.isGhost = false;
  this.damage = 1;
  this.reviveEnemyTimer = REVIVE_ENEMY_TIME_FRAME;

  this.resetOnTile = function(whichTile) {
    if(this.homeX == undefined) {
      for(var i=0; i<roomGrid.length; i++) {
        if( roomGrid[i] == whichTile) {
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
  
  this.reset = function() {
    return this.resetOnTile(TILE_ENEMY);
  }

  this.AISeeingPlayer = function() {
    var toPlayer = angTo(p1.x - this.x, p1.y - this.y);
    this.xv = Math.cos(toPlayer);
    this.yv = Math.sin(toPlayer);
    var attackChance = Math.random();
    if (attackChance < ATTACK_ODDS) {
      var newSlash = new clawClass();
      newSlash.x = this.x + this.xv * ATTACK_START_DISTANCE;
      newSlash.y = this.y + this.yv * ATTACK_START_DISTANCE;
      newSlash.ang = toPlayer;
      enemyAttackList.push(newSlash);
    }
  }

  this.move = function() {
    if (this.isGhost) {
      var toHome = angTo(this.homeX - this.x, this.homeY - this.y);
      this.xv = Math.cos(toHome) * ENEMY_GHOST_MULTIPLIER;
      this.yv = Math.sin(toHome) * ENEMY_GHOST_MULTIPLIER;
      this.x += this.xv;
      this.y += this.yv;
      if (dist(this.x - this.homeX, this.y - this.homeY) < 0.2*TILE_W) {
        this.isGhost = false;
      }
      return;
    }
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
        this.AISeeingPlayer();
      }
    }
    var nextX = this.x + this.xv;
    var nextY =  this.y + this.yv;
    
    var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var walkIntoTileType = TILE_WALL;
    
    if( walkIntoTileIndex != undefined) {
      walkIntoTileType = roomGrid[walkIntoTileIndex];
    }
    var testSlide = getTileIndexAtPixelCoord(nextX,this.y);
    if(tileTypeBlocksEnemy(walkIntoTileType)) { // bumping wall? 
      if(tileTypeBlocksEnemy(roomGrid[testSlide]) == false) { // slide horizental?
        nextY = this.y;
        walkIntoTileType = roomGrid[testSlide];
      } else {
        testSlide = getTileIndexAtPixelCoord(this.x, nextY); // slide vertical
        if(tileTypeBlocksEnemy(roomGrid[testSlide]) == false) {
          nextX = this.x; 
          walkIntoTileType = roomGrid[testSlide];
        }
      }
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
  
  this.playerCollide = function() {
    if (this.isGhost) {
      return
    }
    p1.playerHit(this.damage);
    var diffX = p1.x - this.x;
    var diffY = p1.y - this.y;
    var pushToX = p1.x + diffX * 0.5;
    var pushToY = p1.y + diffY * 0.5;

    var lineBlockedAt = whereIsWallBetweenPoints(p1.x, p1.y, pushToX, pushToY);
    var walkIntoTileType = lineBlockedAt.tileKind; // assume wall when tile is missing
    if(tileTypeBlocksPlayer(walkIntoTileType)) {
      pushToX = lineBlockedAt.x;
      pushToY = lineBlockedAt.y;
    }
    p1.x = pushToX;
    p1.y = pushToY;
  }

  this.drawWithSprite = function(whichSprite) {
    var feetOffsetFromCenter = VERTICAL_OFFSET_OF_FEET - whichSprite.height/2;
    var alpha = 1.0;
    if(this.isGhost) {
      alpha = 0.2;
    }
    drawBitmapCenteredAtLocationWithRotation(whichSprite, this.x, this.y - feetOffsetFromCenter, 0.0, alpha );
  }

  this.draw = function() {
    this.drawWithSprite(enemyPic);
  }
} // end of class