var angle = 0;
var leftAngle;
var leftLen;

var slider;
var slider1;
var slider2;
var button;
var canvas;
function setup()
{
  canvas = createCanvas(windowWidth, windowHeight-20);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  slider = createSlider(0, PI, PI/4, .01);
  slider1 = createSlider(0, 2, 1, .01);
  slider2 = createSlider(0, .9, 2/3, .01);
  button = createCheckbox('Click me');
  //slider.position(0, height);
}

function draw()
{
  background(60);
  stroke(57,42,22);
  translate(windowWidth/2, height);
  angle = slider.value();
  leftAngle = slider1.value();
  leftLen = slider2.value();
  var len = 100;

  branch(100);
}

function branch(len)
{
  line(0, 0, 0, -len);
  translate(0, -len);
  if(len > 4)
  {
    if(len < 30)
    {
      stroke(30,252,30);
    }
    else
    {
      stroke(57,42,22);
    }
    push();
    rotate(angle);
    branch(len * 2/3);
    pop();
    push();
    rotate(-angle*leftAngle);
    branch(len * leftLen);
    pop();
  }
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}
