function Bat()
{
  this.arrayOfImages = [batOpenImage,batClosedImage];
  this.currentImageIndex = getRandomInt(0, 1);
  this.cumulativeDeltaTime = 0;

  this.width = 25;
  this.height = 25;

  this.x = undefined;
  this.y = undefined;
  this.bezierPoints = [];

  this.percentTraversedOnBezier = 0;
  this.speed = getRandomArbitrary(0.001,0.005);

  this.defineStartingXYCoordinatesAndBezierPoints = function()
  {
    let coinFlipResult = Math.random();

    //start off left side of screen
    if (coinFlipResult < 0.5)
    {
      this.x = -this.width;
      this.y = getRandomArbitrary( TILE_H * 2, (canvas.height - TILE_H * 2) );

      this.bezierPoints =
      [
        {x:this.x,y:this.y},
        {x:canvas.width * 0.25,y:this.y + 150},
        {x:canvas.width * 0.75,y:this.y - 150},
        {x:canvas.width + TILE_W,y:this.y}
      ]
    }
    //start off right side of screen
    else
    {
      this.x = canvas.width + this.width;
      this.y = getRandomArbitrary( TILE_H * 2, (canvas.height - TILE_H * 2) );

      this.bezierPoints =
      [
        {x:this.x,y:this.y},
        {x:canvas.width * 0.75,y:this.y + 50},
        {x:canvas.width * 0.25,y:this.y - 50},
        {x:-TILE_W,y:this.y}
      ]
    }
  }

  this.Draw = function()
  {
    canvasContext.drawImage(this.arrayOfImages[this.currentImageIndex], this.x,this.y, this.width,this.height);
  }

  this.UpdateImageIndex = function()
  {
    this.cumulativeDeltaTime += deltaTime;

    if (this.cumulativeDeltaTime >= TIME_SCALE)
    {
      this.currentImageIndex++;

      if (this.currentImageIndex > this.arrayOfImages.length - 1)
      {
        this.currentImageIndex = 0;
      }

      this.cumulativeDeltaTime = 0;
    }
  }

  this.Move = function()
  {
    let [point0, point1, point2, point3] = this.bezierPoints;

    let cX = 3 * (point1.x - point0.x);
    let bX = 3 * (point2.x - point1.x) - cX;
    let aX = point3.x - point0.x -cX - bX;

    let cY = 3 * (point1.y - point0.y);
    let bY = 3 * (point2.y - point1.y) - cY;
    let aY = point3.y - point0.y - cY - bY;

    //for this frame
    let percentTraversedOnBezier = this.percentTraversedOnBezier;

    //for next frame
    this.percentTraversedOnBezier += this.speed;

    let xPercentTraversed =
      aX * (percentTraversedOnBezier*percentTraversedOnBezier*percentTraversedOnBezier) +
      bX * (percentTraversedOnBezier*percentTraversedOnBezier) +
      cX * percentTraversedOnBezier +
      point0.x;

    let yPercentTraversed =
      aY * (percentTraversedOnBezier*percentTraversedOnBezier*percentTraversedOnBezier) +
      bY * (percentTraversedOnBezier*percentTraversedOnBezier) +
      cY * percentTraversedOnBezier +
      point0.y;

    if (this.percentTraversedOnBezier > 1)
    {
      this.percentTraversedOnBezier = 0;

      this.defineStartingXYCoordinatesAndBezierPoints();
    }

    this.x = xPercentTraversed;
    this.y = yPercentTraversed;
  }
}

function BatManager()
{
  this.arrayOfBats = [];

  this.SpawnBat = function()
  {
    let newBat = new Bat();
    newBat.defineStartingXYCoordinatesAndBezierPoints();
    this.arrayOfBats.push(newBat);
  }

  this.Initialize = function()
  {
    for (let i = 0; i < 10; i++)
    {
      this.SpawnBat();
    }
  }

  this.DrawBats = function()
  {
    for (let i = 0; i < this.arrayOfBats.length; i++)
    {
      this.arrayOfBats[i].Draw();
    }
  }

  this.UpdateBatImageIndices = function()
  {
    for (let i = 0; i < this.arrayOfBats.length; i++)
    {
      this.arrayOfBats[i].UpdateImageIndex();
    }
  }

  this.MoveBats = function()
  {
    for (let i = 0; i < this.arrayOfBats.length; i++)
    {
      this.arrayOfBats[i].Move();
    }
  }
}
