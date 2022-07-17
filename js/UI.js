function drawHealthUI() {
    var pos = 0;
    var showHeartNum;
    if(heartHeld < 4) {
        showHeartNum = heartHeld;
    } else {
        showHeartNum = 4;
    }

    const heartsToDraw = Math.max(showHeartNum, 4)
    for (let i = 0; i < heartsToDraw; i++) {
        if (i < showHeartNum) {
            canvasContext.drawImage(
                heartFull,
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

function GameOverScreen() {
    this.gameOverBoxWidth = 500;
    this.gameOverBoxHeight = 200;
    this.draw = function() {
        canvasContext.globalAlpha = 0.3;
        colorRect(  canvas.width/2 - gameOverBoxWidth/2, 
            canvas.height/2 - gameOverBoxHeight/2, 
            gameOverBoxWidth,
            gameOverBoxHeight, 
            'lavender');
        canvasContext.globalAlpha = 1.0;
        canvasContext.textAlign = "center";
        canvasContext.font = "30px Verdana";
        canvasContext.fillStyle = 'orange';
        colorText("LETS TRY AGAIN",canvas.width/2, canvas.height/2 , 18, "green");
        colorText("PRESS R TO RESPAWN",canvas.width/2, canvas.height/2 + 40, 34, "cyan");
    }
   
  }

