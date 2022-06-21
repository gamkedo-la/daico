function PauseScreen()
{
  // Background Parameters
  this.backgroundColor = "black";
  this.backGroundAlpha = 0.7;

  // Pause Text Parameters
  this.pauseText = "Paused";
  this.pauseTextX = canvas.width / 2 - 75;
  this.pauseTextY = 100;
  this.pauseTextFontSize = 50;
  this.pauseTextColor = "red";

  this.draw = function() {
    this.drawTransparentBackGround();
    this.writePauseText();
  }

  this.writePauseText = function() {
    colorText(this.pauseText, this.pauseTextX, this.pauseTextY, 
              this.pauseTextFontSize, this.pauseTextColor);
  }
  
  this.drawTransparentBackGround = function() {
    canvasContext.globalAlpha = this.backGroundAlpha;
    colorRect(0, 0, canvas.width, canvas.height, this.backgroundColor);
    canvasContext.globalAlpha = 1.0;
  }
}