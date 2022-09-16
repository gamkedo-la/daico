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
    canvasContext.fillText("Press C to view credits in The Main Menu", canvas.width/2,canvas.height-80);
    canvasContext.textAlign="left";
    colorText("C to use unused potion",canvas.width/2-180,canvas.height-110 , 20, "orange");
    colorText("Space to attack",canvas.width/2-180,canvas.height-140 , 20, "orange");
    colorText("WASD or directional keys to move",canvas.width/2-180,canvas.height-200 , 20, "yelow");
    colorText("Press former keys twice to dodge",canvas.width/2-180,canvas.height-170 , 20, "orange");
  }

  this.Draw = function()
  {
    this.DrawBackgroundImage();
    if(this.showingCredits) {
      canvasContext.fillStyle = 'black';
      canvasContext.globalAlpha = 0.7;
      canvasContext.fillRect(0,0,canvas.width,canvas.height);
      canvasContext.globalAlpha = 1.0;
      canvasContext.fillStyle = 'white';
      canvasContext.font = '17px Helvetica';
      for(var i=0;i<creditsList.length;i++) {
        canvasContext.fillText(creditsList[i], 80,80+20*i);
      }
    } else {
      //this.DrawTitle(); // the logo is now part of MainmenuBackgroundImage_with_logo

      if (particles) {
        particles.add(240+Math.random()*310,330,sparklePic,2000,Math.random()*6,null,Math.random()*2-1,Math.random()*2-1,1);
        particles.update();
        particles.draw();
    }

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
"Chris DeLeon: Dashing bug fix",
" ",
"Press any key to return..."
];

function lineWrapCredits() { // note: gets calling immediately after definition!
  const newCut = [];
  var maxLineChar = 82;
  var findEnd;

  for(let i = 0; i < creditsList.length; i++) {
    const currentLine = creditsList[i];
    for(let j = 0; j < currentLine.length; j++) {
      /*const aChar = currentLine[j];
      if(aChar === ":") {
        if(i !== 0) {
          newCut.push("\n");
        }
        newCut.push(currentLine.substring(0, j + 1));
        newCut.push(currentLine.substring(j + 2, currentLine.length));
        break;
      } else*/ if(j === currentLine.length - 1) {
        if((i === 0) || (i >= creditsList.length - 2)) {
          newCut.push(currentLine);
        } else {
          newCut.push(currentLine.substring(0, currentLine.length));
        }
      }
    }
  }

  const newerCut = [];
  for(var i=0;i<newCut.length;i++) {
    while(newCut[i].length > 0) {
      findEnd = maxLineChar;
      if(newCut[i].length > maxLineChar) {
        for(var ii=findEnd;ii>0;ii--) {
          if(newCut[i].charAt(ii) == " ") {
            findEnd=ii;
            break;
          }
        }
      }
      newerCut.push(newCut[i].substring(0, findEnd));
      newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
    }
  }

  creditsList = newerCut;
}
lineWrapCredits(); // note: calling immediately as part of init, outside the function