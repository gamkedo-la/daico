function MainMenu()
{
  this.showingCredits = false;

  this.DrawBackgroundImage = function()
  {
    //canvasContext.drawImage(mainMenuBackgroundImage, 0,0, canvas.width,canvas.height);
    canvasContext.drawImage(mainMenuBackgroundImage_with_logo, 0,0, canvas.width,canvas.height);    
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
  this.instructionTextCenteringOffset = 20;
  this.instruction_vertical_offset = 40;
  this.DrawStartInstruction = function()
  {
    canvasContext.textAlign="center";
    canvasContext.fillStyle = 'white';
    canvasContext.font = '30px Helvetica';
    canvasContext.fillText(this.instructionText, canvas.width/2,canvas.height/2 + this.instruction_vertical_offset);

    canvasContext.font = '20px Helvetica';
    canvasContext.fillText("Press C to view credits", canvas.width/2,canvas.height-80);
    canvasContext.textAlign="left";
  }

  this.Draw = function()
  {
    this.DrawBackgroundImage();
    if(this.showingCredits) {
      canvasContext.fillStyle = 'white';
      canvasContext.font = '10px Helvetica';
      for(var i=0;i<creditsList.length;i++) {
        canvasContext.fillText(creditsList[i], 80,80+15*i);
      }
    } else {
      //this.DrawTitle(); // the logo is now part of MainmenuBackgroundImage_with_logo
      this.DrawStartInstruction();
    }
  }
}

var creditsList = [
"Vaan Hope Khani: Project lead, core gameplay, boss behavior, level design, attack functionality, angel and enemy AI, custom editor (internal use only), dash feature, enemy projectiles, boss, magic doors, minimap, bug fixes, enemy who re-freezes angel, arrow art, enemy respawn behavior, help page, sound integration",
"Luis Montaña: Angel sprites (stone and living), Item sprites (diamond, color gems, potion), assorted dungeon art (wall tile, door, additional floor tiles), animated shadow sprite",
"Rob Tunstall: Main music",
"Randy Tan Shaoxian: WASD control, temporary invulnerability after damage, game scaling, dashing effect (prototype), Linux support fix",
"Christer \"McFunkypants\" Kaitila: Logo, fading motion blur effect, particle effects, wall collision fix, attack animation",
"H Trayford: Floor variations, character facing based on direction, half heart UI support, wall sliding, wall corner and vertical variations",
"ClayTaeto: Player character with animation, hurt sound, boss fight song",
"Stebs: Main menu, main menu bat animations",
"Simon Donohoe: Mute toggle, extra door art, lava implementation",
"Ian Cherabier: Small potion with art, pause toggle",
"Gabriel Cornish: Lava floor tile, enemy hit sound",
"Winchy: Canvas centered on screen, tile rotation fix",
"Chris DeLeon: Dashing bug fix"
];