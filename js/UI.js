function drawHealthUI() {
    var pos = 0;
    var showHeartNum;
    var hasHalfHeart = false;
    if(heartHeld < 4) {
        showHeartNum = heartHeld;
    } else {
        showHeartNum = 4;
    }

    if(Math.floor(heartHeld) < heartHeld) {
        hasHalfHeart = true
    }

    const heartsToDraw = Math.max(showHeartNum, 4)
    for (let i = 0; i < heartsToDraw; i++) {
        if (i < Math.floor(showHeartNum)) {
            canvasContext.drawImage(
                heartFull,
                pos + i * 26, 0,
                heartEmpty.width, heartEmpty.height
            );
        } else {
            if(hasHalfHeart && i < showHeartNum) {
                canvasContext.drawImage(
                    heartHalfFull,
                    pos + i * 26, 0,
                    heartEmpty.width, heartEmpty.height
                );
            } else {
                canvasContext.drawImage(
                    heartEmpty,
                    pos + i * 26, 0,
                    heartEmpty.width, heartEmpty.height
                );    
            }
        }
    }
}

function drawItemsUI() {
    var pos = 0;
    var showRedGemNum, showBlueGemNum, showDiamondNum,
    showDiamondNum;
    var itemsList = [showRedGemNum, showBlueGemNum, showDiamondNum,
    showDiamondNum];
    canvasContext.drawImage(potion, 0,0, potion.width,potion.height);
    canvasContext.drawImage(vial, 0,0, vial.width,vial.height);
    canvasContext.drawImage(diamond, 0,0, diamond.width,diamond.height);
    canvasContext.drawImage(redGem, 0,0, redGem.width,redGem.height);
    canvasContext.drawImage(blueGem, 50,141, blueGem.width,blueGem.height);
    canvasContext.drawImage(greenGem, 50,141, greenGem.width,greenGem.height);
    canvasContext.drawImage(rock, 50,141, greenGem.width,greenGem.height);
    for (let item = 0; item < itemsList; item++) {
        for (let i = 0; i < itemsToDraw; i++) {
            if (i < Math.floor(showRedGemNum)) {
               
            } 
        }
    }
}
function GameOverScreen() {
    this.gameOverBoxWidth = 500;
    this.gameOverBoxHeight = 200;
    this.draw = function() {
        canvasContext.globalAlpha = 0.3;
        colorRect(  canvas.width/2 - this.gameOverBoxWidth/2, 
            canvas.height/2 - this.gameOverBoxHeight/2, 
            this.gameOverBoxWidth,
            this.gameOverBoxHeight, 
            'lavender');
        canvasContext.globalAlpha = 1.0;
        canvasContext.textAlign = "center";
        canvasContext.font = "30px Verdana";
        canvasContext.fillStyle = 'orange';
        colorText("LETS TRY AGAIN",canvas.width/2, canvas.height/2 , 18, "red");
        colorText("PRESS R TO RESPAWN",canvas.width/2, canvas.height/2 + 40, 34, "cyan");
         }
   
  }

