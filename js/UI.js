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
    var itemsList = [potion, vial, key, diamond, redGem, blueGem, greenGem, rock];
    var itemsListNum = [p1.potionsHeld, p1.vialsHeld, p1.keysHeld, p1.diamondsHeld, p1.redGemsHeld, p1.blueGemsHeld, p1.greenGemsHeld, p1.rocksHeld];
    var inventoryWidth = 180;
    var inventoryCols = Math.floor(inventoryWidth/tilePics[0].width); 
    var inventoryRows = Math.ceil(itemsList.length/inventoryCols);

    var tileSkipX = potion.width+10;
    var tileSkipY = potion.height+10;
    var tileX = 0;
    var tileY = 0;
    var inventoryHeight =  inventoryRows * tileSkipY;
    selectMargin = 1;
    var tileCornerStartX = canvas.width/2 - inventoryWidth/2;
    var tileCornerStartY = canvas.height/2 - inventoryHeight/2;
    colorRect( tileCornerStartX-10, tileCornerStartY, inventoryWidth+10,inventoryHeight, 'grey');
    mouseOverTileChoice = -1;
    for (var i=0; i<itemsList.length;i++) {
        var column = i%inventoryCols;
        var row = Math.floor(i/inventoryCols);
        tileX = tileCornerStartX + column * tileSkipX;
        tileY = tileCornerStartY + row * tileSkipY;
        //colorText(i,tileX, tileY , 18, "red");
        canvasContext.drawImage(itemsList[i], tileX, tileY);
        colorText(itemsListNum[i], tileX, tileY + itemsList[i].width, 18, "white");
        
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

