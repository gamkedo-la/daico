function MainMenu()
{
  this.DrawBackgroundImage = function()
  {
    canvasContext.drawImage(mainMenuBackgroundImage, 0,0, canvas.width,canvas.height);
  }

  this.titleText = "Daico";
  this.titleTextWidth = canvasContext.measureText(this.titleText);
  this.DrawTitle = function()
  {
    canvasContext.fillStyle = 'white';
    canvasContext.font = '30px Helvetica';
    canvasContext.fillText(this.titleText, canvas.width/2 - this.titleTextWidth.width,canvas.height * 0.2);
  }

  this.instructionText = "Press Enter to Play";
  this.instructionTextWidth = canvasContext.measureText(this.instructionText);
  this.instructionTextCenteringOffset = 10;
  this.DrawStartInstruction = function()
  {
    canvasContext.fillStyle = 'white';
    canvasContext.font = '30px Helvetica';
    canvasContext.fillText(this.instructionText, canvas.width/2 - this.instructionTextWidth.width - this.instructionTextCenteringOffset,canvas.height/2);
  }

  this.Draw = function()
  {
    this.DrawBackgroundImage();
    this.DrawTitle();
    this.DrawStartInstruction();
  }
}
