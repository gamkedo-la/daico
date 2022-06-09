var playerPic=document.createElement("img");
var angelPic=document.createElement("img");
var stonedAngelPic=document.createElement("img");
var enemyPic=document.createElement("img");
var heartFull=document.createElement("img");
var heartEmpty=document.createElement("img");
var mainMenuBackgroundImage=document.createElement("img");
var tilePics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode],fileName);
}

function loadImages() {

  var imageList = [
    {varName:playerPic, theFile:"warrior.png"},
    {varName:angelPic, theFile:"living_angel.png"},
    {varName:stonedAngelPic, theFile:"stoned_angel.png"},
    {varName:enemyPic, theFile:"enemy.png"},
    {varName:heartEmpty, theFile:"heartempty.png"},
    {varName:heartFull, theFile:"heartfull.png"},
    {varName:mainMenuBackgroundImage, theFile:"mainMenuBackgroundImage.png"},
    {tileType:TILE_GROUND, theFile:"world_ground.png"},
    {tileType:TILE_WALL, theFile:"world_wall.png"},
    {tileType:TILE_PLAYER, theFile:"warrior.png"},
    {tileType:TILE_ENEMY, theFile:"enemy.png"},
    {tileType:TILE_GOAL, theFile:"world_goal.png"},
    {tileType:TILE_KEY, theFile:"world_key.png"},
    {tileType:TILE_DOOR, theFile:"world_door.png"},
    {tileType:TILE_FULL_HEART, theFile:"heartempty.png"},
    {tileType:TILE_LIVING_ANGEL, theFile:"living_angel.png"},
    {tileType:TILE_STONED_ANGEL, theFile:"stoned_angel.png"},


    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tileType != undefined) {
      loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } // end of else
  } // end of for imageList

} // end of function loadImages
