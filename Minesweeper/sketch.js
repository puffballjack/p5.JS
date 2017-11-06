function make2DArray(cols, rows)
{
  var arr = new Array(cols);
  for(var i = 0; i < cols; i++)
  {
    arr[i] = new Array(rows);
  }
  return arr;
}

var cols;
var rows;
var grid;
var numOfCells = 10;
var w;
var testNum = 5;
var numOfBees = 20;
var gameOver = false;
var markerBool = false;

function mousePressed()
{
  if(!gameOver)
  {
    for(var i = 0; i < cols; i++)
    {
      for(var j = 0; j < rows; j++)
      {
        if(grid[i][j].contains(mouseX, mouseY))
        {
          grid[i][j].reveal(grid);
        }
      }
    }
  }
}

function keyPressed()
{
  if(key == " ")
  {
    if(markerBool == true)
    {
      markerBool = false;
    }
    else if(markerBool == false)
    {
      markerBool = true;
    }
    console.log(markerBool);
  }
}

function setup()
{
  createCanvas(401, 401);
  w = (width - 1)/numOfCells;
  cols = floor(width/w);
  rows = floor(height/w);
  grid = make2DArray(cols, rows);
  for(var i = 0; i < cols; i++)
  {
    for(var j = 0; j < rows; j++)
    {
      grid[i][j] = new Cell(i, j, w);
    }
  }
  placeBees(grid);
  for(var i = 0; i < cols; i++)
  {
    for(var j = 0; j < rows; j++)
    {
      grid[i][j].getBees(grid);
    }
  }
}

function draw()
{
  background(255);
  for(var i = 0; i < cols; i++)
  {
    for(var j = 0; j < rows; j++)
    {
      grid[i][j].show();
    }
  }
}
