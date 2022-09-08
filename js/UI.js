var hasHalfHeart = false;
function drawHealthUI() {
    var pos = 0;
    var showHeartNum;
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
    var itemsList = [potion, smallPotion, vial, key, diamond, redGem, blueGem, greenGem, rock];
    var itemsListNum = [potionsHeld, smallPotionsHeld, vialsHeld, keysHeld, diamondsHeld, redGemsHeld, blueGemsHeld, greenGemsHeld, rocksHeld];
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
        colorText(i+1, tileX, tileY + itemsList[i].width, 18, "white");
        
    }
}

function drawHelp() {
    var pos = 0;
    var showRedGemNum, showBlueGemNum, showDiamondNum,
    showDiamondNum;
    var helpList = ["Press C to recover", "Push directional keys twice to dodge", "Space to attack",];
    var helpWidth = 180;
    var helpHeight = 80;
    var helpCols = Math.floor(helpWidth/helpList.length); 
    var helpRows = Math.ceil(helpList.length*helpHeight);

    var lineSkip = 25;
    lineX = tileCornerStartX + column * lineSkip;
    lineY = tileCornerStartY + row * lineSkip;
    var indent = 50;
    var helpHeight =  helpRows * lineSkip;
    selectMargin = 1;
    var tileCornerStartX = canvas.width/2 - helpWidth/2;
    var tileCornerStartY = canvas.height/2 - helpHeight/2;
    colorRect( tileCornerStartX-10, tileCornerStartY, helpWidth+10,helpHeight, 'grey');
    mouseOverTileChoice = -1;
    for (var i=0; i<helpList.length;i++) {
        var column = i%helpCols;
        var row = Math.floor(i/helpCols);
        colorText(helpList[i],lineX+ indent * (i==3 || i==5 ? 1 : 0), lineY+=lineSkip, 18, "white");
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
  

