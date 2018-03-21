function KeyboardSquares(){
  var bouncySquares = []; //array of BouncySquare objects
  var numberOfSquaresHorizontally = 5;
  var numberOfSquaresVertically = 5;
  var randomColour;

  this.setup = function(){
    createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
    noStroke(); //no outlines, just filled shapes
    colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
    rectMode(CENTER); // draw rects from their centres... https://p5js.org/reference/#/p5/rectMode
    this.pickRandomColour();
    while(bouncySquares.length > 0) { // https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
      bouncySquares.pop();
    }
    this.createSquares();
  }

  this.draw = function(){
    rectMode(CENTER); // draw rects from their centres... https://p5js.org/reference/#/p5/rectMode
    background(255); //white background
    this.drawSquares();
  }

  this.drawSquares = function(){
    for (var i = 0; i < bouncySquares.length; i+= 1) {
      bouncySquares[i].display();
    }
  }

  this.keyTyped = function(){
    var lowerCaseKey = key.toLowerCase(); //key is a system variable via https://p5js.org/reference/#/p5/key
    this.pickRandomColour();

    for (var i=0; i<bouncySquares.length; i+= 1) {
      bouncySquares[i].move();
      bouncySquares[i].colour = randomColour;
    }
    return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
  }

  this.mouseReleased = function(){
    return false; //https://p5js.org/reference/#/p5/mouseReleased preventing default behaviour
  }

  this.touchMoved = function(){
    return false; //https://p5js.org/reference/#/p5/touchMoved
  }

  this.windowResized = function(){//https://p5js.org/reference/#/p5/windowResized
    resizeCanvas(windowWidth, windowHeight);
  }

  this.createSquares = function(){
    for (var j = 0; j < numberOfSquaresVertically; j+= 1) {
      for (var i = 0; i < numberOfSquaresHorizontally; i+= 1) {
        bouncySquares.push(new BouncySquare(i,j, numberOfSquaresHorizontally, numberOfSquaresVertically, randomColour));
      }
    }
  }

  this.windowResized = function(){ //https://p5js.org/reference/#/p5/windowResized
    resizeCanvas(windowWidth, windowHeight);
    bouncySquares.splice(0,bouncySquares.length) //http://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    createSquares();
  }

  this.pickRandomColour = function(){
    randomColour = color(random(100),50,100,50); //random hue, saturation 50%, brightness 100%, alpha 50%
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
    this.position.y = 0.5 - ((scaledYSize*this.numberOfSquaresVertically)/2.0) + (scaledYSize*this.yIndex); //making sure everything is centred
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
}