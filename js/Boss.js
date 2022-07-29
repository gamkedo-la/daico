bossClass.prototype = new enemyClass();
// tuning constants
const BOSS_MOVE_SPEED = 3.0;
const BOSS_ATTACK_SPREAD = 30;

function bossClass() {
  this.reset = function() {
    return this.resetOnTile(TILE_BOSS);
  } // end of reset
  
  this.AISeeingPlayer = function() {
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
  
  this.draw = function() {
    this.drawWithSprite(bossPic);
  }

} // end of class