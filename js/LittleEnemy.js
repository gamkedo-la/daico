LittleEnemyClass.prototype = new enemyClass();
// tuning constants
const LITTLE_ENEMY_MOVE_SPEED = 3.0;
const LITTLE_ENEMY_ATTACK_SPREAD = 30;

function LittleEnemyClass() {
  this.reset = function() {
    return this.resetOnTile(TILE_LITTLE_ENEMY);
  } // end of reset
  
  this.AISeeingAngel = function() {
    var toAngel = angTo(angel.x - this.x, angel.y - this.y);
    this.xv = Math.cos(toAngel);
    this.yv = Math.sin(toAngel);
   
  }

  this.AISeeingPlayer  = function() {
  }
  this.superMove = this.move;
  this.move = function() {
      this.superMove();
      if (dist(this.x - angel.x, this.y - angel.y) < 3*TILE_W) {
        var lineBlocked = isWallBetweenPoints(this.x, this.y, angel.x, angel.y);
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
          this.lastSeenPlayerX = angel.x;
          this.lastSeenPlayerY = angel.y;
          this.AISeeingAngel();
        }
      }
  }
  
  this.draw = function() {
    this.drawWithSprite(littleEnemyPic);
  }

} // end of class