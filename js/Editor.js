function editorDraw() {
    colorRect(canvas.width-TILE_W-2,0,TILE_W,(TILE_LAST + 1)*TILE_H+2, 'black');
    for (var i=0; i<=TILE_LAST;i++) {
        canvasContext.drawImage(tilePics[i], canvas.width-TILE_W ,i*TILE_H ); 
        if (i==editorTileIndex) {
            colorRect(canvas.width-TILE_W-5, i*TILE_H, 5, TILE_H, "red");
        }
    }
} 

function editorClick(){
    if (mouseX > canvas.width - TILE_W && mouseY < (TILE_LAST + 1)*TILE_H) {
        editorTileIndex = Math.floor(mouseY/TILE_H);
        return;
    }
    //console.log(Math.floor(mouseX), Math.floor(mouseY));
    var mouseTileIndex = getTileIndexAtPixelCoord(mouseX,mouseY);
    
    if( mouseTileIndex != undefined) {
      roomGrid[mouseTileIndex] = editorTileIndex;
    }
}