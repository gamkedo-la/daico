const ATTACK_ODDS = 0.04; //lower is less frequent (percentage out of 1)
const ATTACK_RANGE = 80;
const ATTACK_DURATION = 10;
function clawClass(){
    this.x = 10;
    this.y = 10;
    this.ang = 0;
    this.framesLeft = ATTACK_DURATION;

    this.move = function () {
        this.framesLeft--;
        
    }

    this.draw = function () {
        drawBitmapCenteredAtLocationWithRotation( claw, this.x, this.y, this.ang );
    }

    this.readyToRemove = function () {
        return this.framesLeft <= 0;
    }

    this.playerCollide = function() {
        p1.playerHit();
      }
    
}