var playerPic=document.createElement("img");
var angelPic=document.createElement("img");
var stonedAngelPic=document.createElement("img");
var littleEnemyPic=document.createElement("img");
var enemyPic=document.createElement("img");
var bossPic=document.createElement("img");
var heartFull=document.createElement("img");
var heartHalfFull=document.createElement("img");
var heartEmpty=document.createElement("img");
var mainMenuBackgroundImage=document.createElement("img");
var mainMenuBackgroundImage_with_logo=document.createElement("img");
var batOpenImage=document.createElement("img");
var batClosedImage=document.createElement("img");
var ratPlaceholderImage=document.createElement("img");
var claw=document.createElement("img");
var smokePic=document.createElement("img");
var bloodPic=document.createElement("img");
var sparklePic=document.createElement("img");
var footprintPic=document.createElement("img");
var bubblePic=document.createElement("img");
var glowPic=document.createElement("img");
var redMist=document.createElement("img");
var blueMist=document.createElement("img");
var greenMist=document.createElement("img");
var blackMist=document.createElement("img");
var whiteMist=document.createElement("img");
var attackFxPic=document.createElement("img");
var diamond=document.createElement("img");
var rock=document.createElement("img");
var redGem=document.createElement("img");
var blueGem=document.createElement("img");
var greenGem=document.createElement("img");
var vial=document.createElement("img");
var potion=document.createElement("img");
var smallPotion=document.createElement("img");
var key=document.createElement("img");


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
    {varName:playerPic, theFile:"main_chara.png"},
    {varName:claw, theFile:"projectile.png"},
    {varName:angelPic, theFile:"living_angel.png"},
    {varName:stonedAngelPic, theFile:"stoned_angel.png"},
    {varName:enemyPic, theFile:"enemy.png"},
    {varName:littleEnemyPic, theFile:"little_enemy.png"},
    {varName:bossPic, theFile:"boss.png"},
    {varName:heartFull, theFile:"heartfull.png"},
    {varName:heartHalfFull, theFile:"heart_half_full.png"},
    {varName:heartEmpty, theFile:"heartempty.png"},
    {varName:mainMenuBackgroundImage, theFile:"mainMenuBackgroundImage.png"},
    {varName:mainMenuBackgroundImage_with_logo, theFile:"mainMenuBackgroundImage_with_logo.png"},
    {varName:batOpenImage, theFile:"bat_open.png"},
    {varName:batClosedImage, theFile:"bat_closed.png"},
    {varName:smokePic, theFile:"smoke.png"},
    {varName:bloodPic, theFile:"blood.png"},
    {varName:sparklePic, theFile:"sparkle.png"},
    {varName:footprintPic, theFile:"footprints.png"},
    {varName:bubblePic, theFile:"bubble.png"},
    {varName:glowPic, theFile:"glow.png"},
    {varName:redMist, theFile:"red_mist.png"},
    {varName:blueMist, theFile:"blue_mist.png"},
    {varName:greenMist, theFile:"green_mist.png"},
    {varName:blackMist, theFile:"black_mist.png"},
    {varName:whiteMist, theFile:"white_mist.png"},
    {varName:attackFxPic, theFile:"attack_fx.png"},
    
    {varName:diamond, theFile:"Daico_Diamond.png"},
    {varName:rock, theFile:"rock.png"},
    {varName:redGem, theFile:"Daico_RedGem.png"},
    {varName:blueGem, theFile:"Daico_blue_gem.png"},
    {varName:greenGem, theFile:"Daico_green_gem.png"},
    {varName:potion, theFile:"Daico_green_potion.png"},
    {varName:smallPotion, theFile:"Daico_green_potion_small.png"},
    {varName:vial, theFile:"Daico_Potion.png"},
    {varName:key, theFile:"world_key.png"},

    {tileType:TILE_GROUND, theFile:"dungeon_floor.png"},
    {tileType:TILE_GROUND_2, theFile:"dungeon_floor_2.png"},
    {tileType:TILE_GROUND_3, theFile:"dungeon_floor_3.png"},
    {tileType:TILE_GROUND_4, theFile:"dungeon_floor_4.png"},
    {tileType:TILE_GROUND_5, theFile:"dungeon_floor_5.png"},
    {tileType:TILE_GROUND_6, theFile:"dungeon_floor_6.png"},
    {tileType:TILE_WALL, theFile:"dungeon_wall.png"},
    {tileType:TILE_VERTICAL, theFile:"dungeon_wall_vertical.png"},
    {tileType:TILE_CORNER1, theFile:"dungeon_wall_corner1.png"},
    {tileType:TILE_CORNER2, theFile:"dungeon_wall_corner2.png"},
    {tileType:TILE_CORNER3, theFile:"dungeon_wall_corner3.png"},
    {tileType:TILE_CORNER4, theFile:"dungeon_wall_corner4.png"},
    {tileType:TILE_PLAYER, theFile:"main_chara.png"},
    {tileType:TILE_ENEMY, theFile:"enemy.png"},
    {tileType:TILE_LITTLE_ENEMY, theFile:"little_enemy.png"},
    {tileType:TILE_BOSS, theFile:"boss.png"},
    {tileType:TILE_GOAL, theFile:"world_goal.png"},
    {tileType:TILE_KEY, theFile:"world_key.png"},
    {tileType:TILE_DOOR, theFile:"world_door.png"},
    {tileType:TILE_MAGIC_DOOR, theFile:"magic_door.png"},
    {tileType:TILE_MAGIC_DOOR2, theFile:"magic_door2.png"},
    {tileType:TILE_FULL_HEART, theFile:"heartempty.png"}, // TODO: Is this right?
    {tileType:TILE_LIVING_ANGEL, theFile:"living_angel.png"},
    {tileType:TILE_STONED_ANGEL, theFile:"stoned_angel.png"},
    {tileType:TILE_DIAMOND, theFile:"Daico_Diamond.png"},
    {tileType:TILE_ROCK, theFile:"rock.png"},
    {tileType:TILE_RED_GEM, theFile:"Daico_RedGem.png"},
    {tileType:TILE_BLUE_GEM, theFile:"Daico_blue_gem.png"},
    {tileType:TILE_GREEN_GEM, theFile:"Daico_green_gem.png"},
    {tileType:TILE_POTION, theFile:"Daico_green_potion.png"},
    {tileType:TILE_SMALL_POTION, theFile:"Daico_green_potion_small.png"},
    {tileType:TILE_VIAL, theFile:"Daico_Potion.png"},

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
