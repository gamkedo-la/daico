// world, room, and tile constants, variables
const ROOM_COLS = 16;
const ROOM_ROWS = 24;

var roomIndex = 0;
var roomGrid = [];
var roomDungeon =
    [ 24, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1,23,
      21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0,24, 1, 1,21,
      21, 0, 0, 0, 4, 0, 0, 0, 2, 0,21, 0,21, 4,26,21,
      21, 0, 0, 0, 0, 0, 0, 0, 0, 0,21, 5,21, 5,21,21,
      21, 1, 0, 0, 1, 1, 0, 0, 4, 0,21, 0, 0, 0,21,21,
      21, 1, 0, 1, 1, 1, 1, 1, 1, 1,21, 0, 4, 0,21,21,
      21, 0, 0, 0, 0, 0, 0,30, 0, 0,21, 0, 0, 0,21,21,
      21, 0, 0, 1, 1, 1, 1, 1, 0, 0,21, 0, 4, 0,21,21,
      21, 6, 0, 0, 0, 0, 0, 0, 0, 0,21, 0, 0, 0,21,21,
      21, 0, 0, 0, 0, 0, 0, 0, 0, 0,21, 1, 1, 1,21,21,
      21, 6, 0, 0,21, 0,21, 0, 0, 0,21, 1, 1, 1,21,21,
      25, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1,22,
      24, 1, 0, 0, 1, 1,21, 1, 0, 0, 1, 1, 1, 1, 1,23,
      21, 0, 0, 0, 0, 0,21, 0, 0, 0, 5, 0,24, 1, 1,21,
      21, 0, 0, 0, 0, 0,21, 0, 0, 0,21, 0,21, 0,27,21,
      21, 0, 0, 0, 0, 0,21, 0, 0, 0,21, 0,21, 5,21,21,
      21, 1, 0, 0, 0, 1,22, 0, 0, 0,21, 0, 0, 0,21,21,
      21, 0, 0, 0, 0, 0, 0, 0, 0, 0,21, 0, 0, 0,21,21,
      21, 0, 0, 0, 0, 0, 0,30, 0, 0,21, 0, 0, 0,21,21,
      21, 0, 0, 1, 1, 1, 1, 1, 0, 0,21, 0, 4, 0,21,21,
      21, 6, 0, 0,21, 0, 0,31,26, 0,21, 0, 0, 0,21,21,
      21, 0, 5, 0, 5, 0, 5, 0,17, 0,21, 1, 1, 1,21,21,
      21, 6,21, 0,21, 0,21, 0, 0, 0,21, 1, 1, 1,21,21,
      25, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1, 1,22];
var roomLava =
    [ 34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,
    34,33,33,33,33,33,33, 0, 0, 0, 0, 0,34,34,34,34,
    34,33,33,33,32,32,33, 6, 2, 0, 0, 0,34, 0,29,34,
    34,32,32,32,32,32,33, 0, 0,34, 0, 0,34, 0,34,34,
    34,33,33,33,33,33,33, 0, 4,34, 0, 0, 0, 0,34,34,
    34,32,32, 0, 0, 0, 0, 0, 0,34, 0, 0, 4, 0,34,34,
    34,32,32, 0, 0, 0, 0, 0, 0,34,34, 0, 0, 0,34,34,
    34,32,32,32,32,32, 0, 0,34,34,34, 0, 4, 0,34,34,
    34,32, 0, 0,34,32,32, 0,32,34,34, 0, 0, 0,34,34,
    34,32,32,32,32,32,32, 0, 0,32,32,32,34,34,34,34,
    34,32,32,32,32,32, 0, 0, 0,32,32,32,34,34,34,34,
    34,34,34,34,34,34, 0, 0,34,32,32,34,34,34,34,34,
    34,34,34,34,34,32,32, 0,32,32,32,33,33,33,33,34,
    34, 0, 0, 0, 0,32, 0, 0, 0, 0, 0, 0,33,33,33,34,
    34, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0,34,34, 4, 4,34,
    34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,34,34, 5,34,34,
    34,34,34, 0,34,32,32,32, 4, 0, 0,34, 0, 0,34,34,
    34,32,32, 0, 0,32, 7,32, 0, 0, 5, 5, 4, 0,34,34,
    34,32,32, 0, 0,32, 0,32, 0, 0,34, 5, 0, 0,34,34,
    34,32,32, 0,32,32, 0,32,33,33,34,28, 0, 0,34,34,
    34,32,32,34,34,32, 0, 0, 0, 0, 5, 0, 0, 0,34,34,
    34, 0, 0, 0, 0,32, 0, 0, 0, 0,34,34,34,34,34,34,
    34, 0,32, 0,32,32, 34, 0, 0, 0,34,34,34,34,34,34,
    34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34];
var roomSurface =
[ 38,38,38,38,38,38,38,39,38,38,38,38,38,38,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0,20, 0, 0,38,38,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,38,
  38, 0, 0, 0, 0, 0, 0, 6, 0, 0,36,36,38, 0,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 4, 0,36,36,36, 0,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36, 0,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36, 0,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36, 0,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36, 0,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36, 0,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36, 0,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36,36,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,36,36,36,38,38,
  38, 0, 0, 0, 0, 0, 0, 0,38,20, 0,36,38,38,38,38,
  38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,38,
  38, 0, 0, 0, 0,38,38, 6, 0, 0, 0, 0, 0, 0,38,38,
  38,37,37,37,37,38, 0, 0, 4, 0, 0, 0, 0, 0,38,38,
  38,37,37,37,37, 0, 0, 0, 0, 0, 0, 0, 0, 0,38,38,
  38,37,37, 0, 0, 0, 0, 0, 0, 0, 0, 0,38, 0,38,38,
  38,37,37,38,38,38,38,38, 0, 0,38, 0,38, 0,38,38,
  38,37,37, 0,38, 0,38, 0, 0, 0,38, 0, 0, 0,38,38,
  38,37,37, 0, 0, 0, 0, 0, 0, 0,38,38,38,38,38,38,
  38,37,37, 2,38, 0,38, 0, 0, 0,38,38,38,38,38,38,
  38,38,38,38,38,38,38,38,38, 0,38,38,38,38,38,38];
var roomList = [roomLava, roomDungeon, roomSurface];

const TILE_W = 50;
const TILE_H = 50;

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYER = 2;
const TILE_MAGIC_DOOR3 = 3;
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
const TILE_VERTICAL = 21;
const TILE_CORNER1 = 22;
const TILE_CORNER2 = 23;
const TILE_CORNER3 = 24;
const TILE_CORNER4 = 25;
const TILE_VIAL = 26;
const TILE_RED_GEM = 27;
const TILE_GREEN_GEM = 28;
const TILE_BLUE_GEM = 29;
const TILE_LITTLE_ENEMY = 30;
const TILE_SMALL_POTION = 31;
const TILE_LAVA_FLOOR = 32;
const TILE_LAVA_WALL = 33;
const TILE_LAVA_WALL2 = 34;
const TILE_DUNGEON_DOOR = 35;
const TILE_SURFACE_FLOOR = 36;
const TILE_SURFACE_FLOOR2 = 37;
const TILE_SURFACE_WALL = 38;
const TILE_GATE = 39
const TILE_LAST = TILE_GATE;

var raycastP1X = 50;
var raycastP1Y = 50;
var raycastP2X = 150;
var raycastP2Y = 150;

function loadLevel(whichLevel) {
  startSound.play();
  if (editorMode) {
    canvas.width = 1000;
  } else {
    canvas.width = 800;
  }
  miniMapCanvas.width = MINIMAP_TILE_SIZE*ROOM_COLS;
  miniMapCanvas.height = MINIMAP_TILE_SIZE*ROOM_ROWS;
  miniMapCanvasContext = miniMapCanvas.getContext('2d');
  roomGrid = JSON.parse(JSON.stringify(whichLevel));
  
  if (editorMode == false) {
    p1.init(playerPic, "Blue");
    angel.reset();
    
    characterDrawOrder = [p1,angel];
    enemyList = [];
    var foundAnotherEnemy;
    do {
      var e1 = new enemyClass();
      foundAnotherEnemy = e1.reset();
      if (foundAnotherEnemy) {
        enemyList.push(e1);
        characterDrawOrder.push(e1);
      }
    } while (foundAnotherEnemy);

    do {
      var e1 = new bossClass();
      foundAnotherEnemy = e1.reset();
      if (foundAnotherEnemy) {
        enemyList.push(e1);
        characterDrawOrder.push(e1);
      }
    } while (foundAnotherEnemy);

    do {
      var e1 = new LittleEnemyClass();
      foundAnotherEnemy = e1.reset();
      if (foundAnotherEnemy) {
        enemyList.push(e1);
        characterDrawOrder.push(e1);
      }
    } while (foundAnotherEnemy);

  } else {
    characterDrawOrder = [];
  }
  updateMiniMap();
  moveAngelToPlayer();
}

function moveAngelToPlayer() {
  if(!angel.isStone){
    angel.inRoom = roomIndex;
    angel.x = p1.x + 1;
    angel.y = p1.y + 1;
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
     //document.getElementById("debugText").innerHTML = "out of bounds:"+pixelX+","+pixelY;
     return undefined;
  }
  
  var tileIndex = roomTileToIndex(tileCol, tileRow);
  return tileIndex;
}

function tileTypeHasTransparency(checkTileType) {
  return (checkTileType == TILE_KEY ||
          checkTileType == TILE_DOOR ||
          checkTileType == TILE_POTION ||
          checkTileType == TILE_SMALL_POTION ||
          checkTileType == TILE_VIAL ||
          checkTileType == TILE_ROCK ||
          checkTileType == TILE_RED_GEM ||
          checkTileType == TILE_BLUE_GEM ||
          checkTileType == TILE_GREEN_GEM ||
          checkTileType == TILE_DIAMOND);
}


function tileTypeHasWallCollision(checkTileType) {
	return (checkTileType == TILE_GOAL ||
    checkTileType == TILE_KEY ||
    checkTileType == TILE_DOOR ||
    checkTileType == TILE_POTION ||
    checkTileType == TILE_SMALL_POTION ||
    checkTileType == TILE_VIAL ||
    checkTileType == TILE_ROCK ||
    checkTileType == TILE_DIAMOND ||
    checkTileType == TILE_RED_GEM ||
    checkTileType == TILE_BLUE_GEM ||
    checkTileType == TILE_GREEN_GEM ||
    checkTileType == TILE_WALL);
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

function tileTypePickUp(type){
  if(type == TILE_KEY || type == TILE_DOOR || type == TILE_LIVING_ANGEL || type == TILE_STONED_ANGEL ||
    type == TILE_DIAMOND || type == TILE_ROCK || type == TILE_POTION || type == TILE_SMALL_POTION || type == TILE_VIAL || 
    type == TILE_BLUE_GEM || type == TILE_GREEN_GEM || type == TILE_RED_GEM || type == TILE_DIAMOND){
    return true;
  }
  return false;
}
function tileTypeBlocksEnemy(type) {
  if(type == TILE_GROUND || type == TILE_KEY || type == TILE_LIVING_ANGEL || type == TILE_STONED_ANGEL ||
    type == TILE_DIAMOND || type == TILE_ROCK || type == TILE_POTION || type == TILE_SMALL_POTION  || type == TILE_VIAL || 
    type == TILE_BLUE_GEM || type == TILE_GREEN_GEM || type == TILE_RED_GEM || type == TILE_DIAMOND){
    return false;
  }
  return true;
}


function tileTypeBlocksPlayer(type) {
  if (type == TILE_DOOR || type == TILE_GATE || type == TILE_MAGIC_DOOR || type == TILE_MAGIC_DOOR2 || type == TILE_MAGIC_DOOR3){
    return false;
  }

 return tileTypeBlocksEnemy(type);
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
  return false;
}


function whereIsWallBetweenPoints(p1X,p1Y,p2X,p2Y){
  var testX = p1X;
  var testY = p1Y;
  var lastSafeX = testX;
  var lastSafeY = testY;
  
  for(var perc=0; perc <= 1.0; perc+= 0.05) {
    testX = p1X * (1.0 - perc) + p2X * perc;
    testY = p1Y * (1.0 - perc) + p2Y * perc;
    var tileHere = tileTypeAtPixel(testX,testY);
    if(tileTypeBlocksEnemy(tileHere) || tileTypePickUp(tileHere)) {
      var indexBlockedAt = getTileIndexAtPixelCoord(testX,testY);
      return {x:lastSafeX, y:lastSafeY, tileKind:tileHere, idxBlockedAt: indexBlockedAt};
    }
    lastSafeX = testX;
    lastSafeY = testY;
  }
  return {x:lastSafeX, y:lastSafeY, tileKind:TILE_WALL};
}
