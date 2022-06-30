var mouseOverTileChoice = -1;
function editorDraw() {
    var editorRows = ROOM_ROWS;
    var editorCols = Math.ceil(tilePics.length/editorRows); 
    var tileX = canvas.width - editorCols * TILE_W;
    var tileY = 0;
    var selectMargin = 5;

    colorRect(tileX-selectMargin,0,TILE_W * editorCols + selectMargin,canvas.height, 'black');
    mouseOverTileChoice = -1;
    for (var i=0; i<=TILE_LAST;i++) {
        canvasContext.drawImage(tilePics[i], tileX, tileY); 
        if (i==editorTileIndex) {
            colorRect(tileX-selectMargin, tileY, selectMargin, TILE_H, "red");
        }
        if (mouseX >= tileX && mouseX < tileX + TILE_W && mouseY >= tileY && mouseY < tileY + TILE_H) {
            mouseOverTileChoice = i;
        } 
        tileY += TILE_H;
        if (tileY >= canvas.height) { // using pixels instead of editor rows
            tileY = 0;
            tileX += TILE_W;
        }
    }
} 

function editorClick(){
    if (mouseX > ROOM_COLS * TILE_W && mouseOverTileChoice != -1) {
        editorTileIndex = mouseOverTileChoice;
        return;
    }
    //console.log(Math.floor(mouseX), Math.floor(mouseY));
    var mouseTileIndex = getTileIndexAtPixelCoord(mouseX,mouseY);
    
    if( mouseTileIndex != undefined) {
      roomGrid[mouseTileIndex] = editorTileIndex;
    }
}