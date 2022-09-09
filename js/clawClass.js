const ATTACK_ODDS = 0.04; //lower is less frequent (percentage out of 1)
const ATTACK_START_DISTANCE = 20;
const ATTACK_DURATION = 30;
const ATTACK_SPEED = 4;
const ATTACK_BOSS_SPEED = 6;
const ATTACK_BOSS_DURATION = 40;
function clawClass(){
    this.x = 10;
    this.y = 10;
    this.ang = 0;
    this.framesLeft = ATTACK_DURATION;
    this.damage = 0.5;
    this.isBossAttack = false;
    this.clawSpeed = ATTACK_SPEED;
    this.makeBossAttack = function() {
        this.isBossAttack =true;
        this.framesLeft = ATTACK_BOSS_DURATION;
        this.clawSpeed = ATTACK_BOSS_SPEED;
    }
    this.move = function () {
        this.framesLeft--;
        this.x += Math.cos(this.ang)*this.clawSpeed;
        this.y += Math.sin(this.ang)*this.clawSpeed;
        
    }

    this.draw = function () {
        drawBitmapCenteredAtLocationWithRotation( claw, this.x, this.y, this.ang );
    }

    this.readyToRemove = function () {
        return this.framesLeft <= 0;
    }

    this.playerCollide = function() {
        p1.playerHit(this.damage);
      }
    
}