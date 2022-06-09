function MainMenu()
{
  this.DrawBackfill = function()
  {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0, canvas.width,canvas.height);
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
  this.DrawStartInstruction = function()
  {
    canvasContext.fillStyle = 'white';
    canvasContext.font = '30px Helvetica';
    canvasContext.fillText(this.instructionText, canvas.width/2 - this.instructionTextWidth.width,canvas.height/2);
  }

  this.Draw = function()
  {
    this.DrawBackfill();
    this.DrawTitle();
    this.DrawStartInstruction();
  }
}
