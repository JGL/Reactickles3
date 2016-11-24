var worm = []; //array of WormSegment objects
var wormLength = 30; //number of segments of the worm
var allTheKeys = "1234567890qwertyuiopasdfghjklzxcvbnm";

function setup() {
  createCanvas(windowWidth,windowHeight); //make a fullscreen canvas, thanks to: http://codepen.io/grayfuse/pen/wKqLGL
  noStroke(); //no outlines, just filled shapes
  colorMode(HSB, 100);// Use HSB with scale of 0-100, see https://p5js.org/reference/#/p5/color
  var segmentColourMaxBrightness = 100;
  var segmentColourMinBrightness = 80;
  var segmentColourBrightnessRatio = (segmentColourMaxBrightness-segmentColourMinBrightness)/wormLength;
  var segmentColour = color(random(100),50,segmentColourMaxBrightness, 100); //random hue, saturation 50%, brightness 100%, alpha 100%
  var segmentMaxRadius = 100;
  var segmentMinRadius = 70;
  var segmentRadiusRatio = (segmentMaxRadius-segmentMinRadius)/wormLength;
  var segmentRadius = segmentMaxRadius;

  for (var i=0; i < wormLength; i++) {
    worm.push(new WormSegment(segmentColour, segmentRadius));
    segmentRadius -= segmentRadiusRatio;
    segmentColour = color(hue(segmentColour), saturation(segmentColour), brightness(segmentColour)-segmentColourBrightnessRatio, alpha(segmentColour));
  }
  console.log("The length of the worm is " + worm.length);
}

function draw() {
  background(255); //white background
  updateWorm();
  drawWorm();
}

function updateWorm(){
  //uncomment two lines below to follow the mouse
  //var relativeMousePos = createVector(mouseX/windowWidth, mouseY/windowHeight);
  //seekWormTowardsPosition(relativeMousePos);

  //uncomment line below to follow keys
  seekWormTowardsKey(key);

  //starting at back of the worm, copy the previous worm segments position onto the current segments position
  for (var i = (worm.length-1); i > 0; i--) {
    worm[i].position.x = worm[i-1].position.x;
    worm[i].position.y = worm[i-1].position.y;
    //had to copy both values - not the reference, worm[i].position = worm[i-1].position doesn't work
  }
}

function drawWorm(){
  //draw the first segment of the worm last so that the shading looks correct
  for (var i = (worm.length-1); i > 0; i--) {
    worm[i].display();
  }
}

function seekWormTowardsKey(aKey){
  var lowerCaseKey = key.toLowerCase(); //key is a system variable via https://p5js.org/reference/#/p5/key, toLowerCase via http://www.w3schools.com/jsref/jsref_tolowercase.asp

  if(allTheKeys.includes(lowerCaseKey)){
    //if the key is a valid one, then seek the worm towards it
    seekWormTowardsPosition(getCanvasPositionFromKey(lowerCaseKey));
  }
}

function seekWormTowardsPosition(relativeSeekPosition){
  var easing = 0.05;
  //move the head of the worm a bit closer... via https://processing.org/examples/easing.html
  var dx = relativeSeekPosition.x - worm[0].position.x;
  worm[0].position.x += dx * easing;
  var dy = relativeSeekPosition.y - worm[0].position.y;
  worm[0].position.y += dy * easing;
}

function keyTyped(){
  return false; //https://p5js.org/reference/#/p5/keyTyped preventing default behaviour
}

function WormSegment(aColour,aRadius){ //WormSegment object
  this.radius = aRadius;
  this.position = createVector(0.5,0.5); //start in centre of screen
  this.colour = aColour;

  this.display = function(){
    var translatedX = this.position.x * windowWidth;
    var translatedY = this.position.y * windowHeight;
    fill(this.colour);
    ellipse(translatedX, translatedY, this.radius, this.radius);
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
