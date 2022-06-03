function drawEditor() {
    colorRect(canvas.width-TILE_W-2,0,TILE_W,(TILE_LAST + 1)*TILE_H+2, 'black');
    for (var i=0; i<=TILE_LAST;i++) {
        canvasContext.drawImage(tilePics[i], canvas.width-TILE_W ,i*TILE_H ); 
    }
} 