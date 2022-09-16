function Splash()
{
  this.DrawBackgroundImage = function()
  {
    canvasContext.drawImage(mainMenuBackgroundImage, 0,0, canvas.width,canvas.height);
  }

  this.titleText = "push any key";
  this.titleTextWidth = canvasContext.measureText(this.titleText);
  this.DrawTitle = function()
  {
    canvasContext.fillStyle = 'white';
    canvasContext.font = '50px DaicoFont';  // '30px Helvetica';
    canvasContext.fillText(this.titleText, canvas.width/2 - 2*this.titleTextWidth.width,canvas.height * 0.2);
  }



  this.Draw = function()
  {
    this.DrawBackgroundImage();
    this.DrawTitle();

  }
}