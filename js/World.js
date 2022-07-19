// world, room, and tile constants, variables
const ROOM_COLS = 16;
const ROOM_ROWS = 12;

var roomGrid = [];
var roomDungeon =
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 19, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
      1, 8, 4, 0, 4, 0, 1, 6, 2, 0, 1, 0, 1, 4, 4, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
      1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 4, 0, 1, 1,
      1, 6, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 5, 0, 5, 0, 5,16,17,18, 1, 1, 1, 1, 1, 1,
      1, 6, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1, 1, 1];
var roomLava =
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
      1, 0, 4, 0, 4, 0, 1, 6, 2, 0, 1, 0, 1, 4, 4, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
      1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 4, 0, 1, 1,
      1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
      1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 1, 1, 1, 1, 1,
      1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      var roomSurface =
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0,0 , 0, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1, 1, 1];
var roomList = [roomDungeon, roomLava, roomSurface];
var roomIndex = 0;
const TILE_W = 50;
const TILE_H = 50;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;
const TILE_ENEMY = 6;
const TILE_STONED_ANGEL = 7;
const TILE_LIVING_ANGEL = 8;
const TILE_FULL_HEART = 9;
const TILE_MAGIC_DOOR = 10;
const TILE_GROUND_2 = 11;
const TILE_GROUND_3 = 12;
const TILE_GROUND_4 = 13;
const TILE_GROUND_5 = 14;
const TILE_GROUND_6 = 15;
const TILE_DIAMOND = 16;
const TILE_ROCK = 17;
const TILE_POTION = 18;
const TILE_MAGIC_DOOR2 = 19;
const TILE_BOSS = 20;
const TILE_LAST = TILE_BOSS;

var raycastP1X = 50;
var raycastP1Y = 50;
var raycastP2X = 150;
var raycastP2Y = 150;

function loadLevel(whichLevel) {
  if (editorMode) {
    canvas.width = 1000;
  } else {
    canvas.width = 800;
  }
  roomGrid = JSON.parse(JSON.stringify(whichLevel));
  if (editorMode == false) {
    p1.init(playerPic, "Blue");
    angel.reset();
    characterDrawOrder = [p1,angel];
    var foundAnotherEnemy;
    do {
      var e1 = new enemyClass();
      foundAnotherEnemy = e1.reset();
      if (foundAnotherEnemy) {
        enemyList.push(e1);
        characterDrawOrder.push(e1);
      }
    } while (foundAnotherEnemy);
  } else {
    characterDrawOrder = [];
  }
  

}
function roomTileToIndex(tileCol, tileRow) {
  return (tileCol + ROOM_COLS*tileRow);
}

function getTileIndexAtPixelCoord(pixelX,pixelY) {
  var tileCol = pixelX / TILE_W;
  var tileRow = pixelY / TILE_H;
  
  // we'll use Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the tile coords fall within valid bounds
  if(tileCol < 0 || tileCol >= ROOM_COLS ||
     tileRow < 0 || tileRow >= ROOM_ROWS) {
     document.getElementById("debugText").innerHTML = "out of bounds:"+pixelX+","+pixelY;
     return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_GOAL ||
          checkTileType == TILE_KEY ||
          checkTileType == TILE_DOOR ||
          checkTileType == TILE_POTION ||
          checkTileType == TILE_ROCK ||
          checkTileType == TILE_DIAMOND);
}

function tileTypeAtPixel(pixelX, pixelY){
  var tileIndex = getTileIndexAtPixelCoord(pixelX,pixelY);
  return roomGrid[tileIndex];
} 
function drawRoom() {
  var tileIndex = 0;
  var tileLeftEdgeX = 0;
  var tileTopEdgeY = 0;
  
  for(var eachRow=0; eachRow<ROOM_ROWS; eachRow++) { // deal with one row at a time
    
    tileLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge
    
    for(var eachCol=0; eachCol<ROOM_COLS; eachCol++) { // left to right in each row

      var tileTypeHere = roomGrid[ tileIndex ]; // getting the tile code for this index
      if( tileTypeHasTransparency(tileTypeHere) ) {
        canvasContext.drawImage(tilePics[TILE_GROUND], tileLeftEdgeX, tileTopEdgeY);
      }
      
      // some tiles may emit particle fx
      tile_particles(tileTypeHere,tileLeftEdgeX,tileTopEdgeY);

      // draw the tile
      canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);

      
      tileIndex++; // increment which index we're going to next check for in the room
      tileLeftEdgeX += TILE_W; // jump horizontal draw position to next tile over by tile width

    } // end of for eachCol
    
    tileTopEdgeY += TILE_H; // jump horizontal draw position down by one full tile height
    
  } // end of for eachRow   
} // end of drawRoom()

function tileTypeBlocksEnemy(type) {
  if(type == TILE_GROUND || type == TILE_KEY){
    return false;
  }
  return true;
}
function isWallBetweenPoints(p1X,p1Y,p2X,p2Y){
  var testX = p1X;
  var testY = p1Y;
  
  for(var perc=0; perc <= 1.0; perc+= 0.05) {
    testX = p1X * (1.0 - perc) + p2X * perc;
    testY = p1Y * (1.0 - perc) + p2Y * perc;
    var tileHere = tileTypeAtPixel(testX,testY);
    if(tileTypeBlocksEnemy(tileHere)) {
      return true;
    }
  }
  
  //todo check points between the ends
  return false;
}