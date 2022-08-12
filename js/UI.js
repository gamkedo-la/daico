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
    showItemNum;
    var itemsList = [showRedGemNum, showBlueGemNum, showDiamondNum,
    showDiamondNum];
    
    for (let item = 0; item < itemsList; item++) {
        const itemsToDraw = Math.max(showItemNum, 99)
        for (let i = 0; i < itemsToDraw; i++) {
            if (i < Math.floor(showItemNum)) {
                canvasContext.drawImage(
                    TILE_DIAMOND,
                    pos + i * 26, 0,
                    heartEmpty.width, heartEmpty.height
                );
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

