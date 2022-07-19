function Rat()
{
  this.image = ratPlaceholderImage;
  this.width = 10;
  this.height = 10;

  this.x = undefined;
  this.y = undefined;

  this.destinationX = undefined;
  this.destinationY = undefined;

  this.xVelocity = undefined;
  this.yVelocity = undefined;

  this.speed = undefined;
  this.damage = 1;

  this.Draw = function()
  {
    canvasContext.drawImage(this.image, this.x,this.y, this.width,this.height);
  }

  this.SetStartingXYCoordiantes = function()
  {
    this.x = getRandomArbitrary(TILE_W,canvas.width - TILE_W - this.width);
    this.y = getRandomArbitrary(TILE_H,canvas.height - TILE_H - this.height);
  }

  this.SetDestinationPoint = function()
  {
    this.destinationX = getRandomArbitrary(TILE_W,canvas.width - TILE_W - this.width);
    this.destinationY = getRandomArbitrary(TILE_H,canvas.height - TILE_H - this.height);

    // console.log("this.destinationX: " + this.destinationX);
    // console.log("this.destinationY: " + this.destinationY);
  }

  this.DefineSpeed = function()
  {
    this.speed = getRandomArbitrary(0.5,2);
  }

  this.SetStraightLinePathThroughVelocity = function()
  {
    var deltaX = this.destinationX - this.x;
    var deltaY = this.destinationY - this.y;

    var pathAngle = Math.atan2(deltaY,deltaX);

    this.xVelocity = this.speed * Math.cos(pathAngle);
    this.yVelocity = this.speed * Math.sin(pathAngle);
  }

  this.Move = function()
  {
    // console.log("Math.abs(this.destinationX - this.x): " + Math.abs(this.destinationX - this.x));
    if ( Math.abs(this.destinationX - this.x) < 1)
    {
      this.SetDestinationPoint();
      this.SetStraightLinePathThroughVelocity();
    }

    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  this.Initialize = function()
  {
    this.SetStartingXYCoordiantes();
    this.SetDestinationPoint();
    this.DefineSpeed();
    this.SetStraightLinePathThroughVelocity();
  }
}

function RatManager()
{
  this.arrayOfRats = [];

  this.SpawnRat = function()
  {
    let newRat = new Rat();
    newRat.Initialize();
    // console.log(newRat.destinationX + " " + newRat.destinationY);
    this.arrayOfRats.push(newRat);
  }

  this.Initialize = function()
  {
      for (let i = 0; i < 4; i++)
      {
        this.SpawnRat();
      }
  }

  this.DrawRats = function()
  {
    for (let i = 0; i < this.arrayOfRats.length; i++)
    {
      this.arrayOfRats[i].Draw();
    }
  }

  this.MoveRats = function()
  {
    for (let i = 0; i < this.arrayOfRats.length; i++)
    {
      this.arrayOfRats[i].Move();
    }
  }
}
