function Cell(i , j, size)
{
  this.i = i;
  this.j = j;
  this.x = i*size;
  this.y = j*size;
  this.size = size;
  this.neighbors = 0;
  this.bee = false;
  this.revealed = false;
  this.firstBee = false;
  this.marked = false;
}



Cell.prototype.show = function()
{
  stroke(0);
  noFill();
  rect(this.x, this.y, this.size, this.size);
  if(this.revealed)
  {
    this.marked = false;
    if(this.bee)
    {
      if(this.firstBee)
      {
        noStroke();
        fill(255, 0, 0);
        rect(this.x+1, this.y+1, this.size-1, this.size-1);
      }
      stroke(0);
      fill(255);
      ellipse(this.x + this.size/2, this.y + this.size/2, this.size * .5, this.size * .5);
    }
    else
    {
      noStroke();
      fill(245);
      rect(this.x+1, this.y+1, this.size-1, this.size-1);
      if(this.neighbors > 0)
      {
        fill(0);
        textSize(20);
        textAlign(CENTER);
        text(this.neighbors, this.x + this.size*.5, this.y + this.size*.5+6);
      }
    }
  }
  if(this.marked)
  {
    stroke(0);
    fill(255, 0, 0);
    ellipse(this.x + this.size/2, this.y + this.size/2, this.size * .5, this.size * .5);
  }
  if(gameOver)
  {
    fill(0);
    textSize(40);
    textAlign(CENTER);
    text("Game Over!", width/2, height/2)
  }
  else if(markerBool)
  {
    fill(100);
    textSize(10);
    textAlign(CENTER);
    text("Marker", 18, height-5)
  }
}

function placeBees(arr)
{
  var options = [];
  for(var i = 0; i<cols; i++)
  {
    for(var j = 0; j<rows; j++)
    {
      options.push([i, j]);
    }
  }
  for(var n = 0; n < numOfBees; n++)
  {
    var index = floor(random(options.length));
    var choice = options[index];
    var col = choice[0];
    var row = choice[1];
    options.splice(index, 1);
    arr[col][row].bee = true;
  }
}

Cell.prototype.contains = function(x, y)
{
  return (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size);
}

Cell.prototype.reveal = function(arr)
{
  if(markerBool == false && !this.marked)
  {
    this.revealed = true;
    if(this.bee)
    {
      gameOver = true;
      this.firstBee = true;
      for(var i = 0; i < arr.length; i++)
      {
        for(var j = 0; j < arr[i].length; j++)
        {
          arr[i][j].revealed = true;
        }
      }
    }
    else if(this.neighbors == 0)
    {
      this.floodFill(arr);
    }
  }
  //console.log(this.neighbors)
  if(markerBool)
  {
    if(this.marked == false)
    {
      this.marked = true;
    }
    else
    {
      this.marked = false;
    }
  }
}

Cell.prototype.floodFill = function(arr)
{
  for(var c = -1; c <= 1; c++)
  {
    for(var r = -1; r <= 1; r++)
    {
      var i = this.i + c;
      var j = this.j + r;
      if(i > -1 && i < cols && j > -1 && j < rows)
      {
        var neighbor = arr[i][j];
        if(!neighbor.bee && !neighbor.revealed)
        {
          neighbor.reveal(arr);
        }
      }
    }
  }
}

Cell.prototype.getBees = function(arr)
{

  for(var c = -1; c <= 1; c++)
  {
    for(var r = -1; r <= 1; r++)
    {
      if(this.i + c > -1 && this.i + c < cols && this.j + r > -1 && this.j + r < rows)
      {
        var neighbor = arr[this.i + c][this.j + r];
        if(neighbor.bee)
        {
          this.neighbors++;
        }
      }
    }
  }

  if(this.bee)
  {
    this.neighbors = -1;
  }
}
