var bouncyCircles = []; //array of BouncyCircle objects
var allTheKeys = "1234567890qwertyuiopasdfghjklzxcvbnm";

function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  noStroke(); //no outlines, just filled shapes
  colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color

  for (var i=0; i < allTheKeys.length; i++) {
    bouncyCircles.push(new BouncyCircle(allTheKeys[i]));
  }
}

function draw() {
  background(255); //white background
  drawCircles();
}

function drawCircles(){
  for (var i = 0; i < bouncyCircles.length; i++) {
    bouncyCircles[i].display();
  }
}

function keyTyped(){
  var lowerCaseKey = key.toLowerCase(); //key is a system variable via https://p5js.org/reference/#/p5/key
  for (var i=0; i<bouncyCircles.length; i++) {
    if(lowerCaseKey == bouncyCircles[i].key){
      bouncyCircles[i].moveSpring();
    }
  }
  return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
}

function BouncyCircle(aKey){ //SpringyCircle object
  this.key = aKey;
  this.colour = color(random(100),50,100,50);; //random hue, saturation 50%, brightness 100%, alpha 50%
  this.radius = 100;
  this.position = createVector(-1,-1);
  this.position = getCanvasPositionFromKey(this.key);

  // Spring simulation from https://p5js.org/examples/simulate-spring.html
  // Spring simulation constants
  this.M = 0.8;  // Mass
  this.K = 0.2;  // Spring constant
  this.D = 0.92; // Damping
  this.R = this.position.y;  // Rest position

  // Spring simulation variables
  //this.ps = R,   // Position, not needed as we have this.position.y
  this.vs = 0.0, // Velocity
  this.as = 0,   // Acceleration
  this.f = 0;    // Force

  this.display = function(){
    this.spring();
    var translatedX = this.position.x * windowWidth;
    var translatedY = this.position.y * windowHeight;
    fill(this.colour);
    ellipse(translatedX, translatedY, this.radius, this.radius);
  }

  this.spring = function(){
    // Update the spring position
    this.f = -this.K * ( this.position.y - this.R ); // f=-ky
    this.as = this.f / this.M; // Set the acceleration, f=ma == a=f/m
    this.vs = this.D * (this.vs + this.as);  // Set the velocity
    this.position.y = this.position.y + this.vs;        // Updated position

    if (abs(this.vs) < 0.1) {
      this.vs = 0.0;
    }
  }

  this.moveSpring = function(){ //move the position of the spring a bit
    this.position.y += 0.1; //move a 10th of the screen down
  }
}

function getCanvasPositionFromKey(aKey){ //returns the position of a key onscreen in the form of a vector between 0..1 where 0,0 is top left and 1,1 is bottom right of screen - i.e. relative screen ratio rather than absolute pixel position
  var canvasPosition =  createVector(0.5,0.5); //centre of screen for now
  var numberOfRows = 4;
  var yNudge = (1/numberOfRows)/2;

  switch(aKey) {
    case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case '0':
    canvasPosition.y = 0+yNudge;
    canvasPosition.x = findXOnFirstRowKey(aKey);
    break;
    case 'q': case 'w': case 'e': case 'r': case 't': case 'y': case 'u': case 'i': case 'o': case 'p':
    case 'Q': case 'W': case 'E': case 'R': case 'T': case 'Y': case 'U': case 'I': case 'O': case 'P':
    canvasPosition.y = 0.25+yNudge;
    canvasPosition.x = findXOnSecondRowKey(aKey);
    break;
    case 'a': case 's': case 'd': case 'f': case 'g': case 'h': case 'j': case 'k': case 'l':
    case 'A': case 'S': case 'D': case 'F': case 'G': case 'H': case 'J': case 'K': case 'L':
    canvasPosition.y = 0.5+yNudge;
    canvasPosition.x = findXOnThirdRowKey(aKey);
    break;
    case 'z': case 'x': case 'c': case 'v': case 'b': case 'n': case 'm':
    case 'Z': case 'X': case 'C': case 'V': case 'B': case 'N': case 'M':
    canvasPosition.y = 0.75+yNudge;
    canvasPosition.x = findXOnFourthRowKey(aKey);
    break;
  }

  return canvasPosition;
}

function findXOnFirstRowKey(aKey){
  //10 keys on the first row
  var numberOfCharacters = 10;
  var xNudge = (1/numberOfCharacters)/2;

  var relativeXPosition = 0.0;
  switch(aKey) {
    case '1':
    relativeXPosition = 0.0+xNudge;
    break;
    case '2':
    relativeXPosition = 0.1+xNudge;
    break;
    case '3':
    relativeXPosition = 0.2+xNudge;
    break;
    case '4':
    relativeXPosition = 0.3+xNudge;
    break;
    case '5':
    relativeXPosition = 0.4+xNudge;
    break;
    case '6':
    relativeXPosition = 0.5+xNudge;
    break;
    case '7':
    relativeXPosition = 0.6+xNudge;
    break;
    case '8':
    relativeXPosition = 0.7+xNudge;
    break;
    case '9':
    relativeXPosition = 0.8+xNudge;
    break;
    case '0':
    relativeXPosition = 0.9+xNudge;
    break;
  }
  return relativeXPosition;
}

function findXOnSecondRowKey(aKey){
  //10 keys on the second row
  var numberOfCharacters = 10;
  var xNudge = (1/numberOfCharacters)/2;

  var relativeXPosition = 0.0;
  switch(aKey) {
    case 'q': case 'Q':
    relativeXPosition = 0.0+xNudge;
    break;
    case 'w': case 'W':
    relativeXPosition = 0.1+xNudge;
    break;
    case 'e': case 'E':
    relativeXPosition = 0.2+xNudge;
    break;
    case 'r': case 'R':
    relativeXPosition = 0.3+xNudge;
    break;
    case 't': case 'T':
    relativeXPosition = 0.4+xNudge;
    break;
    case 'y': case 'Y':
    relativeXPosition = 0.5+xNudge;
    break;
    case 'u': case 'U':
    relativeXPosition = 0.6+xNudge;
    break;
    case 'i': case 'I':
    relativeXPosition = 0.7+xNudge;
    break;
    case 'o': case 'O':
    relativeXPosition = 0.8+xNudge;
    break;
    case 'p': case 'P':
    relativeXPosition = 0.9+xNudge;
    break;
  }
  return relativeXPosition;
}

function findXOnThirdRowKey(aKey){
  //9 keys on the third row
  var numberOfCharacters = 9;
  var ratio = 1.0/numberOfCharacters;
  var xNudge = (1/numberOfCharacters)/2;

  var relativeXPosition = 0.0;
  switch(aKey) {
    case 'a': case 'A':
    relativeXPosition = (0*ratio)+xNudge;
    break;
    case 's': case 'S':
    relativeXPosition = (1*ratio)+xNudge;
    break;
    case 'd': case 'D':
    relativeXPosition = (2*ratio)+xNudge;
    break;
    case 'f': case 'F':
    relativeXPosition = (3*ratio)+xNudge;
    break;
    case 'g': case 'G':
    relativeXPosition = (4*ratio)+xNudge;
    break;
    case 'h': case 'H':
    relativeXPosition = (5*ratio)+xNudge;
    break;
    case 'j': case 'J':
    relativeXPosition = (6*ratio)+xNudge;
    break;
    case 'k': case 'K':
    relativeXPosition = (7*ratio)+xNudge;
    break;
    case 'l': case 'L':
    relativeXPosition = (8*ratio)+xNudge;
    break;
  }
  return relativeXPosition;
}

function findXOnFourthRowKey(aKey){
  //7 keys on the third row
  var numberOfCharacters = 7;
  var ratio = 1/numberOfCharacters;
  var xNudge = (1/numberOfCharacters)/2;

  var relativeXPosition = 0.0;
  switch(aKey) {
    case 'z': case 'Z':
    relativeXPosition = (0*ratio)+xNudge;
    break;
    case 'x': case 'X':
    relativeXPosition = (1*ratio)+xNudge;
    break;
    case 'c': case 'C':
    relativeXPosition = (2*ratio)+xNudge;
    break;
    case 'v': case 'V':
    relativeXPosition = (3*ratio)+xNudge;
    break;
    case 'b': case 'B':
    relativeXPosition = (4*ratio)+xNudge;
    break;
    case 'n': case 'N':
    relativeXPosition = (5*ratio)+xNudge;
    break;
    case 'm': case 'M':
    relativeXPosition = (6*ratio)+xNudge;
    break;
  }
  return relativeXPosition;
}
