LittleEnemyClass.prototype = new enemyClass();
// tuning constants
const LITTLE_ENEMY_MOVE_SPEED = 3.0;
const LITTLE_ENEMY_ATTACK_SPREAD = 30;

function LittleEnemyClass() {
  this.reset = function() {
    return this.resetOnTile(TILE_LITTLE_ENEMY);
  } // end of reset
  
  this.AISeeingPlayer = function() {
    var toPlayer = angTo(p1.x - this.x, p1.y - this.y);
    this.xv = Math.cos(toPlayer);
    this.yv = Math.sin(toPlayer);
    var attackChance = Math.random();
    if (attackChance < ATTACK_ODDS) {
        var newSlash = new clawClass();
        newSlash.x = this.x + this.xv * ATTACK_RANGE;
        newSlash.y = this.y + this.yv * ATTACK_RANGE;
        newSlash.ang = toPlayer;
        enemyAttackList.push(newSlash);
    }
  }
  
  this.draw = function() {
    this.drawWithSprite(littleEnemyPic);
  }

} // end of class