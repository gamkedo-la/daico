const MINIMAP_TILE_SIZE = 4;
function drawMiniMap (x, y) {
	var tileCol = (cameraPanX) / TILE_W;
	var tileRow =(cameraPanY) /  TILE_H;
	var screenCols = Math.floor(canvas.width/TILE_W) + 2;
	var screenRows = Math.floor(canvas.height/TILE_H) + 2;
	canvasContext.drawImage(miniMapCanvas, x,y);
    for (var i=0;i<characterDrawOrder.length; i++) {
        var mapX = x +  Math.floor(characterDrawOrder[i].x / TILE_W) * MINIMAP_TILE_SIZE;
        var mapY = y + Math.floor(characterDrawOrder[i].y / TILE_H) * MINIMAP_TILE_SIZE;
        colorRect(mapX, mapY, MINIMAP_TILE_SIZE, MINIMAP_TILE_SIZE, 'red');
        
    }
	//mapRectOutline(x+tileCol*MINIMAP_TILE_SIZE, y+tileRow*MINIMAP_TILE_SIZE, screenCols*MINIMAP_TILE_SIZE, screenRows*MINIMAP_TILE_SIZE, "red");
} 
function removeTileAndUpdateMinimap(index) {
    roomGrid[index] = TILE_GROUND;
    updateMiniMap();
}

function updateMiniMap() {
	var tileIndex = 0;
	var tileLeftEdgeX = 0;
	var tileUpEdgeY = 0;
	
	// we'll use Math.floor to round down to the nearest whole number
 
    var leftCol = 0;
    var rightCol = ROOM_COLS;
    var topRow = 0;
    var bottomRow = ROOM_ROWS;
	for(var eachRow=topRow; eachRow<bottomRow; eachRow++) { // deal with one row at a time 
	  for(var eachCol=leftCol; eachCol<rightCol; eachCol++) { // left to right in each row
		tileIndex = roomTileToIndex(eachCol,eachRow);
		var tileTypeHere = roomGrid[ tileIndex ]; // getting the tile code for this index
		tileLeftEdgeX = eachCol*MINIMAP_TILE_SIZE;
		tileUpEdgeY = eachRow*MINIMAP_TILE_SIZE;
        var miniMapColor;
        if(tileTypePickUp(tileTypeHere)) {
            miniMapColor = "cyan";
        } else if (tileTypeBlocksPlayer(tileTypeHere)) {
            miniMapColor = "grey";
        } else {
            miniMapColor = "white";
        }
        mapRect(tileLeftEdgeX, tileUpEdgeY, MINIMAP_TILE_SIZE, MINIMAP_TILE_SIZE, miniMapColor);

	  } // end of for eachCol
	} // end of for eachRow
	//draws walls on the world edge. should save dats so this code shouldn't stay.
} // end of drawRoom()
