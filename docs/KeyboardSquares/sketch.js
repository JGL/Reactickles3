var bouncySquares = []; //array of BouncySquare objects

function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  noStroke(); //no outlines, just filled shapes
  colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
  rectMode(CENTER); // draw rects from their centres... https://p5js.org/reference/#/p5/rectMode

  var numberOfSquaresHorizontally = 5;
  var numberOfSquaresVertically = 5;
  var initialColour = color(random(100),50,100,50); //random hue, saturation 50%, brightness 100%, alpha 50%

  for (var j = 0; j < numberOfSquaresVertically; j++) {
    for (var i = 0; i < numberOfSquaresHorizontally; i++) {
      bouncySquares.push(new BouncySquare(i,j, numberOfSquaresHorizontally, numberOfSquaresVertically, initialColour));
    }
  }
}

function draw() {
  background(255); //white background
  drawSquares();
}

function drawSquares(){
  for (var i = 0; i < bouncySquares.length; i++) {
    bouncySquares[i].display();
  }
}

function keyTyped(){
  var lowerCaseKey = key.toLowerCase(); //key is a system variable via https://p5js.org/reference/#/p5/key
  var randomColour = color(random(100),50,100,50); //random hue, saturation 50%, brightness 100%, alpha 50%

  for (var i=0; i<bouncySquares.length; i++) {
    bouncySquares[i].move();
    bouncySquares[i].colour = randomColour;
  }
  return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
}

function BouncySquare(anXIndex, aYIndex, aNumberOfSquaresHorizontally, aNumberOfSquaresVertically, startColour){
  this.xIndex = anXIndex;
  this.yIndex = aYIndex
  this.numberOfSquaresHorizontally = aNumberOfSquaresHorizontally;
  this.numberOfSquaresVertically = aNumberOfSquaresVertically;
  this.colour = startColour;
  this.size = 50;
  this.mass = this.size / 10.0;
  this.springConstant = 0.5; //aka "k" in Hookes law https://en.wikipedia.org/wiki/Hooke's_law
  this.damping = 0.9;
  this.position = createVector(-1,-1);
  var scaledXSize = this.size/windowWidth;
  var scaledYSize = this.size/windowHeight;
  this.position.x = 0.5 - ((scaledXSize*this.numberOfSquaresHorizontally)/2.0) + (scaledXSize*this.xIndex);
  this.position.y = 0.5 - ((scaledYSize*this.numberOfSquaresVertically)/2.0) + (scaledYSize*this.yIndex); //making sure everything is centred, using winow width for y in order to get a square
  this.restPosition = createVector(this.position.x, this.position.y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.force = createVector(0,0);

  this.display = function(){
    //need to call dedicated static p5.vector methods, see: https://p5js.org/reference/#/p5.Vector
    this.force = p5.Vector.mult(p5.Vector.sub(this.position,this.restPosition),-this.springConstant); // f=-ky
    this.acceleration = p5.Vector.div(this.force,this.mass); // Set the acceleration, f=ma == a=f/m
    this.velocity = p5.Vector.mult(p5.Vector.add(this.velocity, this.acceleration),this.damping);
    this.position.add(this.velocity);

    var translatedX = this.position.x * windowWidth;
    var translatedY = this.position.y * windowHeight;
    fill(this.colour);
    rect(translatedX, translatedY, this.size, this.size); // https://p5js.org/reference/#/p5/rect
  }

  this.move = function(){ //move the position of the spring a bit
    var randomOffset = createVector(random(-0.1,0.1), random(-0.1,0.1));
    //this.position += randomOffset; += doesn't work!
    this.position.add(randomOffset); //see https://p5js.org/examples/hello-p5-flocking.html for more p5.vector fun
    // and http://p5js.org/reference/#/p5.Vector
  }
}
