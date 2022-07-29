bossClass.prototype = new enemyClass();
// tuning constants
const BOSS_MOVE_SPEED = 3.0;
const BOSS_ATTACK_SPREAD = 30;

function bossClass() {
  this.reset = function() {
    return this.resetOnTile(TILE_BOSS);
  } // end of reset
  
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
        var attackChance = Math.random();
        if (attackChance < ATTACK_ODDS) {
          var newSlash;
          var spreadCount = 5;
          var spreadAngle = BOSS_ATTACK_SPREAD*Math.PI/180;
          var anglePerShot = spreadAngle * 2 / spreadCount;
          for(var i=0; i<spreadCount ; i++) {
            newSlash = new clawClass();
            newSlash.x = this.x + this.xv;
            newSlash.y = this.y + this.yv;
            newSlash.ang = toPlayer-spreadAngle + i * anglePerShot;
            newSlash.makeBossAttack();
            enemyAttackList.push(newSlash);
          }
        }
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
    if(tileTypeBlocksBoss(walkIntoTileType)) { // bumping wall? 
      if(tileTypeBlocksBoss(roomGrid[testSlide]) == false) { // slide horizental?
        nextY = this.y;
        walkIntoTileType = roomGrid[testSlide];
      } else {
        testSlide = getTileIndexAtPixelCoord(this.x, nextY); // slide vertical
        if(tileTypeBlocksBoss(roomGrid[testSlide]) == false) {
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
    p1.playerHit(this.damage);
  }

  this.draw = function() {
    var feetOffsetFromCenter = VERTICAL_OFFSET_OF_FEET - bossPic.height/2;
    drawBitmapCenteredAtLocationWithRotation( bossPic, this.x, this.y - feetOffsetFromCenter, 0.0 );
  }

} // end of class